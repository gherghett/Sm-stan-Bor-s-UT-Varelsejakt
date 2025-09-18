const dirs_sv = [
    "norr", "nord-nordost", "nordost", "ost-nordost",
    "öst", "ost-sydost", "sydost", "syd-sydost",
    "söder", "syd-sydväst", "sydväst", "väst-sydväst",
    "väst", "väst-nordväst", "nordväst", "nord-nordväst"
]

export function bearing2svenska(bearing : number) {
    const idx = Math.round(bearing / 22.5) % 16;
    return dirs_sv[idx];
}