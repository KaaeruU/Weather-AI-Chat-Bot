export type Env = {
  ai: any;
  CLOUDFLARE_ACCOUNT_ID?: string;
  ENVIRONMENT?: string;
};

//Chat message
export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
};

export type ChatRequest = {
  userId: string;
  message: string;
  history?: Message[];
};

//Geocoding
export type GeocodingResult =
  | {
      latitude: number;
      longitude: number;
      name: string;
      country: string;
      admin1?: string;
    }
  | {
      error: string;
    };

export type WeatherResult =
  | {
      dates: string[];
      temperature_max: number[];
      temperature_min: number[];
      precipitation_sum: number[];
      precipitation_probability: number[];
      windspeed_max: number[];
      weathercode: number[];
      weather_descriptions: string[];
      timezone: string;
      unit: string;
    }
  | {
      error: string;
    };

export type GeocodingLocation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  timezone: string;
  population?: number;
  country?: string;
  admin1?: string;
};

export type GeocodingResponse = {
  results?: GeocodingLocation[];
  generationtime_ms: number;
};
//Open-Meteo API response types
export type OpenMeteoResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: {
    time: string;
    interval: string;
    temperature_2m: string;
    weather_code: string;
  };
  current?: {
    time: string;
    interval: number;
    temperature_2m: number;
    weather_code: number;
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weathercode: string;
    precipitation_probability_max: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
    precipitation_probability_max: (number | null)[];
  };
};
