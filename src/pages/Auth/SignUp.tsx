import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { FormGroup } from "@/components/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { DBContext } from "@/contexts/UsersContext";
import { useContext } from "react";

interface SignUpDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name should not be empty"),
  lastName: Yup.string().required("Last Name should not be empty"),
  email: Yup.string().required("Email should not be empty").email("Please enter a valid email address"),
  password: Yup.string()
    .required("Password should not be empty")
    .min(6, "Password should be more than 6 characters in length")
    .max(20, "Password should be less than 20 characters in length"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords do not match"),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDetails>({
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
    resolver: yupResolver(signUpSchema),
  });

  const handleFormSubmit = handleSubmit((data) => {
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.lastName,
      password: data.password,
    };
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
              {...register("firstName")}
            />

            <FormGroup
              id={"lastNameControl"}
              type={"text"}
              label={"Last Name"}
              placeholder="Morgan"
              parentClassName={"mb-3"}
              error={errors.lastName?.message}
              {...register("lastName")}
            />

            <FormGroup
              id={"emailControl"}
              type={"text"}
              label={"Email address"}
              placeholder="arthurmorgan@email.com"
              parentClassName={"mb-3"}
              error={errors.email?.message}
              {...register("email")}
            />

            <FormGroup
              id={"passwordControl"}
              type={"password"}
              label={"Password"}
              placeholder="Password should be 6-20 characters long"
              parentClassName={"mb-3"}
              error={errors.password?.message}
              {...register("password")}
            />

            <FormGroup
              id={"confirmPasswordControl"}
              type={"password"}
              label={"Confirm Password"}
              placeholder="Confirm Password"
              parentClassName={"mb-5"}
              error={errors.confirmPassword?.message}
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
