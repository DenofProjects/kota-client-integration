import axios from "axios";
import { EndPoints } from "../constants/EndPoint";

export default axios.create({
    baseURL: EndPoints.BASE_URL,
});