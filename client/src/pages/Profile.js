import { toBengaliNumber } from "bengali-number";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Upload from "../components/Upload";
import useUserStore from "../features/userStore";
import dateGenerator from "../utils/dateGenerator";
import handleChange from "../utils/handleChange";
import { getUser, updateUser } from "../utils/users_utils";
export default function Profile() {
  const { random, addUser } = useUserStore();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    getUser(id, setUser, setAddress);
  }, [id, random]);
  console.log(user);
  return (
    <div className="mx-2 md:w-10/12 md:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-x-4">
        <div className="bg-white/50 p-4 rounded-2xl shadow">
          <img
            src={user?.image?.url}
            alt="user"
            className="h-64 mx-auto rounded-md"
          />
          <div className="flex justify-center items-center py-2">
            <Upload />
          </div>
          <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-2">
            <div>
              <label>নামঃ</label>
              <input
                type="text"
                name="name"
                value={user?.name}
                onChange={(e) => handleChange(e, user, setUser)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="নাম"
              />
            </div>
            <div>
              <label>ই-মেইলঃ</label>
              <input
                type="email"
                name="email"
                value={user?.email}
                onChange={(e) => handleChange(e, user, setUser)}
                className="w-full p-2 bg-gray-200/50"
                placeholder="ই-মেইল"
                disabled
              />
            </div>
            <div>
              <label>মোবাইল নাম্বারঃ</label>
              <input
                type="text"
                name="phone"
                value={user?.phone}
                onChange={(e) => handleChange(e, user, setUser)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="মোবাইল নাম্বার"
              />
            </div>
            <div>
              <label>লিঙ্গঃ</label>
              <select
                name="gender"
                value={user?.gender}
                onChange={(e) => handleChange(e, user, setUser)}
                className="w-full px-2 py-[10px] border-b focus:outline-none focus:border-blue-300"
              >
                <option value="Male">পুরুষ</option>
                <option value="Female">মহিলা</option>
                <option value="Others">অন্যান্য</option>
              </select>
            </div>
            <div className="relative">
              <label>জন্ম তারিখঃ </label>
              <input
                type="text"
                name=""
                value={dateGenerator(user?.dob)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
              />
              <input
                type="date"
                name="dob"
                onChange={(e) => handleChange(e, user, setUser)}
                className="absolute bottom-0 right-0 w-9 px-2 p-1 border-b focus:outline-none focus:border-blue-300"
                placeholder=""
              />
            </div>
            <div>
              <label>গ্রাম/রাস্তা নংঃ </label>
              <input
                type="text"
                name="location"
                value={address?.location}
                onChange={(e) => handleChange(e, address, setAddress)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="গ্রাম/রাস্তা"
              />
            </div>
            <div>
              <label>পোস্ট অফিসঃ </label>
              <input
                type="text"
                name="post_office"
                value={address?.post_office}
                onChange={(e) => handleChange(e, address, setAddress)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="পোস্ট অফিস"
              />
            </div>
            <div>
              <label>পোস্ট কোডঃ</label>
              <input
                type="text"
                name="post_code"
                value={address?.post_code}
                onChange={(e) => handleChange(e, address, setAddress)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="পোস্ট কোড"
              />
            </div>
            <div>
              <label>উপজেলাঃ</label>
              <input
                type="text"
                name="upazilla"
                value={address?.upazilla}
                onChange={(e) => handleChange(e, address, setAddress)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="উপজেলা"
              />
            </div>

            <div>
              <label>জেলাঃ</label>
              <input
                type="text"
                name="district"
                value={address?.district}
                onChange={(e) => handleChange(e, address, setAddress)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
                placeholder="জেলা"
              />
            </div>

            <div className="flex justify-center items-center pt-4">
              <button
                onClick={() =>
                  updateUser(id, user, address, setUser, addUser, toast)
                }
                className="px-6 py-1 bg-green-400 text-white rounded-full hover:bg-green-500"
              >
                সংরক্ষন করুন
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-white/50 p-4 rounded-2xl shadow space-y-2">
            <p>সদস্য হয়েছেন - {moment(user?.createdAt).fromNow()}</p>
            <p className="flex justify-between">
              <span className="">বর্তমান ব্যালেন্সঃ</span>
              <span>{toBengaliNumber(user?.balance)} টাকা </span>
            </p>
            <p className="flex justify-between">
              <span className="">মোট অ্যাপয়েন্টমেন্টঃ </span>
              <span>{toBengaliNumber(user?.appointments)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
