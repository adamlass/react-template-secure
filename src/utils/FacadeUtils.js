import { Base64 } from 'js-base64';


export function makeOptions(method, addToken, body) {
    var opts = {
        method: method,
        headers: {
          "Content-type": "application/json",
          'Accept': 'application/json',
        }
      }
      if (addToken && getToken()) {
        opts.headers["x-access-token"] = getToken();
      }
      if (body) {
        opts.body = JSON.stringify(body);
      }
      return opts;
}

export function getToken() {
    return localStorage.getItem('jwtToken')
}

export function setToken(token) {
    localStorage.setItem('jwtToken', token)
    var decoded = parseJWT(token)
    console.log("decoded: " + JSON.stringify(decoded))
    localStorage.setItem('email', decoded.email)
    console.log(decoded.roles)
    if (decoded.roles.includes("admin")) {
      localStorage.setItem('role', 'admin')
    } else {
      localStorage.setItem('role', decoded.roles)
    }
}

export function removeToken(){
    localStorage.removeItem("token");
}

export async function handleHttpErrors(res) {
    if (!res.ok) {
        console.log("error")
        const fullError = await res.json();
        throw { status: res.status, fullError };
    }
    const json = await res.json();
    return json;
}

export function parseJWT(token) {
    const t = token.split(".");
    const string = t[1];
    const json = Base64.decode(string);
    const obj = JSON.parse(json);
    return obj;
}
