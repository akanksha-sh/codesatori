export const BACKEND_URL = process.env.REACT_APP_CODESATORI_PROD
  ? "https://codesatori-backend.herokuapp.com/"
  : "http://localhost:8090/";

export function SLEEP(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
