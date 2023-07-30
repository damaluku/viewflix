import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

import { verifyToken } from "@/lib/utils";
import { findVideoIdByUserId, insertStats, updateStats } from "@/lib/db/hasura";

/* import {
  findVideoIdByUser,
  updateStats,
  insertStats,
} from "../../lib/db/hasura"; */

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(403).send({});
      } else {
        const { favourited, watched = true, videoId } = req.body;

        if (videoId) {
          const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

          const userId = decodedToken?.issuer;

          const doesStatsExist = await findVideoIdByUserId(
            userId,
            videoId,
            token
          );

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
        }
      }
    } catch (error: any) {
      console.log("Error occured /stats", error);
      res.status(500).send({ error: error?.message });
    }
  }
}
