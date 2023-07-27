import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import image from "../../assets/images/add_balance.png";
import handleChange from "../../utils/handleChange";
import { MdPayment } from "react-icons/md";

const AddBalance = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    amount: "",
  });

  async function addBalance() {
    if (!value.amount) {
      return toast.error("অনুগ্রহ পূর্বক টাকার পরিমান লিখুন");
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/transection/init", value, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      if (res.data.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        window.location.replace(res.data.url);
      }
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <div className="w-full md:w-6/12 mx-auto flex justify-between border rounded space-y-2 bg-white/50">
      <div className="w-1/2 flex justify-center items-center">
        <img src={image} alt="add_balance" className="h-24" />
      </div>
      <div className="px-4 pb-4 space-y-2">
        <h1 className="text-xl font-bold text-center uppercase border-b py-2">
          ব্যালেন্স যোগ করুন
        </h1>
        <div className=" space-y-1">
          <label>টাকার পরিমান লিখুন : </label>
          <input
            type="text"
            name="amount"
            onChange={(e) => handleChange(e, value, setValue)}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => addBalance()}
          className="w-full p-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300"
        >
          {loading ? (
            "অপেক্ষা করুন..."
          ) : (
            <span className="flex justify-center items-center space-x-2">
              <MdPayment /> <span>পরিশোধ করুন</span>
            </span>
          )}
        </button>

        {/* <div className="p-2 flex justify-between text-blue-500">
                    <HowtoAddBalance/>
                </div> */}
      </div>
    </div>
  );
};

export default AddBalance;
