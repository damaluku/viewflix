import { ChangeEvent, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import clsx from "classnames";
import styles from "@/styles/Section-card.module.css";
import { VideoTypes } from "@/lib/videos";

type PageProps = {
  title: string;
  videos: VideoTypes[];
  size: "small" | "medium" | "large";
  shouldWrap?: boolean;
  shouldScale: boolean;
  showRegion?: boolean;
};

const SectionCards = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
  showRegion = false,
}: PageProps) => {
  const [region, setRegion] = useState<string>("NG");

  const handleChanges = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        {showRegion && (
          <select value={region} onChange={handleChanges}>
            <option value="NG">NG</option>
            <option value="US">US</option>
            <option value="CA">CA</option>
          </select>
        )}
      </div>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos?.map((video: any, idx) => {
          return (
            <Link href={`/video/${video?.id}`} key={video?.id}>
              <Card
                id={idx}
                imgUrl={video.imgUrl}
                size={size}
                shouldScale={shouldScale}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
