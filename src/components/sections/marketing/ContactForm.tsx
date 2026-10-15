"use client";

import { useId, useState, type FormEvent } from "react";
import { clsx } from "clsx";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const interests = ["Reformer Pilates", "Private and Duet Sessions", "Mat Pilates", "Prenatal and Postnatal", "Something else"];

export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ name: "", email: "", phone: "", interest: interests[0], message: "" });

  function set<K extends keyof typeof values>(k: K, v: string) {
    setValues((s) => ({ ...s, [k]: v }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!values.email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "That email address does not look right.";
    if (!values.message.trim()) e.message = "Please tell us how we can help.";
    return e;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSent(true);
      return;
    }
    const first = Object.keys(e)[0];
    document.getElementById(`${id}-${first}`)?.focus();
  }

  if (sent) {
    return (
      <div role="status" aria-live="polite" className="border border-charcoal/10 bg-sand p-8">
        <p className="eyebrow text-gold-deep">Message received</p>
        <p className="mt-4 font-serif text-3xl font-light text-charcoal">Thank you, {values.name.split(" ")[0]}.</p>
        <p className="mt-3 text-stone">We reply within one business day. If it is urgent, call the studio during opening hours.</p>
      </div>
    );
  }

  const field = (key: keyof Errors) => ({
    id: `${id}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": clsx(`${id}-${key}-hint`, errors[key] && `${id}-${key}-error`),
  });

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-required`}>
      <p id={`${id}-required`} className="text-sm text-stone">
        Fields marked required must be completed.
      </p>
      <div className="mt-8 space-y-8">
        <div>
          <label htmlFor={`${id}-name`} className="eyebrow text-charcoal">
            Name <span className="normal-case tracking-normal text-stone">(required)</span>
          </label>
          <input {...field("name")} type="text" name="name" autoComplete="name" required className="field mt-2" value={values.name} onChange={(e) => set("name", e.target.value)} />
          <p id={`${id}-name-hint`} className="sr-only">Your first and last name</p>
          {errors.name && <p id={`${id}-name-error`} role="alert" className="mt-2 text-sm text-danger">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="eyebrow text-charcoal">
            Email <span className="normal-case tracking-normal text-stone">(required)</span>
          </label>
          <input {...field("email")} type="email" name="email" autoComplete="email" required className="field mt-2" value={values.email} onChange={(e) => set("email", e.target.value)} />
          <p id={`${id}-email-hint`} className="mt-2 text-xs text-stone">We use this only to reply to you.</p>
          {errors.email && <p id={`${id}-email-error`} role="alert" className="mt-2 text-sm text-danger">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="eyebrow text-charcoal">
            Phone <span className="normal-case tracking-normal text-stone">(optional)</span>
          </label>
          <input id={`${id}-phone`} type="tel" name="phone" autoComplete="tel" className="field mt-2" value={values.phone} onChange={(e) => set("phone", e.target.value)} aria-describedby={`${id}-phone-hint`} />
          <p id={`${id}-phone-hint`} className="mt-2 text-xs text-stone">If you would rather we call you back.</p>
        </div>
        <div>
          <label htmlFor={`${id}-interest`} className="eyebrow text-charcoal">
            I am interested in
          </label>
          <select id={`${id}-interest`} name="interest" className="field mt-2 appearance-none bg-transparent" value={values.interest} onChange={(e) => set("interest", e.target.value)}>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-message`} className="eyebrow text-charcoal">
            Message <span className="normal-case tracking-normal text-stone">(required)</span>
          </label>
          <textarea {...field("message")} name="message" rows={5} required className="field mt-2 resize-y" value={values.message} onChange={(e) => set("message", e.target.value)} />
          <p id={`${id}-message-hint`} className="mt-2 text-xs text-stone">Tell us about your goals, any injuries, or what you would like to know.</p>
          {errors.message && <p id={`${id}-message-error`} role="alert" className="mt-2 text-sm text-danger">{errors.message}</p>}
        </div>
      </div>
      <button type="submit" className="eyebrow mt-10 bg-charcoal px-9 py-5 text-ivory transition hover:bg-mocha">
        Send message
      </button>
    </form>
  );
}
