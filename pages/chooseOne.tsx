import React, { useState } from "react";
import styles from "./styles.module.scss";

const ChooseOne: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<"none" | "yes" | "no">("none");

  const handleOptionClick = (option: "yes" | "no") => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.flex}>
      <button
        className={`${styles.optionButton} ${selectedOption === "yes" ? styles.active : ""}`}
        onClick={() => handleOptionClick("yes")}
      >
        Yes
      </button>
      <button
        className={`${styles.optionButton} ${selectedOption === "no" ? styles.active : ""}`}
        onClick={() => handleOptionClick("no")}
      >
        No
      </button>
    </div>
  );
};

export default ChooseOne;
