import { Router } from "express";
import {
  addShortUrl,
  getShortUrls,
  deactivateShortUrl,
  getShortUrl,
  redirectToUrlBySlug,
} from "../controllers/shortUrl";

const router: Router = Router();

router.get("/urls", getShortUrls);

router.get("/url/:slug", getShortUrl);

router.post("/add-shortUrl", addShortUrl);

router.put("/deactivate/:slug", deactivateShortUrl);

router.get("/:slug", redirectToUrlBySlug);

export default router;
