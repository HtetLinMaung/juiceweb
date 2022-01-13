import axios from "axios";
import config from "../app.config.json";

const getDefaultHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("iamtoken")}`,
  };
};

const rest = {
  post: async (url, body, options = {}) => {
    try {
      const res = await axios.post(config.iam + url, body, {
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
