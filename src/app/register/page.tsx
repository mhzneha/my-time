"use client";
import React, { ChangeEvent, useState } from "react";
import InputLabel from "../component/input/inputLabel";
import InputText from "../component/input/inputText";
type formDataType = {
  firstName: string;
  lastName: string;
};
export default function Register() {
  const [formData, setFormData] = useState<formDataType>({
    firstName: "",
    lastName: "",
  });
  const [errorName, setErrorName] = useState("");
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "firstName") {
      if (e.target.value.length <= 3) {
        setErrorName("there must be more than 3 letters");
      } else {
        setErrorName("");
      }
    }
    console.log(e.target.value);
  };
  return (
    <>
      <div className="h-screen min-w-2xs flex flex-col items-center justify-center ">
        <div className="bg-blue-200 p-5 rounded-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Register
          </h2>
          <div className=" flex flex-col items-center mt-5">
            <div>
              <div>
                <div className="flex gap-4 p-3 items-center">
                  <InputLabel label="UserName"></InputLabel>
                  <InputText
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    id={""}
                    placeholder="eg:Neha"
                    onchangeInput={onChangeName}
                  ></InputText>
                </div>
                <p className=" m-0 pl-5">{errorName}</p>
                <div className="flex gap-4 p-3 items-center">
                  <InputLabel label="LastName"></InputLabel>
                  <InputText
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    id={""}
                    placeholder="eg:Maharjan"
                    onchangeInput={onChangeName}
                  ></InputText>
                  {/* <p>{errorName}</p> */}
                </div>
              </div>
              ;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
