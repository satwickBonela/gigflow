import axios from "axios"

export default axios.create({
  baseURL: "https://gigflow-gvam.onrender.com",
  withCredentials: true
})