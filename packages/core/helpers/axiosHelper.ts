import axios from "axios";

export const axiosHelper = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
