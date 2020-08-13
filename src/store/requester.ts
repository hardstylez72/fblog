import axios, { Method } from "axios";
import moment from "moment";
import { uuid } from "uuidv4";
import { getDate } from "@/store/date";
import store from "@/store/store";

const instance = axios.create();

instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response.headers);
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default (method: Method, url: string, payload: any, headers?: any) => {
  headers = {
    "x-date": getDate(moment()).format(),
    "x-request-id": uuid(),
    ...headers
  };

  return instance({
    method,
    url: process.env.VUE_APP_SERVER_HOST + url,
    data: payload,
    headers: headers,

    withCredentials: true,
    timeout: 30000
  })
    .then(res => {
      store.commit.user.setUserId(res.headers["user_id"]);
      return res.data;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
};
