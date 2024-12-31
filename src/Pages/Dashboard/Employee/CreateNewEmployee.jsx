import React, { useEffect, useState } from "react";
import { Button } from "@components/components/ui/Button";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { Textarea } from "@components/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/components/ui/select";
import { Calendar } from "@components/components/ui/calendar";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ShowEmailAndPassword from "./ShowEmailAndPassword";
import APP from "../../../../dataCred.js";

const CREATE_NEW_EMPLOYEE_SCHEMA_VALIDATION = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(3, "Fullname must be minimum 3 character long")
    .required("Name is Required."),
  gender: yup.string().required("gender is required."),
  mobileNum: yup
    .string()
    .trim()
    .length(10)
    .required("Phone number is required.."),
  email: yup.string().email().required("Email address is required"),
  dob: yup.string().required("Date of birth is required"),
  pinCode: yup.string().length(6).required("Area pin code is required"),
  address: yup.string().max(100).required("Employee address is required"),
});

const CreateNewEmployee = () => {
  const [date, setDate] = useState();
  const [showUserCred, setUserCred] = useState(false);
  const [gender, setGender] = useState();
  const [ResponseData, setResponseData] = useState(null);

  const {
    reset,
    resetField,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(CREATE_NEW_EMPLOYEE_SCHEMA_VALIDATION),
    defaultValues: {
      fullName: "",
      gender: "",
      mobileNum: "",
      email: "",
      dob: "",
      pinCode: "",
      address: "",
    },
  });

  const onsubmit = (data) => {
    // SEND DATA ON BACKEND

    const postDATA = async (data) => {
      try {
        const res = await fetch(
          `${APP && APP.BACKEND_URL}/api/admin/new-employee`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await res.json();

        if (result.success) {
          // show email and password
          setUserCred(true);

          //
          reset();
          // Set API response data in the State to use in another components
          setResponseData(() => {
            return result;
          });
        }

        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    postDATA(data);
  };

  return (
    <>
      <div
        className="bg-neutral-100 dark:bg-gray-700 rounded-lg border p-6 mx-auto w-1/2"
        id="oderPreview"
      >
        <div className="cardHeader w-full">
          <h1 className="border-b text-2xl font-medium">Create new employee</h1>
        </div>

        {showUserCred && showUserCred ? (
          <div
            id="userLoginCredential"
            className="userLoginCredential_Wrapper mt-12 errMsgStyle"
          >
            <ShowEmailAndPassword ResponseData={ResponseData} />
          </div>
        ) : (
          <>
            <div className="cardBody bg-white dark:bg-slate-800 rounded-md border p-6 mt-6">
              <div className="newEmployee ">
                <form onSubmit={handleSubmit(onsubmit)} id="newPackageForm">
                  <div className="grid gap-2 w-full my-4">
                    <Label htmlFor="fullName">
                      <div className="labelText flex  ">
                        Employee name
                        <span className="text-red-400 mt-[3.5px] pl-1">*</span>
                      </div>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Employee Name"
                      required
                      className="h-12 focus-visible:ring-offset-0 focus-visible:ring-0"
                      {...register("fullName")}
                    />
                    <div
                      className={`${
                        errors?.fullName
                          ? "block text-red-400 text-sm errMsgStyle"
                          : "text-red-400 text-sm errMsgStyle hidden"
                      } `}
                    >
                      {errors?.fullName ? errors.fullName?.message : "."}
                    </div>
                  </div>

                  <div className="grid gap-2 w-full my-4">
                    <Label htmlFor="mobileNum">
                      <div className="labelText flex  ">
                        Gender
                        <span className="text-red-400 mt-[3.5px] pl-1">*</span>
                      </div>
                    </Label>
                    <Select
                      name="gender"
                      className="h-12 focus-visible:ring-offset-0 focus-visible:ring-0"
                      onValueChange={(value) => {
                        setGender(value);
                        setValue("gender", value, { shouldValidate: true });
                      }}
                    >
                      <SelectTrigger className="h-12 focus-visible:ring-offset-0 focus-visible:ring-0">
                        {gender && gender ? gender : "Select your gender"}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other.</SelectItem>
                      </SelectContent>
                    </Select>

                    <input
                      type="hidden"
                      {...register("gender", {
                        required: "Please select a gender",
                      })}
                    />

                    <div
                      className={`${
                        errors?.gender
                          ? "block text-red-400 text-sm errMsgStyle"
                          : "text-red-400 text-sm errMsgStyle hidden"
                      } `}
                    >
                      {errors?.gender ? errors.gender?.message : "."}
                    </div>
                  </div>

                  <div className="grid gap-2 w-full my-4">
                    <Label htmlFor="mobileNum">
                      <div className="labelText flex  ">
                        Mobile number
                        <span className="text-red-400 mt-[3.5px] pl-1">*</span>
                      </div>
                    </Label>
                    <Input
                      id="mobileNum"
                      name="mobileNum"
                      type="number"
                      placeholder="Employee mobile number"
                      required
                      className="h-12 focus-visible:ring-offset-0 focus-visible:ring-0"
                      {...register("mobileNum")}
                    />

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

                  <div className="grid gap-2 w-full my-4">
                    <Label htmlFor="email">
                      <div className="labelText flex  ">
                        Email address
                        <span className="text-red-400 mt-[3.5px] pl-1">*</span>
                      </div>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email address."
                      className="h-12 focus-visible:ring-offset-0 focus-visible:ring-0"
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

                  <div className="grid gap-2  mt-4 w-full">
                    <Label htmlFor="address">
                      <div className="labelText flex  ">
                        Date of birth
                        <span className="text-red-400 mt-[3.5px] pl-1">*</span>
                      </div>
                    </Label>
                    <Input
                      name="dob"
                      id="dob"
                      type="date"
                      required
                      {...register("dob")}
                    />

                    <div
                      className={`${
                        errors?.dob
                          ? "block text-red-400 text-sm errMsgStyle"
                          : "text-red-400 text-sm errMsgStyle hidden"
                      } `}
                    >
                      {errors?.dob ? errors.dob?.message : "."}
                    </div>
                  </div>

                  <div className="grid gap-2 w-full my-4">
                    <Label htmlFor="pinCode">
                      <div className="labelText flex  ">
                        Pin code
                        <span className="text-red-400 mt-[3.5px] pl-1">*</span>
                      </div>
                    </Label>
                    <Input
                      id="pinCode"
                      type="number"
                      placeholder="Area pin code"
                      className="h-12 focus-visible:ring-offset-0 focus-visible:ring-0"
                      required
                      {...register("pinCode")}
                    />

                    <div
                      className={`${
                        errors?.pinCode
                          ? "block text-red-400 text-sm errMsgStyle"
                          : "text-red-400 text-sm errMsgStyle hidden"
                      } `}
                    >
                      {errors?.pinCode ? errors.pinCode?.message : "."}
                    </div>
                  </div>
                  <div className="grid gap-2 w-full my-4">
                    <Label htmlFor="address">
                      <div className="labelText flex  ">
                        Address
                        <span className="text-red-400 mt-[3.5px] pl-1">*</span>
                      </div>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Address."
                      className="h-18 focus-visible:ring-offset-0 focus-visible:ring-0"
                      {...register("address")}
                    />

                    <div
                      className={`${
                        errors?.address
                          ? "block text-red-400 text-sm errMsgStyle"
                          : "text-red-400 text-sm errMsgStyle hidden"
                      } `}
                    >
                      {errors?.address ? errors.address?.message : "."}
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-orange-300 h-12 bg-theme-color">
                    Create Now
                  </Button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CreateNewEmployee;
