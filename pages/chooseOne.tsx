import React, { useState } from "react";
import styles from "./styles.module.scss";

interface ChooseOneProps {
  handleChooseOneOption: (option: "none" | "yes" | "no") => void;
}

const ChooseOne: React.FC<ChooseOneProps> = ({ handleChooseOneOption }) => {
  const [selectedOption, setSelectedOption] = useState<"none" | "yes" | "no">("none");

  const handleOptionClick = (option: "yes" | "no") => {
    setSelectedOption(option);
    handleChooseOneOption(option); // Call the handler function with the selected option
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
        className={`${styles.optionButton} ${styles.ml8} ${selectedOption === "no" ? styles.active : ""}`}
        onClick={() => handleOptionClick("no")}
      >
        No
      </button>
    </div>
  );
};

export default ChooseOne;
