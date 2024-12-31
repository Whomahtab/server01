import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@components/components/ui/button";
import APP from "../../dataCred.js";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { NavLink, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { isAuth } from "../store/Auth/Authentication.js";

const LogInFormValidationSchema = yup
  .object({
    email: yup.string().email().required("Email address is required"),
    password: yup.string().min(6).required("Password is required").max(100),
  })
  .required("Please confirm the password");

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state?.Auth?.isAuthenticate);
  const dispatch = useDispatch();

  const options = {
    method: "GET",
  };

  // const { data, setData, error } = useFetch("https://dummyjson.com/products");

  // Redirect user on dashboard if user is logged in
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(LogInFormValidationSchema),
  });

  const [err, seTerr] = useState(null);

  const onSubmit = (data) => {
    // localStorage.clear();
    // const response = await fetch(`${APP.BACKEND_URL}/api/admin/login`, {
    // http://localhost:3002/api/admin/login

    const setLogIn = async () => {
      const response = await fetch(`${APP.BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      const dataFromServer = await response.json();

      if (dataFromServer.success == false) {
        if (localStorage.getItem("AppID")) {
          localStorage.removeItem("AppID");
        }
        seTerr(dataFromServer.message);
      }

      if (dataFromServer.success === true) {
        const localData = localStorage.setItem("AppID", dataFromServer.token);
        dispatch(isAuth());
        seTerr(dataFromServer.message);
        navigate("/dashboard");
      }
    };
    setLogIn();
  };

  const token = useMemo(() => localStorage.getItem("AppID"));

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="bg-neutral-50 h-screen flex items-center">
      <Card className="mx-auto max-w-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and Password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              {err && <p className="text-red-400 text-xs">{err}</p>}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@divyam.in"
                  required
                  {...register("email")}
                />
                <div
                  className={`${
                    errors?.email
                      ? "block text-red-400 text-sm errMsgStyle"
                      : "text-red-400 text-sm errMsgStyle hidden"
                  } `}
                >
                  {errors?.email ? errors.email?.message : "."}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <NavLink
                    to="/forger-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </NavLink> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                <div
                  className={`${
                    errors?.password
                      ? "block text-red-400 text-sm errMsgStyle"
                      : "text-red-400 text-sm errMsgStyle hidden"
                  } `}
                >
                  {errors?.password ? errors.password?.message : "."}
                </div>
              </div>
              <Button type="submit" className="w-full bg-theme-color">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account Register and wait for Approval{" "}
            <NavLink to="/register" className="underline">
              Register Now..
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
