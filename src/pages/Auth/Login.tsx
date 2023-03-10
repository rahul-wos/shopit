import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { FormGroup } from "@/components/CustomInput/CustomInput";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import bcrypt from "bcryptjs";
import "./Auth.css";

interface LoginInfo {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email should not be empty").email("Please enter a valid email address"),
  password: Yup.string()
    .required("Password should not be empty")
    .min(6, "Password should be more than 6 characters")
    .max(20, "Password should be less than 20 characters"),
});

export default function Login() {
  const [usersList, setUsersList] = useState<User[]>([]);

  const getUsersList = async () => {
    try {
      const res = await axios.get("http://localhost:3010/users");
      const data = await res.data;
      setUsersList(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInfo>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginSchema),
  });

  const handleFormSubmit = handleSubmit((data) => {
    const checkUser = (item: User) => {
      const { email, password } = item;
      const doesPasswordMatch = bcrypt.compareSync(data.password, password);

      if (email === data.email && doesPasswordMatch) {
        return true;
      } else {
        return false;
      }
    };

    const emailExists = usersList.some((item) => item.email === data.email);
    const isCorrectPassword = usersList.some((item) => checkUser(item));

    if (!emailExists) {
      setError("email", { message: "Account does not exists!" });
    } else if (!isCorrectPassword) {
      setError("password", { message: "Incorrect Password!" }, { shouldFocus: true });
    } else {
      toast.success("Login Successful");
    }
  });

  return (
    <>
      <main className="auth-main">
        <section className="auth-form-wrap">
          <h1 className="fw-700 text-center mb-4">Login</h1>
    
          <Form className="w-100" onSubmit={handleFormSubmit}>
            <FormGroup
              id={"emailControl"}
              type={"text"}
              label={"Email address"}
              placeholder="reallycool@email.com"
              parentClassName={"mb-3"}
              error={errors.email?.message}
              {...register("email")}
            />

            <FormGroup
              id={"passwordControl"}
              type={"password"}
              label={"Password"}
              placeholder="Should be 6-20 characters long"
              parentClassName={"mb-5"}
              error={errors.password?.message}
              {...register("password")}
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
