import { useRouter } from "next/router";
import styles from "@/styles/Banner.module.css";

import { BsFillPlayFill } from "react-icons/bs";

type Props = {
  title: string;
  subTitle: string;
  imgUrl: string;
  videoId: string;
};

const Banner = ({ title, subTitle, imgUrl, videoId }: Props) => {
  const router = useRouter();

  const handleOnPlay = () => {
    router.push(`video/${videoId}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>v</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <BsFillPlayFill color="#1f2937" size={32} />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl}`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
