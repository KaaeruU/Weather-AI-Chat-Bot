import { tool } from "ai";
import { z } from "zod";
import { getWeatherLabel } from "../utils/utils";
import { OpenMeteoResponse } from "../types/types";

function getDayName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT", { weekday: "long" });
}

export const forecastTool = tool({
  description: "Ottiene le previsioni meteo per i prossimi giorni.",
  inputSchema: z.object({
    latitude: z.coerce.number().describe("Latitudine"),
    longitude: z.coerce.number().describe("Longitudine"),
    days: z.coerce
      .number()
      .default(5)
      .describe(
        "Giorni da scaricare partendo da OGGI. Se l'utente chiede 'Domani', devi mettere almeno 2."
      ),
  }),
  execute: async ({ latitude, longitude, days }) => {
    const safeDays = days < 2 ? 2 : days;

    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", latitude.toFixed(4));
    url.searchParams.set("longitude", longitude.toFixed(4));
    url.searchParams.set(
      "daily",
      "temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max"
    );
    url.searchParams.set("forecast_days", String(safeDays));
    url.searchParams.set("timezone", "auto");

    try {
      const res = await fetch(url.toString());

      if (!res.ok) throw new Error("Errore API Meteo");

      const data = (await res.json()) as OpenMeteoResponse;

      // sanity array
      const forecastList = data.daily.time.map((item, index) => {
        const rainProb = data.daily.precipitation_probability_max[index] ?? 0;

        return {
          day: `${getDayName(item)} (${item})`,
          meteo: getWeatherLabel(data.daily.weathercode[index]),
          temp_max: `${data.daily.temperature_2m_max[index]}°C`,
          temp_min: `${data.daily.temperature_2m_min[index]}°C`,
          rain: `${rainProb}%`,
        };
      });

      return {
        info: `Ho scaricato le previsioni per i prossimi ${safeDays} giorni (a partire da OGGI). Cerca nella lista qui sotto il giorno esatto richiesto dall'utente (es. Domani è il secondo elemento).`,
        previsioni: forecastList,
      };
    } catch (e) {
      console.error(e);
      return { error: "Impossibile recuperare i dati meteo al momento." };
    }
  },
});
