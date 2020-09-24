import { Router } from "express";
import {
  addShortUrl,
  getShortUrls,
  deactivateShortUrl,
} from "../controllers/shortUrl";

const router: Router = Router();

router.get("/urls", getShortUrls);

router.post("/add-shortUrl", addShortUrl);

router.put("/deactivate/:slug", deactivateShortUrl);

export default router;
