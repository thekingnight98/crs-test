import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ChooseOne from "./chooseOne";
import styles from "./styles.module.scss";
import TaxResidenceForm from "./TaxResidence";

interface InfoCardProps {
  icon: string;
  title: string;
  details: string;
  showTooltip: boolean;
  handleChooseOneOption: (option: "none" | "yes" | "no") => void;
  isFormGrid: boolean;
  isMobile: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  details,
  handleChooseOneOption,
  icon,
  isFormGrid,
  showTooltip,
  title,
}) => {
  return (
    <>
      <div className={styles.infoHeader}>
        <span className={styles.infoIcon}>
          <Image width={16} height={16} src={icon} alt="tooltip" />
        </span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {isFormGrid ? (
        <div
          className={`${styles.flex} ${styles.alignItemEnd} ${styles.gridLayoutWrapper}`}
        >
          <div className={styles.infoDetails}>
            {details}
            {showTooltip ? (
              <span className={styles.ml4}>
                <Image
                  width={16}
                  height={16}
                  src="/tooltip.svg"
                  alt="tooltip"
                />
              </span>
            ) : null}
          </div>
          <div className={styles.mt16}>
            <ChooseOne handleChooseOneOption={handleChooseOneOption} />
          </div>
        </div>
      ) : (
        // กรณ๊ไม่ใช่ grid layout
        <div className={`${styles.flex} ${styles.alignItemEnd}`}>
          <div className={styles.infoDetails}>
            {details}
            {showTooltip ? (
              <span className={styles.ml4}>
                <Image
                  width={16}
                  height={16}
                  src="/tooltip.svg"
                  alt="tooltip"
                />
              </span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

const CrsSection: React.FC = () => {
  const [isTaxResidenceEnabled, setIsTaxResidenceEnabled] =
    useState<string>("none");

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChooseOneOption = useCallback((option: "none" | "yes" | "no") => {
    if (option === "yes") {
      setIsTaxResidenceEnabled("yes");
    } else if (option === "no") {
      setIsTaxResidenceEnabled("no");
    } else {
      setIsTaxResidenceEnabled("none");
    }
  }, []);

  return (
    <>
      <div
        className={
          isMobile ? styles.customFromWrapperMobile : styles.customFromWrapper
        }
      >
        <InfoCard
          icon={require("@/public/language.svg")}
          title="Declaration of tax residence"
          details="Declaration of tax residence to comply with the Royal Decree Schedule information exchange to comply with International Agreement on Taxation (CRS Law)"
          showTooltip={false}
          handleChooseOneOption={handleChooseOneOption}
          isFormGrid={false}
          isMobile={isMobile}
        />
        {/* แสดงเฉพาะจอมือถือ */}
        {isMobile && (
          <div className={styles.mt16}>
            <ChooseOne handleChooseOneOption={handleChooseOneOption} />
          </div>
        )}
        {/* แสดงเฉพาะจอ desktop */}
        {!isMobile && (
          <InfoCard
            icon={require("@/public/account.svg")}
            title="Applicant for insurance"
            details="Are you a tax resident only in Thailand?"
            showTooltip={true}
            handleChooseOneOption={handleChooseOneOption}
            isFormGrid={true}
            isMobile={isMobile}
          />
        )}
        {isTaxResidenceEnabled && (
          <TaxResidenceForm disabled={isTaxResidenceEnabled} />
        )}
      </div>
    </>
  );
};

export default CrsSection;
