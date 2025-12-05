import { tool } from "ai";
import { z } from "zod";
import { getWeatherLabel } from "../utils/utils";
import { OpenMeteoResponse } from "../types/types";

function getDayName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function getRelativeDay(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "TODAY";
  if (diffDays === 1) return "TOMORROW";
  if (diffDays === 2) return "DAY AFTER TOMORROW";
  return "";
}

export const forecastTool = tool({
  description: `Get weather forecasts for the upcoming days.
IMPORTANT: The 'days' parameter starts from TODAY (day 0).
- For "today" → days=1
- For "tomorrow" → days=2 (to get today + tomorrow)
- For "day after tomorrow" → days=3
- For a specific day of the week → days=7 (to be safe)
- For "weekend" → days=5 or days=7`,

  inputSchema: z.object({
    latitude: z.coerce.number().describe("Latitude"),
    longitude: z.coerce.number().describe("Longitude"),
    days: z.coerce
      .number()
      .min(1)
      .max(16)
      .default(7)
      .describe(
        "Number of days to forecast starting from TODAY (included). Example: days=2 means today + tomorrow."
      ),
  }),

  execute: async ({ latitude, longitude, days }) => {
    const clampedDays = Math.min(Math.max(days, 1), 16);

    const params = new URLSearchParams({
      latitude: latitude.toFixed(4),
      longitude: longitude.toFixed(4),
      daily:
        "temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max",
      forecast_days: String(clampedDays),
      timezone: "auto",
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    try {
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; YourApp/1.0)",
        },
      });

      // Log per debug
      console.log("Response status:", res.status);
      console.log("Response headers:", Object.fromEntries(res.headers));

      if (!res.ok) {
        const errorBody = await res.text();
        console.error("Error body:", errorBody);
        throw new Error(`API Error ${res.status}: ${errorBody}`);
      }

      const data = (await res.json()) as OpenMeteoResponse;

      const forecastList = data.daily.time.map((dateStr, index) => {
        const rainProb = data.daily.precipitation_probability_max[index] ?? 0;
        const dayName = getDayName(dateStr);
        const relativeDay = getRelativeDay(dateStr);

        let label = relativeDay ? `${relativeDay} - ${dayName}` : dayName;
        label += ` (${dateStr})`;

        return {
          day: label,
          weather: getWeatherLabel(data.daily.weathercode[index]),
          max_temp: `${data.daily.temperature_2m_max[index]}°C`,
          min_temp: `${data.daily.temperature_2m_min[index]}°C`,
          rainProb: `${rainProb}%`,
        };
      });

      const todayInfo = forecastList[0]?.day || "today";
      const lastDayInfo =
        forecastList[forecastList.length - 1]?.day || "last day";

      return {
        result: "success",
        notes: `Forecasts downloaded from ${todayInfo} to ${lastDayInfo}. LOOK for the user's requested day in the list below. If they ask for "tomorrow", look for "TOMORROW", if "Thursday" look for "Thursday" in the label.`,
        forecasts: forecastList,
      };
    } catch (e) {
      console.error("Forecast tool error:", e);
      return {
        result: "error",
        message:
          "I cannot retrieve weather data at this moment. Please try again later.",
      };
    }
  },
});
