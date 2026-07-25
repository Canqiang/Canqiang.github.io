export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionSnapshot {
  contributions: ContributionDay[];
  total: number;
}

export type DayOrNull = ContributionDay | null;

export interface MonthLabel {
  label: string;
  weekIndex: number;
}

export const contributionsEndpoint = (username: string) =>
  `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;

export function readSnapshot(payload: unknown): ContributionSnapshot {
  const data = payload as { contributions?: unknown; total?: { lastYear?: unknown } } | null;
  return {
    contributions: Array.isArray(data?.contributions) ? (data.contributions as ContributionDay[]) : [],
    total: typeof data?.total?.lastYear === 'number' ? data.total.lastYear : 0,
  };
}

const weekday = (date: string) => new Date(`${date}T00:00:00`).getDay();

export function toWeeks(contributions: ContributionDay[]): DayOrNull[][] {
  const weeks: DayOrNull[][] = [];
  let currentWeek: DayOrNull[] = [];

  if (contributions.length > 0) {
    for (let i = 0; i < weekday(contributions[0].date); i++) currentWeek.push(null);
  }
  for (const day of contributions) {
    currentWeek.push(day);
    if (weekday(day.date) === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  return weeks;
}

export function toMonthLabels(weeks: DayOrNull[][], monthLocale: string): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIndex) => {
    const first = week.find((day): day is ContributionDay => day !== null);
    if (!first) return;
    const date = new Date(`${first.date}T00:00:00`);
    if (date.getMonth() !== lastMonth) {
      labels.push({ label: date.toLocaleString(monthLocale, { month: 'short' }), weekIndex });
      lastMonth = date.getMonth();
    }
  });

  return labels;
}
