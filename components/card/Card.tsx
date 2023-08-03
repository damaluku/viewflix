import { useState } from "react";
import Image from "next/image";

import cls from "classnames";
import { motion } from "framer-motion";

import styles from "@/styles/Card.module.css";

type Props = {
  imgUrl: string;
  size?: "small" | "medium" | "large";
  id: string | number;
  shouldScale: boolean;
};

const Card = ({
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80",
  size = "medium",
  id,
  shouldScale = true,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap: any = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    );
  };

  const scale = id == 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        {...shouldHover}
        whileTap={{ scale: 1.08 }}
      >
        <Image
          src={imgSrc.length > 0 ? imgSrc : "/static/mountains.jpg"}
          alt="image"
          fill
          onError={handleOnError}
          className={styles.cardImg}
          style={{
            objectFit: "cover",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Card;
