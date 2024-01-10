import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { log } from "console";

interface TaxResidence {
  country: string;
  taxIdentifyNumber: string;
  noTax: boolean;
  reason: string;
  noTinReson2: string;
}

interface TaxResidenceFormProps {
  disabled: string;
}

const TaxResidenceForm: React.FC<TaxResidenceFormProps> = ({ disabled }) => {
  const [taxResidences, setTaxResidences] = useState<TaxResidence[]>([]);
  const [showReasonField, setShowReasonField] = useState(false);

  console.log("taxResidences ==>", taxResidences);

  const handleAddTaxResidence = () => {
    if (taxResidences.length < 5) {
      setTaxResidences([
        ...taxResidences,
        {
          country: "",
          taxIdentifyNumber: "",
          noTax: false,
          reason: "",
          noTinReson2: "",
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
    updatedResidences[index].reason = "";
    setTaxResidences(updatedResidences);

    if (checked) {
      setShowReasonField(true);
    } else {
      setShowReasonField(false);
    }
  };

  const handleReasonChange = (index: number, value: string) => {
    const updatedResidences = [...taxResidences];
    updatedResidences[index].reason = value;
    setTaxResidences(updatedResidences);
  };

  const handleReason2TextChange = (index: number, value: string) => {
    const updatedResidences = [...taxResidences];
    updatedResidences[index].noTinReson2 = value;
    setTaxResidences(updatedResidences);
  };

  return (
    <div>
      {disabled === "yes" && (
        <p>Tax Residence form is disabled because yes option is selected.</p>
      )}
      {disabled !== "none" && disabled !== "yes" && (
        <div>
          <div className={`${styles.titleTaxResidence} ${styles.mt16}`}>
            Please specify your country of tax residence and tax identification
            number.
          </div>
          {taxResidences.map((residence, index) => (
            <div key={index}>
              <div
                className={`${styles.flex} ${styles.alignItemCenter}  ${styles.jusityBetween}`}
              >
                <h3>Tax Residence {index + 1}</h3>
                <Image
                  className={styles.iconPointer}
                  onClick={() => handleRemoveTaxResidence(index)}
                  width={24}
                  height={24}
                  src="/delete.svg"
                  alt="delete"
                />
              </div>
              <select
                className={styles.select__field}
                value={residence.country}
                onChange={(e) => handleCountryChange(index, e.target.value)}
              >
                <option value="country1">Country 1</option>
                <option value="country2">Country 2</option>
              </select>
              <input
                type="text"
                className={styles.TextFieldspecifyNoTinReason2}
                placeholder="Tax Identify Number"
                value={residence.taxIdentifyNumber}
                onChange={(e) =>
                  handleTaxIdentifyNumberChange(index, e.target.value)
                }
              />

              <br></br>
              <div className={`${styles.flex} ${styles.alignItemCenter}`}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={`noTax${index}`}
                  checked={residence.noTax}
                  onChange={(e) => handleNoTaxChange(index, e.target.checked)}
                />
                <label className={styles.labelNoTax} htmlFor={`noTax${index}`}>
                  No tax identification number
                </label>
              </div>

              {showReasonField && residence.noTax && (
                <div className={styles.reasonField}>
                  <label htmlFor={`reason${index}`}>
                    Please provide reason:
                  </label>
                  <br />
                  <div className={`${styles.flex}`}>
                    <input
                      type="radio"
                      className={`${styles.inputRadio}`}
                      id={`reason1${index}`}
                      value="Applicant or authorized person residing in a country without issued tax residence number."
                      checked={
                        residence.reason ===
                        "Applicant or authorized person residing in a country without issued tax residence number."
                      }
                      onChange={() =>
                        handleReasonChange(
                          index,
                          "Applicant or authorized person residing in a country without issued tax residence number."
                        )
                      }
                    />
                    <label
                      className={`${styles.ml8}`}
                      htmlFor={`reason1${index}`}
                    >
                      Applicant or authorized person residing in a country
                      without issued tax residence number.
                    </label>
                  </div>
                  <br />
                  <div className={`${styles.flex}`}>
                    <input
                      type="radio"
                      id={`reason2${index}`}
                      className={styles.inputRadio}
                      value="Applicant or authorized person yet to receive the issued tax identification number."
                      checked={
                        residence.reason ===
                        "Applicant or authorized person yet to receive the issued tax identification number."
                      }
                      onChange={() =>
                        handleReasonChange(
                          index,
                          "Applicant or authorized person yet to receive the issued tax identification number."
                        )
                      }
                    />
                    <label
                      className={`${styles.ml8}`}
                      htmlFor={`reason2${index}`}
                    >
                      Applicant or authorized person yet to receive the issued
                      tax identification number.
                    </label>
                  </div>
                  {residence.reason ===
                    "Applicant or authorized person yet to receive the issued tax identification number." && (
                    <>
                      <div className={`${styles.spanTextReason2} ${styles.specifyNoTinReason2}`}>
                        Explain the reason why you cannot request Tax
                        identification number:
                      </div>
                      <input
                       className={styles.TextFieldspecifyNoTinReason2}
                        type="text"
                        placeholder="Reason"
                        value={residence.noTinReson2}
                        onChange={(e) =>
                          handleReason2TextChange(index, e.target.value)
                        }
                      />
                    </>
                  )}

                  <br />
                  <div className={`${styles.flex}`}>
                    <input
                      type="radio"
                      className={styles.inputRadio}
                      id={`reason3${index}`}
                      value="No need to disclose taxpayer identification number."
                      checked={
                        residence.reason ===
                        "No need to disclose taxpayer identification number."
                      }
                      onChange={() =>
                        handleReasonChange(
                          index,
                          "No need to disclose taxpayer identification number."
                        )
                      }
                    />
                    <label
                      className={`${styles.ml8} ${styles.mt5}`}
                      htmlFor={`reason3${index}`}
                    >
                      No need to disclose taxpayer identification number.
                      <div className={`${styles.spanTextReason2}`}>
                        Not mandatory to provide or reveal identification
                        numbers as per country&apos;s laws.
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}
          {taxResidences.length < 5 && (
            <button
              className={`${styles.mt16} ${styles.addTaxResidenceCountryBtn}`}
              onClick={handleAddTaxResidence}
            >
              <span>
                <Image className={styles.mt5} width={24} height={24} src="/plus.svg" alt="plus" />
              </span>
              Add tax residence country
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaxResidenceForm;
