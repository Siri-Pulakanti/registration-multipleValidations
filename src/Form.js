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
      name.trim() != "" &&
      email.trim() != "" &&
      password.trim() != "" &&
      confirmPassword.trim() != "" &&
      termsAccepted &&
      error == ""
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
    const userData = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(userData);
    alert("Registered Successfully");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTermsAccepted(false);
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter full name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        placeholder="Enter email"
        required
      />
      <input
        type="password"
        value={password}
        placeholder="Enter password"
        onChange={handlePwdChange}
        required
      />
      <input
        type="password"
        value={confirmPassword}
        placeholder="Confirm password"
        onChange={handleConfirmPwd}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={handleTermsCheckbox}
        />
        I agree to the Terms and Conditions
      </label>
      <button onClick={handleBtnClick} disabled={!enableSubmit}>
        Register
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Form;
