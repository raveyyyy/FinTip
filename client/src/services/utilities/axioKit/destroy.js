import axios from "axios";

/**
 * Destroy function.
 *
 * @param {string} entity - Base route of the API.
 * @param {Array<any>|object} data - Information that will be stored in the database.
 * @param {string} token - Authorization Token.
 * @returns {{ success: boolean, payload: Array<any>|object }} - The result object containing success and payload.
 */
const destroy = async (entity, data, token) =>
  await axios({
    method: "delete",
    url: `${entity}/destroy`,
    headers: {
      Authorization: `QTracy ${token}`,
    },
    data,
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

export default destroy;
