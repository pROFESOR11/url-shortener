import { Response, Request } from "express";
import { IShortUrl } from "./../types/shortUrl";
import ShortUrl from "../models/shortUrl";
import * as yup from "yup";
import { nanoid } from "nanoid";

const getShortUrls = async (_req: Request, res: Response): Promise<void> => {
  try {
    // retrieve active short urls
    const shortUrls: IShortUrl[] = await ShortUrl.find({ active: true });
    res.status(200).json({ shortUrls });
  } catch (error) {
    throw error;
  }
};

const getShortUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { slug },
    } = req;

    // retrieve short url by slug
    const shortUrl: IShortUrl | null = await ShortUrl.findOne({ slug });
    res.status(200).json({
      message: "success",
      shortUrl,
    });
  } catch (error) {
    throw error;
  }
};

const redirectToUrlBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { slug },
    } = req;

    // retrieve short url by slug
    const shortUrl: IShortUrl | null = await ShortUrl.findOne({ slug });

    // check if is still active
    if (shortUrl?.active) {
      const url = shortUrl?.url;

      // if valid url
      if (url) {
        // increment count, this will give us how many times a link is used
        // no need to await as we don't need the response right now
        shortUrl.count += 1;
        shortUrl.save();

        // redirect to saved url in the database
        res.redirect(url);
      } else {
        // if env:CLIENT_URI provided, then redirect to the client
        // if not, the send error with status code 400
        process.env.CLIENT_URI
          ? res.redirect(process.env.CLIENT_URI)
          : res.status(400).json({ error: "slug not found!" });
      }
    } else {
      // if not active, then redirect to the client
      // if no env:CLIENT_URI provided, then send error with status code 400
      process.env.CLIENT_URI
        ? res.redirect(process.env.CLIENT_URI)
        : res.status(400).json({ error: "not active!" });
    }
  } catch (error) {
    // send error with status code 400
    console.log("error", error);
    res.status(400).json({ error });
  }
};

const addShortUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    // body must include url
    const body = req.body as Pick<IShortUrl, "url">;

    // url validation
    const schema = yup.object().shape({
      url: yup.string().trim().url().required(),
    });
    await schema.validate(body);

    let slug;

    // slug is 5 chars, so make sure that slug is not generated before
    while (true) {
      slug = nanoid(5);
      const exists = await ShortUrl.find({ slug });
      if (exists.length === 0) break;
    }

    // create new ShortUrl entry
    const shortUrl: IShortUrl = new ShortUrl({
      url: body.url,
      slug,
    });
    const newShortUrl: IShortUrl = await shortUrl.save();

    res.status(201).json({ message: "success", shortUrl: newShortUrl });
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ message: "error", error });
  }
};

const deactivateShortUrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { slug },
    } = req;

    // find ShortUrl by slug and update active to false
    const deactivatedShortUrl: IShortUrl | null = await ShortUrl.findOneAndUpdate(
      { slug },
      { active: false }
    );

    res.status(200).json({
      message: "success",
      todo: deactivatedShortUrl,
    });
  } catch (error) {
    throw error;
  }
};

export {
  redirectToUrlBySlug,
  getShortUrl,
  getShortUrls,
  addShortUrl,
  deactivateShortUrl,
};
