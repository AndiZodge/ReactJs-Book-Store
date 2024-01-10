import axios from "axios";
import { getJWT } from "./utils.tsx";

let jwt = getJWT();

const api = axios.create({
  baseURL: "http://localhost:8080/"
})
;

export default api;
