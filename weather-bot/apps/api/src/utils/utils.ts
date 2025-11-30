export function getWeatherLabel(code: number): string {
  const codes: Record<number, string> = {
    0: "Sereno ☀️",
    1: "Poco nuvoloso 🌤️",
    2: "Parzialmente nuvoloso ⛅",
    3: "Nuvoloso ☁️",
    45: "Nebbia 🌫️",
    61: "Pioggia 🌧️",
    95: "Temporale ⚡",
  };
  return codes[code] || "Variabile";
}
