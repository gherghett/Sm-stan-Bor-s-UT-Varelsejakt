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

export const meter2RandUnit = (meters: number, unit: number = -1) => {
  const units = [
    `${Math.round(meters * 3.28084)} fot`,
    `${Math.round(meters * 39.3701)} tum`,
    `${Math.round(meters / 0.7)} armlängder`,
    `${Math.round(meters / 0.75)} steg`,
    `${(meters / 10).toFixed(1)} kast`,
    `${Math.round(meters / 1.5)} hopp`,
  ];
  const idx =
    unit >= 0 && unit < units.length 
      ? unit
      : Math.floor(Math.random() * units.length);
  return units[idx];
};
