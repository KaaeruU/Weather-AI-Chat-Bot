import { tool } from "ai";
import { z } from "zod";
import { GeocodingResponse } from "../types/types";

export const geocodeTool = tool({
  description: "Get coordinates for a location",
  inputSchema: z.object({
    location: z.string().describe("The location to geocode"),
  }),
  execute: async ({ location }) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );
    const data = (await response.json()) as GeocodingResponse;

    if (data.results?.length === 0) {
      return { error: "Location not found" };
    }

    return {
      lat: data.results?.[0]?.latitude,
      lon: data.results?.[0]?.longitude,
      displayName: data.results?.[0]?.name,
    };
  },
});
