import axios from "axios";
import { getJWT } from "./utils.tsx";

let jwt = getJWT();

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
})
;

export default api;
