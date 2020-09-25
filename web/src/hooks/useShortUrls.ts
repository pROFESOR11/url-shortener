import { useQuery } from "react-query";
import axios from "axios";

const getShortUrls = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/urls`);
  return data;
};

export default function useShortUrls() {
  return useQuery("urls", getShortUrls);
}
