import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import handleChange from "../utils/handleChange";
import passwordView from "../utils/passwordView";
import { handleSignUp } from "../utils/users_utils";

export default function Signup() {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  return (
    <div className="w-full md:w-5/12 mx-auto px-4 py-2 border rounded space-y-2 bg-white/50">
      <h1 className="text-2xl font-bold text-center uppercase border-b py-2">
        নতুন একাউন্ট তৈরি করুন
      </h1>
      <p className="text-gray-400 pb-5">
        একাউন্ট করুন খুব সহজেই। সঠিক তথ্য প্রদান করে আপনার একাউন্ট টি ভেরিফাই
        করুন। আপনার তথ্য আমরা কারো সাথে শেয়ার করিনা।
      </p>
      <div className=" space-y-1">
        <label>আপনার নাম লিখুন : </label>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e, value, setValue)}
          className="w-full p-2 rounded placeholder:text-sm border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className=" space-y-1">
        <label>আপনার ই-মেইল লিখুন : </label>
        <input
          type="email"
          name="email"
          onChange={(e) => handleChange(e, value, setValue)}
          className="w-full p-2 rounded placeholder:text-sm border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className=" space-y-1">
        <label>আপনার মোবাইল নাম্বার লিখুন : (১১ ডিজিট) </label>
        <input
          type="text"
          name="phone"
          onChange={(e) => handleChange(e, value, setValue)}
          className="w-full p-2 rounded placeholder:text-sm border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="relative space-y-1">
        <label>আপনার পাসওয়ার্ড লিখুন : </label>
        <input
          type={type}
          name="password"
          onChange={(e) => handleChange(e, value, setValue)}
          className="w-full p-2 rounded placeholder:text-sm border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => passwordView(type, setType)}
          className="absolute right-2 bottom-2 text-gray-600"
        >
          {type === "password" ? <BsEyeSlash size={25} /> : <BsEye size={25} />}
        </button>
      </div>

      <button
        onClick={() => handleSignUp(value, navigate, toast)}
        className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300"
      >
        একাউন্ট খুলুন
      </button>

      <div className="p-2 text-center">
        ইতিপূর্বে একাউন্ট করা হয়েছে ?{" "}
        <NavLink to="/signin" className="text-blue-500">
          প্রবেশ করুন
        </NavLink>
      </div>
    </div>
  );
}
