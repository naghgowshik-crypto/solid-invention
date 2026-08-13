/**
 * Parses an event date string (e.g., "14 AUGUST 2026", "25 Aug 2026", "2026-08-25")

 * and an optional time string (e.g., "10:00 AM IST", "10:00", "02:00 PM") into a JavaScript Date.
 */
export function parseEventDate(dateStr: string, timeStr?: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null;
  const cleanDateStr = dateStr.trim();

  // Try standard JS Date parsing first (handles ISO "YYYY-MM-DD", "25 Aug 2026", "14 August 2026", etc.)
  let parsed = new Date(cleanDateStr);

  // If native Date.parse returns NaN, try parsing custom DD Month YYYY format
  if (isNaN(parsed.getTime())) {
    const dmyMatch = cleanDateStr.match(/^(\d{1,2})[\s\/\-]+([A-Za-z]+|\d{1,2})[\s\/\-]+(\d{4})$/);
    if (dmyMatch) {
      const day = parseInt(dmyMatch[1], 10);
      const monthPart = dmyMatch[2];
      const year = parseInt(dmyMatch[3], 10);

      let monthIndex = -1;
      if (/^\d+$/.test(monthPart)) {
        monthIndex = parseInt(monthPart, 10) - 1;
      } else {
        const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        monthIndex = monthNames.findIndex(m => monthPart.toLowerCase().startsWith(m));
      }

      if (monthIndex >= 0 && monthIndex < 12) {
        parsed = new Date(year, monthIndex, day);
      }
    }
  }

  if (isNaN(parsed.getTime())) return null;

  // If time string is provided, extract hours & minutes
  if (timeStr && timeStr.trim()) {
    const timeClean = timeStr.trim();
    const timeMatch = timeClean.match(/(\d{1,2}):(\d{2})(?:\s*(AM|PM))?/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3];
      if (ampm) {
        if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
      }
      parsed.setHours(hours, minutes, 0, 0);
    } else {
      parsed.setHours(23, 59, 59, 999);
    }
  } else {
    // If no specific time, set to end of event date (23:59:59) so events today stay UPCOMING all day
    parsed.setHours(23, 59, 59, 999);
  }

  return parsed;
}

/**
 * Determines whether an event is in the future (Upcoming) or past relative to current time.
 */
export function isEventUpcoming(event: { date: string; time?: string; isUpcoming?: boolean }): boolean {
  const eventDate = parseEventDate(event.date, event.time);
  if (!eventDate) return event.isUpcoming !== false;

  const now = new Date();
  return eventDate.getTime() >= now.getTime();
}
