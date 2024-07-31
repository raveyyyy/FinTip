import axios from "axios";

/**
 * A universal GET request.
 *
 * @param {string} entity - Base route of the API.
 * @param {string} token - Authorization Token.
 * @param {string|object} key - Headers that will be passed to the api.
 * @returns {{ success: boolean, payload: Array<any>|object }} - The result object containing success and payload.
 */
const verification = async (name, token, key = "") => {
  if (typeof key === "object") {
    key = `?${Object.keys(key)
      .map(i => `${i}=${key[i]}`)
      .join("&")}`;
  } else {
    key = `?key=${key}`;
  }

  return await axios
    .get(`${name}${key}`, {
      headers: {
        Authorization: `verify ${token}`,
      },
    })
    .then(res => {
      const { data } = res;
      localStorage.setItem("token", data.payload.token);
      localStorage.setItem("email", data.payload.user.email);
      return data;
    })
    .catch(err => {
      const { response } = err;
      const { data } = response;
      const { error, message } = data;

      throw new Error(message ? `${error}: ${message}` : error);
    });
};

export default verification;
