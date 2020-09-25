import { useQuery } from "react-query";
import axios from "axios";
import { getRoot } from "../utils/helpers";

const getShortUrlBySlug = async (slug: string) => {
  const { data } = await axios.get(`${getRoot()}/url/${slug}`);
  return data;
};

export default function useShortUrl(slug: string) {
  return useQuery(["url", slug], getShortUrlBySlug);
}
