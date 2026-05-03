type DistanceOptions = {
  addSuffix?: boolean;
};

const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
  ["second", 1],
];

export function formatDistanceToNow(date: Date, options: DistanceOptions = {}) {
  const seconds = Math.round((date.getTime() - Date.now()) / 1000);
  const absoluteSeconds = Math.abs(seconds);
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  const [unit, unitSeconds] = units.find(([, value]) => absoluteSeconds >= value) ?? ["second", 1];
  const value = Math.round(seconds / unitSeconds);

  if (options.addSuffix) {
    return formatter.format(value, unit);
  }

  const formatted = formatter.format(value, unit);
  return formatted.replace(/^in /, "").replace(/ ago$/, "");
}
