const GRS_1980_A = 6378.137;
const degToRad = (a) => a * (Math.PI / 180);
const radToDeg = (a) => a * (180 / Math.PI);

class City {
  constructor(rawCity) {
    this.lat = degToRad(rawCity.lat);
    this.lon = degToRad(rawCity.lon);
  }

  haversineDistanceFrom(target) {
    const latDiff = target.lat - this.lat;
    const lonDiff = target.lon - this.lon;

    const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
              Math.cos(this.lat) * Math.cos(target.lat) *
              Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return GRS_1980_A * c;
  }

  initialBearingTo(target) {
    const dLon = target.lon - this.lon;
    const y = Math.sin(dLon) * Math.cos(target.lat);
    const x = Math.cos(this.lat) * Math.sin(target.lat) -
              Math.sin(this.lat) * Math.cos(target.lat) * Math.cos(dLon);
    const bearingRad = Math.atan2(y, x);

    return (radToDeg(bearingRad) + 360) % 360;
  }
}

const degToDir = (d) => {
  const rose = [
    "⬆️",  // N
    "↗️",  // NE
    "➡️",  // E
    "↘️",  // SE
    "⬇️",  // S
    "↙️",  // SW
    "⬅️",  // W
    "↖️",  // NW
  ];

  const angle = (d + 360) % 360;
  return rose[Math.round(angle / 45) % 8];
}

export const getDistanceAndDirection = (rawGuess, rawTarget) => {
  const guess = new City(rawGuess);
  const target = new City(rawTarget);
  return [guess.haversineDistanceFrom(target), degToDir(guess.initialBearingTo(target))];
}

s 