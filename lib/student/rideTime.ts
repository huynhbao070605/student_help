const TIME_PATTERN = /(\d{1,2})(?::|h)(\d{2})?/i;

function startOfLocalDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function normalizeHour(hour: number, source: string) {
  const lower = source.toLowerCase();
  if ((lower.includes("chiều") || lower.includes("toi") || lower.includes("tối")) && hour > 0 && hour < 12) {
    return hour + 12;
  }
  return hour;
}

function formatTimeLabel(date: Date, now: Date) {
  const today = startOfLocalDay(now).getTime();
  const target = startOfLocalDay(date).getTime();
  const dayDiff = Math.round((target - today) / 86400000);
  const dayLabel = dayDiff === 0 ? "Hôm nay" : dayDiff === 1 ? "Sáng mai" : date.toLocaleDateString("vi-VN");
  const timeLabel = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  return `${dayLabel} ${timeLabel}`;
}

export function parseRideDeparture(input: string, now = new Date()) {
  const raw = input.trim();
  if (!raw) {
    const fallback = new Date(now);
    fallback.setHours(fallback.getHours() + 1, 0, 0, 0);
    return { iso: fallback.toISOString(), label: formatTimeLabel(fallback, now) };
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return { iso: parsed.toISOString(), label: formatTimeLabel(parsed, now) };
  }

  const lower = raw.toLowerCase();
  const timeMatch = raw.match(TIME_PATTERN);
  if (!timeMatch) return null;

  const base = startOfLocalDay(now);
  if (lower.includes("mai")) {
    base.setDate(base.getDate() + 1);
  }

  const hour = normalizeHour(Number(timeMatch[1]), lower);
  const minute = timeMatch[2] ? Number(timeMatch[2]) : 0;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  base.setHours(hour, minute, 0, 0);
  return { iso: base.toISOString(), label: formatTimeLabel(base, now) };
}
