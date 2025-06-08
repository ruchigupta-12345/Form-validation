import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';

const countryCityData = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Ottawa']
};

const FormPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = (field = null, value = null) => {
    const data = field ? { ...formData, [field]: value } : formData;
    const errs = {};

    for (let key in data) {
      if (!data[key]) errs[key] = 'This field is required';
    }

    if (data.email && !/\S+@\S+\.\S+/.test(data.email))
      errs.email = 'Invalid email format';

    if (data.phoneNumber && !/^\d{10}$/.test(data.phoneNumber))
      errs.phoneNumber = 'Phone must be 10 digits';

    if (data.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan))
      errs.pan = 'PAN format: ABCDE1234F';

    if (data.aadhar && !/^\d{12}$/.test(data.aadhar))
      errs.aadhar = 'Aadhar must be 12 digits';

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const fieldError = validate(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError[name] || ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/success', { state: formData });
    }
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every(field => field.trim() !== '') &&
      Object.values(errors).every(err => err === '')
    );
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'username', 'email', 'phoneCode', 'phoneNumber', 'pan', 'aadhar'].map(field => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country:</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">-- Select --</option>
            {Object.keys(countryCityData).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        {/* City */}
        <div className="form-group">
          <label>City:</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">-- Select --</option>
            {(countryCityData[formData.country] || []).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <button type="submit" disabled={!isFormValid()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
