import axios from "axios";
import config from "../app.config.json";

const getDefaultHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
};

const rest = {
  get: async (url, options = {}) => {
    try {
      const res = await axios.get(config.server + url, {
        ...options,
        headers: {
          ...getDefaultHeaders(),
        },
      });
      return [res, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  },
  post: async (url, body, options = {}) => {
    try {
      const res = await axios.post(config.server + url, body, {
        ...options,
        headers: {
          ...getDefaultHeaders(),
        },
      });
      return [res, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  },
  put: async (url, body, options = {}) => {
    try {
      const res = await axios.put(config.server + url, body, {
        ...options,
        headers: {
          ...getDefaultHeaders(),
        },
      });
      return [res, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  },
  delete: async (url, options = {}) => {
    try {
      const res = await axios.delete(config.server + url, {
        ...options,
        headers: {
          ...getDefaultHeaders(),
        },
      });
      return [res, null];
    } catch (err) {
      console.log(err);
      return [null, err];
    }
  },
};

export default rest;
