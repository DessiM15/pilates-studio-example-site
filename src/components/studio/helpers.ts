import type { Session } from "@/lib/data/schedule";
import { toDateKey } from "@/lib/data/schedule";

export type SessionWithFlag = Session & { cancelled?: boolean };

export function isCancelled(s: Session) {
  return Boolean((s as SessionWithFlag).cancelled);
}

export function todayKey() {
  return toDateKey(new Date());
}

export function dayKeys(count: number, from = new Date()) {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    out.push(toDateKey(d));
  }
  return out;
}

/** Parse date and time from a session id of the form YYYY-MM-DD-HHmm-rest. */
export function parseSessionId(id: string) {
  const m = id.match(/^(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})/);
  if (!m) return null;
  return { date: m[1], time: `${m[2]}:${m[3]}` };
}

export function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function statusLabel(status: string) {
  return status.replace("-", " ");
}
