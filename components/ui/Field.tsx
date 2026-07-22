"use client";

import { useId, type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Campo de formulario. §11.1 · §18
 *
 * Label superior fijo (más accesible y más legible sobre Cream que el flotante).
 * Borde solo inferior, sin caja completa. Altura de toque mínima 48px.
 * Errores en texto, debajo del campo, con aria-describedby.
 */

function labelClasses(inverse: boolean) {
  return cn(
    "text-kicker font-medium uppercase",
    inverse ? "text-secondary" : "text-secondary",
  );
}

function controlClasses(inverse: boolean, hasError: boolean) {
  return cn(
    "min-h-12 w-full border-0 border-b bg-transparent py-2 text-body outline-none",
    "transition-[border-color,border-width] duration-150",
    inverse
      ? "border-b-text-inverse/25 text-text-inverse focus:border-b-2 focus:border-b-secondary"
      : "border-b-text/25 text-text focus:border-b-2 focus:border-b-accent",
    hasError && "border-b-error",
  );
}

export function Field({
  label,
  error,
  inverse = false,
  prefix,
  inputProps,
}: {
  label: string;
  error?: string;
  inverse?: boolean;
  prefix?: ReactNode;
  inputProps: ComponentProps<"input">;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClasses(inverse)}>
        {label}
      </label>

      <div className="flex items-baseline gap-2">
        {prefix && (
          <span
            className={cn(
              "shrink-0 text-body",
              inverse ? "text-text-inverse/60" : "text-text-muted",
            )}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={controlClasses(inverse, Boolean(error))}
          {...inputProps}
        />
      </div>

      {error && (
        <p id={errorId} role="alert" aria-live="polite" className="text-body-s text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  error,
  inverse = false,
  disabled = false,
  options,
  selectProps,
}: {
  label: string;
  error?: string;
  inverse?: boolean;
  disabled?: boolean;
  options: { value: string; label: string }[];
  selectProps: ComponentProps<"select">;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClasses(inverse)}>
        {label}
      </label>

      <select
        id={id}
        // Cuando el proyecto viene resuelto por la ficha, el campo queda visible
        // pero no editable. `disabled` no envía el valor, así que se usa una
        // clase de solo lectura y se bloquea la interacción con pointer-events.
        aria-readonly={disabled || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          controlClasses(inverse, Boolean(error)),
          "appearance-none",
          disabled && "pointer-events-none opacity-70",
        )}
        tabIndex={disabled ? -1 : undefined}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-text">
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={errorId} role="alert" aria-live="polite" className="text-body-s text-error">
          {error}
        </p>
      )}
    </div>
  );
}
