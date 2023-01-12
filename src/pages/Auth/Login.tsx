import React, { useState } from "react";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { emailRegex } from "./../../constants/constants";
import { FormGroup } from "@/components/FormGroup/FormGroup";
import "./Auth.css";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const handleInputsChange = (e: React.FormEvent) => {
    let { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages(validate(formData));

    if (Object.keys(errorMessages.length === 0)) {
      console.log("NO");
    } else {
      setShowSuccessToast(true);
    }
  };

  const validate = (data: FormData) => {
    let errors = { email: "", password: "" };

    if (!emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.email) {
      errors.email = "Email should not be empty";
    }

    if (data.password.length <= 6) {
      errors.password = "Password should be more than 6 characters long";
    }

    if (data.password.length > 20) {
      errors.password = "Password should be less than 20 characters long";
    }

    if (!data.password) {
      errors.password = "Password should not be empty";
    }

    return errors;
  };

  const SuccessToast = () => {
    return (
      <ToastContainer position="top-center">
        <Toast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          delay={1500}
        >
          <Toast.Body>Logged in successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  };

  return (
    <>
      <main className="auth-main">
        <section className="auth-form-wrap">
          <h1 className="fw-700">Login</h1>
          <Form onSubmit={handleFormSubmit} className="w-100">
            <FormGroup
              id={"emailControl"}
              type={"text"}
              value={formData.email}
              name="email"
              errorMessage={errorMessages.email}
              label={"Email address"}
              placeholder="reallycool@email.com"
              onChange={handleInputsChange}
            />

            <FormGroup
              id={"passwordControl"}
              type={"password"}
              value={formData.password}
              name="password"
              errorMessage={errorMessages.password}
              label={"Password"}
              placeholder="Should be 6-20 characters long"
              onChange={handleInputsChange}
            />

            <Button type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </section>
      </main>
      <SuccessToast />
    </>
  );
}
