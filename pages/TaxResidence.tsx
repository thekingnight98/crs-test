import React, { useState } from 'react';

interface TaxResidence {
  country: string;
  taxIdentifyNumber: string;
  noTax: boolean;
}

const TaxResidenceForm: React.FC = () => {
  const [taxResidences, setTaxResidences] = useState<TaxResidence[]>([]);

  const handleAddTaxResidence = () => {
    if (taxResidences.length < 5) {
      setTaxResidences([
        ...taxResidences,
        {
          country: '',
          taxIdentifyNumber: '',
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
      {taxResidences.length < 5 && (
        <button onClick={handleAddTaxResidence}>Add Tax Residence</button>
      )}
      {taxResidences.map((residence, index) => (
        <div key={index}>
          <h3>Tax Residence {index + 1}</h3>
          <select
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
            onChange={(e) => handleTaxIdentifyNumberChange(index, e.target.value)}
          />
          <button onClick={() => handleRemoveTaxResidence(index)}>Remove</button>
          <br></br>
          <input
            type="checkbox"
            id={`noTax${index}`}
            checked={residence.noTax}
            onChange={(e) => handleNoTaxChange(index, e.target.checked)}
          />
          <label htmlFor={`noTax${index}`}>No tax identification number</label>
        </div>
      ))}
    </div>
  );
};

export default TaxResidenceForm;
