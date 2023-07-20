import videoData from "@/data/videos.json";
import { YoutubeProps } from "@/types/scriptTypes";

export type VideoTypes = {
  id: string;
  title: string;
  imgUrl: string;
};

export const getCommonVideos = async (url: string) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

  try {
    const response = await fetch(
      `${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.error("Youtube API error: " + data.error);
      return [];
    }

    return data?.items.map((item: any, i: string) => {
      return {
        id: item?.id?.videoId ? item?.id?.videoId : i + 1,
        title: item.snippet.title,
        imgUrl: item?.snippet?.thumbnails?.high?.url,
      };
    });
  } catch (error) {
    console.error("Something went wrong when loading videos", error);

    return [];
  }
};

export const getVideos = (searchQuery: string) => {
  const URL = `search?part=snippet&q=${searchQuery}%20trailer`;

  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=NG";

  return getCommonVideos(URL);
};
