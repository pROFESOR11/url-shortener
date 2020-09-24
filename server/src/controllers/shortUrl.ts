import { Response, Request } from "express";
import { IShortUrl } from "./../types/shortUrl";
import ShortUrl from "../models/shortUrl";
import * as yup from "yup";
import { nanoid } from "nanoid";

const getShortUrls = async (_req: Request, res: Response): Promise<void> => {
  try {
    const shortUrls: IShortUrl[] = await ShortUrl.find();
    res.status(200).json({ shortUrls });
  } catch (error) {
    throw error;
  }
};

const addShortUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as IShortUrl;

    const schema = yup.object().shape({
      url: yup.string().trim().url().required(),
    });

    const isValidated = await schema.validate(body);

    if (!isValidated) res.status(400).json({ message: "Wrong url parameter" });

    let slug;

    while (true) {
      slug = nanoid(5);
      const exists = await ShortUrl.find({ slug });
      if (exists.length > 0) break;
    }

    const shortUrl: IShortUrl = new ShortUrl({
      url: body.url,
      slug,
    });

    const newShortUrl: IShortUrl = await shortUrl.save();

    res.status(201).json({ message: "success", shortUrl: newShortUrl });
  } catch (error) {
    throw error;
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
    const deactivatedShortUrl: IShortUrl | null = await ShortUrl.findByIdAndUpdate(
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

export { getShortUrls, addShortUrl, deactivateShortUrl };
