import { FormGroup } from "@/components/FormGroup/FormGroup";
import { emailRegex } from "@/constants/constants";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Auth.css";

interface FormData {
  email: string;
  password: string;
}

export default function SignUp() {
  const [usersList, setUsersList] = useState([{ id: 0, email: "", password: "" }]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });
  const initialRender = useRef(true);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    const noErrors = Object.values(errorMessages).every((x) => x === null || x === "");

    if (initialRender.current) {
      initialRender.current = false;
    } else if (noErrors) {
      let user = { id: Date.now(), email: formData.email, password: formData.password };

      const lsUsersList = localStorage.getItem("users");

      if (lsUsersList === null) {
        setUsersList((allUsers) => [...allUsers, user]);
      } else {
        let lsUsersListArr = JSON.parse(lsUsersList || "{}");
        console.log(lsUsersListArr);
      }
    }
  }, [errorMessages]);

  const handleInputChange = (e: React.FormEvent) => {
    let { name, value } = e.target as HTMLInputElement;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages(validate(formData));
  };

  const validate = (data: FormData) => {
    let errors = { email: "", password: "" };

    let emailExists = usersList.some((item) => {
      return item.email === data.email;
    });

    if (emailExists) {
      errors.email = "Email is already registered. Please use another email.";
    }

    if (!emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.email) {
      errors.email = "Email should not be empty";
    }

    if (data.password.length <= 6) {
      errors.password = "Password should be more than 6 characters long";
    }

    if (data.password.length >= 20) {
      errors.password = "Password should be less than 20 characters long";
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
          <h1 className="fw-700 text-center mb-4">Sign Up</h1>

          <pre>Users List: {JSON.stringify(usersList, null, 2)}</pre>
          <pre>Input Data: {JSON.stringify(formData, null, 2)}</pre>
          <pre>Errors: {JSON.stringify(errorMessages, null, 2)}</pre>
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
              Create Account
            </Button>
          </Form>

          <p className="text-center d-block mt-3">
            Already have an account? <Link to={"/login"}>Login here</Link>
          </p>
        </section>
      </main>
      <Toaster />
    </>
  );
}
