import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { Button } from "@components/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const ChangePasswordValidationSchema = yup
  .object({
    password: yup
      .string()
      .min(6, "Password must be minimum 6 character Long")
      .required("Password  is required"),
    newPassword: yup
      .string()
      .min(6, "Password must be minimum 6 character Long")
      .required("Enter your new password"),
  })
  .required("Please confirm the password");

const Change_Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(ChangePasswordValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="change_password_wrapper ">
      <h2 className="font-medium text-xl pb-2 border-b mb-8">
        Change Password
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your old Password"
              required
              className="h-12"
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
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              required
              className="h-12"
              {...register("newPassword")}
            />
            <div
              className={`${
                errors?.newPassword
                  ? "block text-red-400 text-sm errMsgStyle"
                  : "text-red-400 text-sm errMsgStyle hidden"
              } `}
            >
              {errors?.newPassword ? errors.newPassword?.message : "."}
            </div>
          </div>
        </div>
        <div className="change-password-action flex justify-end">
          <Button className="mt-4 bg-theme-color w-32 dark:text-white">
            Change Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Change_Password;
