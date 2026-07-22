"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { trackEvent } from "@/components/analytics/trackEvent";
import { Button } from "@/components/ui/Button";
import { Field, Select } from "@/components/ui/Field";
import { CONSENT_TEXT, leadSchema, type LeadInput } from "@/lib/validation/schemas";

/**
 * Formulario de lead. §13
 *
 * Exactamente cuatro campos: Nombre · Celular · Correo · Proyecto de interés.
 * Ni uno más. Cada campo extra es un lead perdido.
 *
 * Antispam sin captcha (§13.2): honeypot + tiempo de render + rate limit en el
 * servidor. Un captcha visible rompe la estética y añade fricción real.
 */
export function LeadForm({
  projects,
  defaultProjectSlug,
  lockProject = false,
  formLocation,
  inverse = false,
}: {
  projects: { slug: string; name: string }[];
  defaultProjectSlug?: string;
  /** En la ficha el proyecto viene resuelto: un campo menos que llenar. §13.2 */
  lockProject?: boolean;
  /** `home`, `contacto`, `ficha` — va a GA4 como form_location. */
  formLocation: string;
  inverse?: boolean;
}) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Marca de tiempo del montaje, para descartar bots. §14.1
  // Se toma en un efecto y no en el render: `Date.now()` durante el render es
  // impuro y leer un ref en esa fase está prohibido por las reglas de hooks.
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    // §13.2 — validar mientras se escribe es hostil. Se valida al salir del campo.
    mode: "onBlur",
    defaultValues: {
      projectSlug: defaultProjectSlug ?? projects[0]?.slug,
      website: "",
    },
  });

  // `handleSubmit` se invoca dentro del evento, no durante el render: así el
  // callback puede leer el ref del temporizador sin romper las reglas de hooks.
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    handleSubmit(
    async (values) => {
      setSubmitError(null);
      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, renderedAt: renderedAt.current }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        trackEvent("generate_lead", {
          project_slug: values.projectSlug,
          form_location: formLocation,
        });

        router.push("/gracias");
      } catch {
        // §20.5 — si llegamos aquí es que ni siquiera se pudo registrar el lead.
        // El usuario nunca ve un error solo porque el CRM esté caído.
        setSubmitError("No se pudo enviar. Escríbenos por WhatsApp.");
        trackEvent("form_error", { field: "form", error_type: "submit" });
      }
    },
    (fieldErrors) => {
      const first = Object.keys(fieldErrors)[0];
      if (first) trackEvent("form_error", { field: first, error_type: "validation" });
    },
    )(event);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot. Fuera de la vista y fuera del orden de tabulación. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Field
        label="Nombre"
        error={errors.name?.message}
        inverse={inverse}
        inputProps={{ ...register("name"), autoComplete: "name" }}
      />

      <Field
        label="Celular"
        error={errors.phone?.message}
        inverse={inverse}
        // §13.2 — prefijo visible y fijo: el usuario no debe pensar en formato.
        prefix="+57"
        inputProps={{
          ...register("phone"),
          type: "tel",
          inputMode: "tel",
          autoComplete: "tel-national",
        }}
      />

      <Field
        label="Correo"
        error={errors.email?.message}
        inverse={inverse}
        inputProps={{ ...register("email"), type: "email", autoComplete: "email" }}
      />

      <Select
        label="Proyecto de interés"
        error={errors.projectSlug?.message}
        inverse={inverse}
        disabled={lockProject}
        selectProps={register("projectSlug")}
        options={projects.map((p) => ({ value: p.slug, label: p.name }))}
      />

      <Consent
        error={errors.consent?.message}
        inverse={inverse}
        inputProps={register("consent")}
      />

      <div className="flex flex-col gap-3">
        <Button type="submit" loading={isSubmitting} className="self-start">
          Enviar
        </Button>

        {submitError && (
          <p role="alert" aria-live="polite" className="text-body-s text-error">
            {submitError}
          </p>
        )}
      </div>

      {/* §20.5 — sin JS el contenido se lee igual y este mensaje da la salida. */}
      <noscript>
        <p className="text-body-s">
          Para enviar el formulario necesitas JavaScript. También puedes
          escribirnos por WhatsApp.
        </p>
      </noscript>
    </form>
  );
}

/** §19.1 — Ley 1581: consentimiento previo, expreso e informado. Sin premarcar. */
function Consent({
  error,
  inverse,
  inputProps,
}: {
  error?: string;
  inverse: boolean;
  inputProps: ReturnType<ReturnType<typeof useForm<LeadInput>>["register"]>;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-body-s">
        <input
          type="checkbox"
          className="mt-0.5 size-5 shrink-0 accent-[var(--color-accent)]"
          aria-describedby={error ? "consent-error" : undefined}
          {...inputProps}
        />
        <span className={inverse ? "text-text-inverse/80" : "text-text-muted"}>
          {CONSENT_TEXT}{" "}
          <a
            href="/legal/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className={
              inverse
                ? "underline underline-offset-4 text-text-inverse"
                : "underline underline-offset-4 text-accent"
            }
          >
            Ver política
          </a>
        </span>
      </label>
      {error && (
        <p id="consent-error" role="alert" className="mt-2 text-body-s text-error">
          {error}
        </p>
      )}
    </div>
  );
}
