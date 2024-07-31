import axios from "axios";

/**
 * Validation of token on refresh.
 *
 * @param {string} token - Authorization Token.
 * @returns {{ success: boolean, payload: Array<any>|object }} - The result object containing success and payload.
 */
const validateRefresh = async token =>
  await axios
    .get(`auth/validateRefresh`, {
      headers: {
        Authorization: `QTracy ${token}`,
      },
    })
    .then(res => {
      const { data } = res;
      return data;
    })
    .catch(err => {
      const { response } = err;
      const { data } = response;
      const { error, message } = data;

      throw new Error(message ? `${error}: ${message}` : error);
    });

export default validateRefresh;
