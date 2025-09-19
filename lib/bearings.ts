const dirs_sv = [
  "nordlig",
  "nordnordostlig",
  "nordostlig",
  "ostnordostlig",
  "östlig",
  "ostsydostlig",
  "sydostlig",
  "syddsydostlig",
  "sydlig",
  "syddsydvästlig",
  "sydvästlig",
  "västsydvästlig",
  "västlig",
  "västnordvästlig",
  "nordvästlig",
  "nordnordvästlig",
];

export function bearing2svenska(bearing: number) {
  const idx = Math.round(bearing / 22.5) % 16;
  return dirs_sv[idx];
}

export const meter2RandUnit = (meters: number) => {
  const units = [
    { unit: "feet", value: meters * 3.28084, format: (v: number) => `${Math.round(v)} fot` },
    { unit: "inches", value: meters * 39.3701, format: (v: number) => `${Math.round(v)} tum` },
    { unit: "armlängder", value: meters / 0.7, format: (v: number) => `${Math.round(v)} armlängder` },
    { unit: "steg", value: meters / 0.75, format: (v: number) => `${Math.round(v)} steg` },
    { unit: "kast", value: meters / 10, format: (v: number) => `${v.toFixed(1)} kast` },
    { unit: "hopp", value: meters / 1.5, format: (v: number) => `${Math.round(v)} hopp` },
  ];
  const idx = Math.floor(Math.random() * units.length);
  const chosen = units[idx];
  return chosen.format(chosen.value);
};
