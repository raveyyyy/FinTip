import axios from "axios";

/**
 * Save function.
 *
 * @param {string} entity - Base route of the API.
 * @param {object} data - Information that will be stored in the database.
 * @param {string} token - Authorization Token.
 * @returns {{ success: boolean, payload: object }} - The result object containing success and payload.
 */
const save = async (entity, data, token) =>
  await axios
    .post(`${entity}/save`, data, {
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

export default save;
