import videoTestData from "@/data/videos.json";
import { YoutubeProps } from "@/types/scriptTypes";
import { getMyListVideos, getWatchedVideos } from "./db/hasura";

export type VideoTypes = {
  id: string;
  title: string;
  imgUrl: string;
};

const fetchVideos = async (url: string) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `${BASE_URL}/${url}&maxResults=8&key=${YOUTUBE_API_KEY}`
  );

  return await response.json();
};

export const getCommonVideos = async (url: string) => {
  try {
    const isDev = process.env.DEVELOPMENT;

    const data = isDev ? videoTestData : await fetchVideos(url);

    if (data?.error) {
      console.error("Youtube API error: " + data.error);
      return [];
    }

    return data?.items.map((item: any, i: string) => {
      const snippet = item.snippet;
      // const id = item?.id?.videoId || item?.id;
      const videoId = item?.id?.videoId ? item?.id?.videoId : item.id;

      return {
        id: videoId,
        title: snippet.title,
        imgUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet?.channelTitle,
        statistics: item?.statistics ? item?.statistics : { viewCount: 0 },
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
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (id: string) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;

  return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (userId: string, token: string) => {
  const videos = await getWatchedVideos(userId, token);

  return videos.map((video: any) => {
    return {
      id: video?.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video?.videoId}/maxresdefault.jpg`,
    };
  });
};

export const getMyList = async (userId: string, token: string) => {
  const videos = await getMyListVideos(userId, token);
  return (
    videos?.map((video: any) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || []
  );
};
