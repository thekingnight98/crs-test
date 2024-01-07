import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import ChooseOne from "./chooseOne";
import TaxResidenceForm from "./TaxResidence";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  showChooseOne: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  details,
  showChooseOne,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // เปลี่ยนเมื่อความกว้างหน้าจอน้อยกว่า 768px (เหมาะสำหรับ mobile)
    };

    handleResize(); // ตรวจสอบความกว้างของหน้าต่างเมื่อโหลดหน้าจอ
    window.addEventListener("resize", handleResize); // เพิ่ม event listener สำหรับการ resize ของหน้าต่าง
    return () => window.removeEventListener("resize", handleResize); // ลบ event listener เมื่อ Component ถูก unmount
  }, []);

  return (
    <div>
      <div className={styles.infoHeader}>
        <span className={styles.infoIcon}>{icon}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={`${styles.flex} ${isMobile ? styles.jusityBetween : ""}`}>
        <p className={styles.infoDetails}>{details}</p>
        {showChooseOne && <ChooseOne />}
      </div>
      <TaxResidenceForm/>
    </div>
  );
};

const CrsSection: React.FC = () => {
  return (
    <>
      <InfoCard
        icon="Icon1"
        title="หัวข้อ 1"
        details="รายละเอียดของหัวข้อ 1"
        showChooseOne={false}
      />
      <InfoCard
        icon="Icon2"
        title="หัวข้อ 2"
        details="รายละเอียดของหัวข้อ 2"
        showChooseOne={true}
      />
    </>
  );
};

export default CrsSection;
