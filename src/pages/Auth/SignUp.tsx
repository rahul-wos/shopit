import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { FormGroup } from "@/components/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SignUpDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [db, setDB] = useLocalStorage("database", []);

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name should not be empty"),
    lastName: Yup.string().required("Last Name should not be empty"),
    email: Yup.string()
      .required("Email should not be empty")
      .email("Please enter a valid email address"),
    password: Yup.string()
      .required("Password should not be empty")
      .min(6, "Password should be more than 6 characters in length")
      .max(20, "Password should be less than 20 characters in length"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords do not match"
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpDetails>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const handleFormSubmit = handleSubmit((data) => {
    if (!db) {
      setDB([]);
    }

    const newUser = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      password: data.password,
    };

    const emailExists = db.some(
      (user: UserInfo) => user.email === newUser.email
    );

    if (!emailExists) {
      db.push(newUser);
      setDB(db);
    }
    reset();
  });

  return (
    <>
      <main className="auth-main">
        <section className="auth-form-wrap">
          <h1 className="fw-700 text-center mb-4">Sign Up</h1>

          <Form className="w-100" onSubmit={handleFormSubmit}>
            <FormGroup
              id={"firstNameControl"}
              type={"text"}
              label={"First Name"}
              placeholder="Arthur"
              parentClassName={"mb-3"}
              error={errors.firstName?.message}
              autoComplete={"off"}
              {...register("firstName")}
            />

            <FormGroup
              id={"lastNameControl"}
              type={"text"}
              label={"Last Name"}
              placeholder="Morgan"
              parentClassName={"mb-3"}
              error={errors.lastName?.message}
              autoComplete={"off"}
              {...register("lastName")}
            />

            <FormGroup
              id={"emailControl"}
              type={"text"}
              label={"Email address"}
              placeholder="arthurmorgan@email.com"
              parentClassName={"mb-3"}
              error={errors.email?.message}
              autoComplete={"on"}
              {...register("email")}
            />

            <FormGroup
              id={"passwordControl"}
              type={"password"}
              label={"Password"}
              placeholder="Password should be 6-20 characters long"
              parentClassName={"mb-3"}
              error={errors.password?.message}
              autoComplete={"off"}
              {...register("password")}
            />

            <FormGroup
              id={"confirmPasswordControl"}
              type={"password"}
              label={"Confirm Password"}
              placeholder="Confirm Password"
              parentClassName={"mb-5"}
              error={errors.confirmPassword?.message}
              autoComplete={"off"}
              {...register("confirmPassword")}
            />

            <Button type="submit" className="mx-auto d-flex">
              Sign Up
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
