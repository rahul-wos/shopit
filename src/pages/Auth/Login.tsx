import React, { useState } from "react";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { emailRegex } from "./../../constants/constants";
import { FormGroup } from "@/components/FormGroup/FormGroup";
import { Toaster, toast } from "react-hot-toast";
import "./Auth.css";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.FormEvent) => {
    let { name, value } = e.target as HTMLInputElement;
    setFormData((data) => ({ ...data, [name]: value }));

    setErrorMessages(validate(formData));

    const noErrors = Object.values(errorMessages).every((x) => x === null || x === "");
    noErrors && toast.success("Logged In Successfully!");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setErrorMessages(validate(formData));

    // const noErrors = Object.values(errorMessages).every((x) => x === null || x === "");
    // noErrors && toast.success("Logged In Successfully!");
  };

  const validate = (data: FormData) => {
    let errors = { email: "", password: "" };

    if (!emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email address";
    } else {
      errors.email = "";
    }

    if (!data.email) {
      errors.email = "Email should not be empty";
    }

    if (data.password.length <= 6) {
      errors.password = "Password should be more than 6 characters long";
    } else {
      errors.email = "Email should not be empty";
    }

    if (data.password.length >= 20) {
      errors.password = "Password should be less than 20 characters long";
    } else {
      errors.email = "Email should not be empty";
    }

    if (!data.password) {
      errors.password = "Password should not be empty";
    }

    return errors;
  };

  return (
    <>
      <main className="auth-main">
        <section className="auth-form-wrap">
          <h1 className="fw-700 text-center mb-4">Login</h1>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          <pre>{JSON.stringify(errorMessages, null, 2)}</pre>
          <Form onSubmit={handleFormSubmit} className="w-100">
            <FormGroup
              id={"emailControl"}
              type={"text"}
              value={formData.email}
              name="email"
              errorMessage={errorMessages.email}
              label={"Email address"}
              placeholder="reallycool@email.com"
              parentClassName={"mb-3"}
              onChange={handleInputChange}
            />

            <FormGroup
              id={"passwordControl"}
              type={"password"}
              value={formData.password}
              name="password"
              errorMessage={errorMessages.password}
              label={"Password"}
              placeholder="Should be 6-20 characters long"
              parentClassName={"mb-5"}
              onChange={handleInputChange}
            />

            <Button type="submit" className="mx-auto d-flex">
              Login
            </Button>
          </Form>
        </section>
      </main>
      <Toaster />
    </>
  );
}
