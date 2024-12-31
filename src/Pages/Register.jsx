import React, { useEffect, useState } from "react";
import { Button } from "@components/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";

import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import APP from "../../dataCred.js";

const RegisterFormValidationSchema = yup
  .object({
    fullName: yup.string().min(3).max(50).required("name is Required"),
    email: yup.string().email().required("email address is required"),
    mobileNum: yup
      .string()
      .length(10)
      .required("Mobile Num address is required"),
    password: yup.string().min(6).required("Password is required").max(100),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required("Please confrim the password");

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(RegisterFormValidationSchema),
  });

  const onSubmit = (data) => {
    const postData = async (data) => {
      try {
        const response = await fetch(`${APP.BACKEND_URL}/api/admin/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          console.log("Can not able to register a new account");
          return;
        }
        // ON__SUCCESS

        const res_Result = await response.json();

        if (res_Result.success) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    postData(data);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className=" h-screen  flex items-center">
      <Card className="mx-auto lg:w-1/4 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register New Account</CardTitle>
          <CardDescription>
            Enter your details below to register account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Mohan Singh"
                  required
                  {...register("fullName", { required: true, maxLength: 20 })}
                />

                <div
                  className={`${
                    errors?.fullname
                      ? "block text-red-400 text-sm errMsgStyle"
                      : "text-red-400 text-sm errMsgStyle hidden"
                  } `}
                >
                  {errors?.fullname ? errors.fullname?.message : "."}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mobileNum">Mobile Number</Label>
                <div className="flex  ">
                  <div
                    className=" flex items-center bg-gray-300 text-black text-sm px-2 align-middle  text-center
                rounded-sm rounded-r-none
                "
                  >
                    <span>+91</span>
                  </div>
                  <Input
                    className="border-l-0 rounded-l-none"
                    id="mobileNum"
                    type="number"
                    placeholder="9878987671"
                    required
                    {...register("mobileNum")}
                  />
                </div>
                <div
                  className={`${
                    errors?.mobileNum
                      ? "block text-red-400 text-sm errMsgStyle"
                      : "text-red-400 text-sm errMsgStyle hidden"
                  } `}
                >
                  {errors?.mobileNum ? errors.mobileNum?.message : "."}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
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
                  {/* <a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
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

              <div className="grid gap-2">
                <Label htmlFor="cnfrmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  required
                  {...register("confirmPassword")}
                />
                <div
                  className={`${
                    errors?.confirmPassword
                      ? "block text-red-400 text-sm errMsgStyle"
                      : "text-red-400 text-sm errMsgStyle hidden"
                  } `}
                >
                  {errors?.confirmPassword
                    ? errors.confirmPassword?.message
                    : "."}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <NavLink to="/login" className="underline">
              Log In..
            </NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
