import React from "react";

import styles from "./styles.module.css";

import pigImage from "../../assets/pigImage.gif";

export default function Loading() {
  return (
    <div className={styles.loadingScreen}>
      <img src={pigImage} alt="pig-zzz-loading" />{" "}
    </div>
  );
}
