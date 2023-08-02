import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import { verifyToken } from "@/lib/utils";
import { findVideoIdByUserId, insertStats, updateStats } from "@/lib/db/hasura";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(403).send({});
    } else {
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams;

      if (videoId) {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

        const userId = decodedToken?.issuer;

        const findVideo = await findVideoIdByUserId(userId, videoId, token);

        const doesStatsExist = findVideo?.length > 0;

        if (req.method === "POST") {
          const { favourited, watched = true } = req.body;

          if (doesStatsExist) {
            //Updating

            const response = await updateStats(token, {
              favourited,
              userId,
              watched,
              videoId,
            });

            res.status(200).send({
              data: response,
            });
          } else {
            //creating

            const response = await insertStats(token, {
              favourited,
              userId,
              watched,
              videoId,
            });

            res.status(200).send({
              data: response,
            });
          }
        } else {
          if (doesStatsExist) {
            res.send(findVideo);
          } else {
            res.status(404).send({ user: null, message: "video not found" });
          }
        }
      }
    }
  } catch (error: any) {
    console.log("Error occured /stats", error);
    res.status(500).send({ done: false, error: error?.message });
  }
}
