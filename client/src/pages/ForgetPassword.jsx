import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import hiddenEmail from "../utils/hiddenEmail";
import { handleSendForget, handlefind } from "../utils/users_utils";
import Head from "../components/Head";

const ForgetPassword = () => {
  const [finding, setFinding] = useState(false);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});

  return (
    <div
        className="w-10/12 mx-auto"
    >
      <Head
        {...{
          title : 'Forget password'
        }}
      />
      {!finding ? (
        <div className="mt-20 w-full md:w-1/2 mx-auto  border shadow rounded-md bg-white">
          <h1 className="p-2 text-2xl font-bold uppercase">
            আপনার একাউন্ট খুজুন
          </h1>
          <hr />
          <div className="p-4 space-y-2">
            <p>একাউন্ট খুজতে নিবন্ধনকৃত ই-মেইল অথবা মোবাইল নাম্বার দিন :</p>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />

            {user?.find === false && (
              <Alert status="error">
                <AlertIcon />
                এই ই-মেইল অথবা মোবাইল নাম্বারে কোন একাউন্ট নেই।
              </Alert>
            )}
          </div>
          <hr />
          <div className="flex justify-end space-x-2 px-4 py-2 ">
            <button
              onClick={() => setEmail("")}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 hover:transition-all hover:duration-300"
            >
              বাতিল
            </button>
            <button
              onClick={() =>
                handlefind(
                  email,
                  setUser,
                  setEmail,
                  setFinding,
                  setLoading,
                  toast
                )
              }
              className="px-10 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 hover:transition-all hover:duration-300"
            >
              {loading ? "অপেক্ষা করুন খুজতেছি..." : "খুজুন"}
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`mt-20 w-full md:w-1/2 mx-auto ${
            sending ? "" : "border shadow p-10"
          } rounded-md bg-white`}
        >
          {!sending ? (
            <div className="p-2 flex space-x-3 rounded-md">
              <img
                src={user?.data?.image?.url}
                alt="user"
                className="h-20 w-20 rounded-full"
              />
              <div className="space-y-2">
                <p className="font-semibold">{user?.data?.name}</p>
                <p className="text-sm text-gray-300">
                  {hiddenEmail(user?.data?.email)}
                </p>
                <p className="space-x-4 pt-4">
                  <button
                    onClick={() => setFinding(false)}
                    className="px-2 py-1 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    এটা আমার একাউন্ট নয় ?
                  </button>
                  <button
                    onClick={() =>
                      handleSendForget(user, setLoading, setSending)
                    }
                    className="px-2 py-1 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    {loading ? "অপেক্ষা করুন..." : "পাসওয়ার্ড মুছুন"}
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              borderRadius="5px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                সফলভাবে কোড পাঠানো!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                আপনার ই-মেইলে যাচাইকরন কোড পাঠানো হয়েছে.আপনার ই-মেইল চেক করে নিশ্চিত করুন।
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
