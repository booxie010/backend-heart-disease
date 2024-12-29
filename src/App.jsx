import React, { useState } from 'react';

const HeartDiseaseForm = () => {
  const [probabilities, setProbabilities] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFormData = () => {
    const keys = Object.keys(formData);
    for (const key of keys) {
      if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
        alert('Please enter a valid value for ${key}');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) return;

    try {
      const response = await fetch('https://web-production-72a08.up.railway.app/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(formData.age),
          sex: parseInt(formData.sex),
          cp: parseInt(formData.cp),
          trestbps: parseInt(formData.trestbps),
          chol: parseInt(formData.chol),
          fbs: parseInt(formData.fbs),
          restecg: parseInt(formData.restecg),
          thalach: parseInt(formData.thalach),
          exang: parseInt(formData.exang),
          oldpeak: parseFloat(formData.oldpeak),
          slope: parseInt(formData.slope),
          ca: parseInt(formData.ca),
          thal: parseInt(formData.thal),
        }),
      });
      console.log(JSON.stringify({
        age: parseInt(formData.age),
        sex: parseInt(formData.sex),
        cp: parseInt(formData.cp),
        trestbps: parseInt(formData.trestbps),
        chol: parseInt(formData.chol),
        fbs: parseInt(formData.fbs),
        restecg: parseInt(formData.restecg),
        thalach: parseInt(formData.thalach),
        exang: parseInt(formData.exang),
        oldpeak: parseFloat(formData.oldpeak),
        slope: parseInt(formData.slope),
        ca: parseInt(formData.ca),
        thal: parseInt(formData.thal),
      }));

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
        setProbabilities({
          negative: parseFloat(data.probabilities.negative)||0,
          positive: parseFloat(data.probabilities.positive)||0,
        });
      } else {
        setPrediction('Server Error:' + (data.error || 'Unknown error occurred'));
      }
    } catch (error) {
      setPrediction('Error connecting to server');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            id="age"
            type="text"
            name="age"
            placeholder="Enter age (e.g., 45)"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Sex:
          <select id="sex" name="sex" value={formData.sex} onChange={handleChange} required>
            <option value="" disabled>
              Please select...
            </option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
        </label>
        <br />

        <label>
          Chest Pain (0-3):
          <select id="cp" name="cp" value={formData.cp} onChange={handleChange} required>
            <option value="" disabled>
              Please select...
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <br />

        <label>
          Resting Blood Pressure (mm Hg):
          <input
            id="trestbps"
            type="text"
            name="trestbps"
            placeholder="Enter value (e.g., 120)"
            value={formData.trestbps}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Serum Cholesterol (mg/dl):
          <input
            id="chol"
            type="text"
            name="chol"
            placeholder="Enter value (e.g., 200)"
            value={formData.chol}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Fasting Blood Sugar ({'>'}120 mg/dl):
          <select id="fbs" name="fbs" value={formData.fbs} onChange={handleChange} required>
            <option value="" disabled>
              Please select...
            </option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </label>
        <br />

        <label>
          Resting ECG (0-2):
          <select id="restecg" name="restecg" value={formData.restecg} onChange={handleChange} required>
            <option value="" disabled>
              Please select...
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <br />

        <label>
          Maximum Heart Rate (bpm):
          <input
            id="thalach"
            type="text"
            name="thalach"
            placeholder="Enter value (e.g., 150)"
            value={formData.thalach}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Exercise Induced Angina:
          <select id="exang" name="exang" value={formData.exang} onChange={handleChange} required>
            <option value="" disabled>
              Please select...
            </option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </label>
        <br />

        <label>
          Oldpeak:
          <input
            id="oldpeak"
            type="text"
            name="oldpeak"
            placeholder="Enter value (e.g., 1.5)"
            value={formData.oldpeak}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Slope:
          <input
            id="slope"
            type="text"
            name="slope"
            placeholder="Enter value (e.g., 2)"
            value={formData.slope}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Number Of Major Vessels:
          <select id="ca" name="ca" value={formData.ca} onChange={handleChange} required>
            <option value="" disabled>
              Please select...
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <br />

        <label>
          Thalasemia:
          <input
            id="thal"
            type="text"
            name="thal"
            placeholder="Enter value (e.g., 2)"
            value={formData.thal}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      {prediction && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Hasil Prediksi:</h3>
          <p>{prediction}</p>
          {probabilities && (
            <div>
              <p>Probabilitas Risiko Negatif: {probabilities.negative}%</p>
              <p>Probabilitas Risiko Positif: {probabilities.positive}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeartDiseaseForm;