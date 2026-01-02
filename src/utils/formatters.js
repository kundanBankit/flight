// src/utils/formatters.js

/* =================== Duration Formatter HH:MM =================== */
export const formatDuration = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs} h ${mins} m`;
};

/* =================== Time Formatter (HH:MM) =================== */
export const formatTime = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

/* =================== Date Formatter (Fri, 12 Dec 25) =================== */
export const formatDateShort = (dateString) => {
  const d = new Date(dateString);

  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

/* =================== Return ONLY Day (25) =================== */
export const formatDayOnly = (datetime) => {
  const date = new Date(datetime);
  return date.getDate().toString().padStart(2, "0");
};


/* =================== Format Hours or Days =================== */

export const formatHoursOrDays = (hours) => {
  if (!hours && hours !== 0) return "";

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (remainingHours === 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  }

  return `${days} day${days > 1 ? "s" : ""} ${remainingHours} hour${
    remainingHours > 1 ? "s" : ""
  }`;
};

/* =================== Format Date as YYYY-MM-DD =================== */

export const formatDateYYYYMMDD = (date) => {
  if (!(date instanceof Date)) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
