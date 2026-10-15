"use client";

import { useId, useState } from "react";
import { Btn, labelCls } from "./ui";

export function NotesForm({ initial, onSave, saved, onChange }: { initial: string; onSave: (note: string) => void; saved: string; onChange: () => void }) {
  const id = useId();
  const [note, setNote] = useState(initial);
  return (
    <form
      className="mt-10"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(note);
      }}
    >
      <label htmlFor={`${id}-notes`} className={labelCls}>
        Notes
      </label>
      <textarea
        id={`${id}-notes`}
        rows={4}
        className="w-full border border-charcoal/20 bg-ivory p-3 text-sm text-ink focus:border-gold-deep focus:outline-none"
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          onChange();
        }}
        placeholder="Injuries, preferences, goals"
      />
      <div className="mt-3 flex items-center gap-4">
        <Btn type="submit">Save notes</Btn>
        <span className="text-xs text-stone" aria-live="polite">
          {saved}
        </span>
      </div>
    </form>
  );
}
