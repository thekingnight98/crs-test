import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface TaxResidence {
  country: string;
  taxIdentifyNumber: string;
  noTax: boolean;
}
interface TaxResidenceFormProps {
  disabled: string;
}

const TaxResidenceForm: React.FC<TaxResidenceFormProps> = ({ disabled }) => {
  const [taxResidences, setTaxResidences] = useState<TaxResidence[]>([]);
  console.log("disabled ==>", disabled);

  const handleAddTaxResidence = () => {
    if (taxResidences.length < 5) {
      setTaxResidences([
        ...taxResidences,
        {
          country: "",
          taxIdentifyNumber: "",
          noTax: false,
        },
      ]);
    }
  };

  const handleRemoveTaxResidence = (index: number) => {
    const updatedResidences = [...taxResidences];
    updatedResidences.splice(index, 1);
    setTaxResidences(updatedResidences);
  };

  const handleCountryChange = (index: number, value: string) => {
    const updatedResidences = [...taxResidences];
    updatedResidences[index].country = value;
    setTaxResidences(updatedResidences);
  };

  const handleTaxIdentifyNumberChange = (index: number, value: string) => {
    const updatedResidences = [...taxResidences];
    updatedResidences[index].taxIdentifyNumber = value;
    setTaxResidences(updatedResidences);
  };

  const handleNoTaxChange = (index: number, checked: boolean) => {
    const updatedResidences = [...taxResidences];
    updatedResidences[index].noTax = checked;
    setTaxResidences(updatedResidences);
  };

  return (
    <div>
      {disabled === "yes" && (
        <p>Tax Residence form is disabled because yes option is selected.</p>
      )}
      {disabled !== "none" && disabled !== "yes" && (
        <div>
          {taxResidences.map((residence, index) => (
            <div key={index}>
              <div className={`${styles.flex} ${styles.alignItemCenter}  ${styles.jusityBetween}`}>
                <h3>Tax Residence {index + 1}</h3>
                <Image onClick={() => handleRemoveTaxResidence(index)} width={24} height={24} src="/delete.svg" alt="delete" />
              </div>
              <select
                className={styles.select__field}
                value={residence.country}
                onChange={(e) => handleCountryChange(index, e.target.value)}
              >
                {/* Dropdown ประเทศในเลือก */}
                <option value="country1">Country 1</option>
                <option value="country2">Country 2</option>
                {/* อื่น ๆ */}
              </select>
              <input
                type="text"
                placeholder="Tax Identify Number"
                value={residence.taxIdentifyNumber}
                onChange={(e) =>
                  handleTaxIdentifyNumberChange(index, e.target.value)
                }
              />

              <br></br>
              <input
                type="checkbox"
                id={`noTax${index}`}
                checked={residence.noTax}
                onChange={(e) => handleNoTaxChange(index, e.target.checked)}
              />
              <label htmlFor={`noTax${index}`}>
                No tax identification number
              </label>
            </div>
          ))}
          {taxResidences.length < 5 && (
            <button
              className={`${styles.mt16} ${styles.addTaxResidenceCountryBtn}`}
              onClick={handleAddTaxResidence}
            >
              <span>
                <Image width={16} height={16} src="/plus.svg" alt="tooltip" />
              </span>
              Add Tax Residence
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaxResidenceForm;
