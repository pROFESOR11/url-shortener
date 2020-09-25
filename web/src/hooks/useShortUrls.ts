import { useQuery } from "react-query";
import axios from "axios";
import { getRoot } from "../utils/helpers";

const getShortUrls = async () => {
  const { data } = await axios.get(`${getRoot()}/urls`);
  return data;
};

export default function useShortUrls() {
  return useQuery("urls", getShortUrls);
}
