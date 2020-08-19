import React from "react";
import styles from "./styles.module.css";

import pigError from "../../assets/pigError.gif";

export default function Error() {
  return (
    <div className={styles.errorScreen}>
      <img src={pigError} alt="pig-error" />{" "}
    </div>
  );
}
