
// https://epsg.io/4674
// https://archive.is/FfUv5

const GRS_1980_A = 6378.137
const GRS_1980_E_POW_2 = 0.006694380022903415749574948586289306212443890

const degToRad = (a) => a * (Math.PI / 180);
const radToDeg = (a) => a * (180 / Math.PI);
const mod = (n, m) => (n % m + m) % m;

const degToDir = (d) => {
  const rose = [
    String.fromCodePoint(0x2B06, 0xFE0F), // N
    String.fromCodePoint(0x2197, 0xFE0F), // NNE
    String.fromCodePoint(0x2197, 0xFE0F), // NE
    String.fromCodePoint(0x27A1, 0xFE0F), // ENE
    String.fromCodePoint(0x27A1, 0xFE0F), // E
    String.fromCodePoint(0x2198, 0xFE0F), // ESE
    String.fromCodePoint(0x2198, 0xFE0F), // SE
    String.fromCodePoint(0x2B07, 0xFE0F), // SSE
    String.fromCodePoint(0x2B07, 0xFE0F), // S
    String.fromCodePoint(0x2199, 0xFE0F), // SSW
    String.fromCodePoint(0x2199, 0xFE0F), // SW
    String.fromCodePoint(0x2B05, 0xFE0F), // WSW
    String.fromCodePoint(0x2B05, 0xFE0F), // W
    String.fromCodePoint(0x2196, 0xFE0F), // WNW
    String.fromCodePoint(0x2196, 0xFE0F), // NW
    String.fromCodePoint(0x2B06, 0xFE0F), // NNW
  ];

  // set north to zero degrees and flip circle to be clockwise
  const angle = mod(-(d - 90), 360);
  return rose[Math.trunc(rose.length * angle / 360.)];
}

class City {
  constructor(rawCity) {
    [this.x, this.y, this.z] = this.geodeticToEcef(rawCity.lat, rawCity.lon);
  }

  // https://en.wikipedia.org/wiki/Geographic_coordinate_conversion
  geodeticToEcef(latDeg, lonDeg, h = 0) {
    const [lat, lon] = [degToRad(latDeg), degToRad(lonDeg)];
    const [cosLat, sinLat] = [Math.cos(lat), Math.sin(lat)];
    const R = GRS_1980_A / Math.sqrt(1 - (GRS_1980_E_POW_2 * sinLat * sinLat));

    return [
      (R + h) * cosLat * Math.cos(lon),
      (R + h) * cosLat * Math.sin(lon),
      ((1 - GRS_1980_E_POW_2) * R + h) * sinLat,
    ];
  }


  distanceFrom(o) {
    return Math.sqrt(
      (o.x - this.x) ** 2 + (o.y - this.y) ** 2 + (o.z - this.z) ** 2
    );
  }

  // https://gis.stackexchange.com/a/58926
  azimuthFrom(o) {
    const [dx, dy, dz] = [o.x - this.x, o.y - this.y, o.z - this.z];
    const sumDeltaSq = dx**2 + dy**2 + dz**2;
    const sumXySq = this.x**2 + this.y**2;

    const cosNum = -this.z * this.x * dx - this.z * this.y * dy + sumXySq * dz;
    const cosDen = Math.sqrt(sumXySq * (sumXySq + this.z**2) * sumDeltaSq);

    const sinNum = (-this.y * dx + this.x * dy);
    const sinDen = Math.sqrt(sumXySq * sumDeltaSq);

    return radToDeg(Math.atan2(sinNum / sinDen, cosNum / cosDen));
  }
}

export const getDistanceAndDirection = (rawGuess, rawTarget) => {
  const guess = new City(rawGuess);
  const target = new City(rawTarget);
  return [guess.distanceFrom(target), degToDir(guess.azimuthFrom(target))];
}

brazil = ["name": "Brazil",-14.235004, -51.92528]
console.log(getDistanceAndDirection(,))