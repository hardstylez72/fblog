import axios, { Method } from 'axios';
import moment from "moment";
import { uuid } from 'uuidv4';
import {getDate} from "@/store/date";

export default (method: Method, url: string, payload: any) => {
    return axios({
        method,
        url: process.env.VUE_APP_SERVER_HOST + url,
        data: payload,
        headers: {
            "x-date": getDate(moment()).format(),
            "x-request-id": uuid()
        }
    })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            return err;
        });
}
