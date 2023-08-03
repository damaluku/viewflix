import Head from "next/head";

import { getMyList } from "@/lib/videos";
import styles from "@/styles/MyList.module.css";
import { VideoTypes } from "@/lib/videos";
import UseRedirectUser from "@/utils/redirectUser";
import SectionCards from "@/components/card/SectionCards";

interface Props {
  myListVideos: VideoTypes[];
}

const MyList = ({ myListVideos }: Props) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.sectionWrapper}>
          {myListVideos.length > 0 ? (
            <SectionCards
              title="My List"
              videos={myListVideos}
              size="small"
              shouldWrap
              shouldScale={false}
            />
          ) : (
            <div className={styles.emptyList}>
              <h2>This list is empty.</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyList;

export async function getServerSideProps(context: any) {
  const { userId, token } = await UseRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}
