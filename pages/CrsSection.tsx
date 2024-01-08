import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import ChooseOne from "./chooseOne";
import TaxResidenceForm from "./TaxResidence";
import Image from "next/image";

interface InfoCardProps {
  icon: string;
  title: string;
  details: string;
  showTooltip: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  details,
  showTooltip,
}) => {
  return (
    <>
      <div className={styles.infoHeader}>
        <span className={styles.infoIcon}>
          <Image width={16} height={16} src={icon} alt="tooltip" />
        </span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={`${styles.flex} ${styles.alignItemEnd}`}>
        <div className={styles.infoDetails}>{details}</div>
        {showTooltip ? (
          <span className={styles.ml4}>
            <Image width={16} height={16} src="/tooltip.svg" alt="tooltip" />
          </span>
        ) : null}
      </div>
    </>
  );
};

const CrsSection: React.FC = () => {
  const [isTaxResidenceEnabled, setIsTaxResidenceEnabled] =
    useState<string>("none");

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // เปลี่ยนเมื่อความกว้างหน้าจอน้อยกว่า 768px (เหมาะสำหรับ mobile)
    };

    handleResize(); // ตรวจสอบความกว้างของหน้าต่างเมื่อโหลดหน้าจอ
    window.addEventListener("resize", handleResize); // เพิ่ม event listener สำหรับการ resize ของหน้าต่าง
    return () => window.removeEventListener("resize", handleResize); // ลบ event listener เมื่อ Component ถูก unmount
  }, []);

  const handleChooseOneOption = (option: "none" | "yes" | "no") => {
    if (option === "yes") {
      setIsTaxResidenceEnabled("yes");
    } else if (option === "no") {
      setIsTaxResidenceEnabled("no");
    }
    else {
      setIsTaxResidenceEnabled("none");
    }
  };

  return (
    <>
      <InfoCard
        icon={require("@/public/language.svg")}
        title="Declaration of tax residence"
        details="Declaration of tax residence to comply with the Royal Decree Schedule information exchange to comply with International Agreement on Taxation (CRS Law)"
        showTooltip={false}
      />
      <InfoCard
        icon={require("@/public/account.svg")}
        title="Applicant for insurance"
        details="Are you a tax resident only in Thailand?"
        showTooltip={true}
      />
      <div className={styles.mt16}>
        <ChooseOne handleChooseOneOption={handleChooseOneOption} />
      </div>
      {isTaxResidenceEnabled && (
       <TaxResidenceForm disabled={isTaxResidenceEnabled} />
     )}
    </>
  );
};

export default CrsSection;
