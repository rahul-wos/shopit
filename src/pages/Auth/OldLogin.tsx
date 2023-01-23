import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { emailRegex } from "../../constants/constants
import { FormGroup } from "@/components/OldFormGroup/FormGroup";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useInitialRenderSkip } from "@/hooks/useInitialRenderSkip";
import "./Auth.css";

interface FormData {
  email: {
    value: string;
    error: string;
  };
  password: {
    value: string;
    error: string;
  };
}

export default function Login() {
  const firstMount = useInitialRenderSkip();
  const [formData, setFormData] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });

  useEffect(() => {
    !firstMount && handleErrorMessages();
  }, [formData.email.value, formData.password.value]);

  const handleErrorMessages = () => {
    console.log(formData);
    setFormData({
      ...formData,
      email: { ...formData.email, error: validate(formData, "email") },
      password: { ...formData.password, error: validate(formData, "password") },
    });
  };

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((data) => {
      return {
        ...data,
        [name]: {
          ...data.password,
          value: value,
        },
      };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Submitted!");

    // const noErrors = Object.values(errorMessages).every((x) => x === null || x === "");
    // noErrors && toast.success("Logged In Successfully!");
  };

  const validate = (data: FormData, type: string) => {
    if (type === "email") {
      let emailError;
      if (!emailRegex.test(data.email.value)) {
        emailError = "Please enter a valid email address";
      }

      if (!data.email.value) {
        emailError = "Email should not be empty";
      }

      return emailError;
    } else if (type === "password") {
      let passwordError;

      if (!data.password) {
        passwordError = "Password should not be empty";
      }

      if (data.password.value.length <= 6) {
        passwordError = "Password should be more than 6 characters long";
      }

      if (data.password.value.length >= 20) {
        passwordError = "Password should be less than 20 characters long";
      }
      return passwordError;
    }
    return "";
  };

  return (
    <>
      <main className="auth-main">
        <section className="auth-form-wrap">
          <h1 className="fw-700 text-center mb-4">Login</h1>

          <pre>Input Data: {JSON.stringify(formData, null, 2)}</pre>
          {/* <pre>Errors: {JSON.stringify(errorMessages, null, 2)}</pre> */}
          <Form onSubmit={handleFormSubmit} className="w-100">
            <FormGroup
              id={"emailControl"}
              type={"text"}
              value={formData.email.value}
              name="email"
              errorMessage={formData.email.error}
              label={"Email address"}
              placeholder="reallycool@email.com"
              parentClassName={"mb-3"}
              onChange={handleInputChange}
            />

            <FormGroup
              id={"passwordControl"}
              type={"password"}
              value={formData.password.value}
              name="password"
              errorMessage={formData.password.error}
              label={"Password"}
              placeholder="Should be 6-20 characters long"
              parentClassName={"mb-5"}
              onChange={handleInputChange}
            />

            <Button type="submit" className="mx-auto d-flex">
              Login
            </Button>
          </Form>

          <p className="text-center d-block mt-3">
            Don&apos;t have an account? <Link to={"/sign-up"}>Sign Up here</Link>
          </p>
        </section>
      </main>
      <Toaster />
    </>
  );
}
