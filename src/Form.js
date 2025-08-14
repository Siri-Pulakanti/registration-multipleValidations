import React, { useEffect, useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  useEffect(() => {
    if (
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      termsAccepted &&
      error === ""
    ) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [name, email, password, confirmPassword, error, termsAccepted]);

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);

    if (value.trim() === "") {
      setError("Name cannot be empty");
    } else if (/\d/.test(value)) {
      setError("Name cannot contain numbers");
    } else {
      setError("");
    }
  }

  function handleEmailChange(value) {
    setEmail(value);
    if (!isValidEmail(value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  }

  function handlePwdChange(e) {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 8) {
      setError("Password must be at least 8 characters long");
    } else if (!/[A-Z]/.test(value)) {
      setError("Password must contain at least one uppercase letter");
    } else if (!/[a-z]/.test(value)) {
      setError("Password must contain at least one lowercase letter");
    } else if (!/[0-9]/.test(value)) {
      setError("Password must contain at least one number");
    } else {
      setError("");
    }
  }

  function handleConfirmPwd(e) {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setError("Must exactly match Password");
    } else {
      setError("");
    }
  }

  function handleTermsCheckbox(e) {
    setTermsAccepted(e.target.checked);
  }

  function handleBtnClick() {
    const userData = { name, email, password, confirmPassword };
    console.log(userData);
    alert("Registered Successfully");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTermsAccepted(false);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Registration Form</h2>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter full name"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Enter email"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          placeholder="Enter password"
          onChange={handlePwdChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          placeholder="Confirm password"
          onChange={handleConfirmPwd}
          required
        />
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={termsAccepted}
          onChange={handleTermsCheckbox}
          id="termsCheckbox"
        />
        <label className="form-check-label" htmlFor="termsCheckbox">
          I agree to the Terms and Conditions
        </label>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleBtnClick}
        disabled={!enableSubmit}
      >
        Register
      </button>

      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}

export default Form;
