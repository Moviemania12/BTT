import { dailyPostPlan, type DailySocialPost } from "./daily-post-plan";

const IST_TIME_ZONE = "Asia/Kolkata";

// Day 1 ki actual starting date.
// Abhi 29 July 2026 rakhi hai.
const SERIES_START_DATE = "2026-07-29";

function getDateInIST(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to calculate IST date.");
  }

  return `${year}-${month}-${day}`;
}

function dateToUtcDay(dateString: string): number {
  const [year, month, day] = dateString.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function getDailyPostForDate(
  date: Date = new Date()
): DailySocialPost {
  const currentISTDate = getDateInIST(date);

  const start = dateToUtcDay(SERIES_START_DATE);
  const current = dateToUtcDay(currentISTDate);

  const daysSinceStart = Math.floor(
    (current - start) / (1000 * 60 * 60 * 24)
  );

  const dayNumber = daysSinceStart + 1;

  if (dayNumber < 1) {
    return dailyPostPlan[0];
  }

  const post = dailyPostPlan.find((item) => item.day === dayNumber);

  if (!post) {
    throw new Error(
      `No BTT social post configured for Day ${dayNumber}.`
    );
  }

  return post;
}

export function getDailyPostByDay(
  day: number
): DailySocialPost {
  const post = dailyPostPlan.find((item) => item.day === day);

  if (!post) {
    throw new Error(`No BTT social post configured for Day ${day}.`);
  }

  return post;
}