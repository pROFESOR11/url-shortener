import { useQuery } from "react-query";
import axios from "axios";

const getShortUrlBySlug = async (slug: string) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_SERVER_URI}/url/${slug}`
  );
  return data;
};

export default function useShortUrl(slug: string) {
  return useQuery(["url", slug], getShortUrlBySlug);
}
