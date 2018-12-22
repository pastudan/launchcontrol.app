export const EARTH_RADIUS = 6371 / 1000
export const GEOSTATIONARY_RADIUS = 42164 / 1000
export const ISS_ORBIT_RADIUS = EARTH_RADIUS + 408 / 1000

export function degToRad(deg) {
  return (deg / 180) * Math.PI
}

export function latToPolar(lat) {
  return 90 - lat
}
