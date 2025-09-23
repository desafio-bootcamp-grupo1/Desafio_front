let ACCESS = null;
//Acceso al token en memoria

export function getAccessToken() {
  return ACCESS;
}
export function setAccessToken(token) {
  ACCESS = token;
}
export function clearAccessToken() {
  ACCESS = null;
}
