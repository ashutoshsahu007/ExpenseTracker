import React, { useEffect, useState } from "react";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function UpdateProfile() {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const token = useSelector((state) => state.auth.token);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const fetchuserDetails = async () => {
      const idToken = token;
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyANaJRxFmDFxPmAhRakHBVQMmCVOZroo-M",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setFullName(data.users[0].displayName);
          setPhotoURL(data.users[0].photoUrl);
        })
        .catch((err) => console.log(err.message));
    };
    fetchuserDetails();
  }, [token]);

  const handleUpdate = async () => {
    const idToken = token;

    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyANaJRxFmDFxPmAhRakHBVQMmCVOZroo-M`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          displayName: fullName,
          photoUrl: photoURL,
          returnSecureToken: true,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log("Profile updated:", data.displayName, data.photoUrl);
    } else {
      console.error("Error updating profile:", data);
    }
  };

  const handleCancel = () => {
    setFullName("");
    setPhotoURL("");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Top Quote */}
      <p
        className={`italic text-sm p-3 border-b ${
          darkMode
            ? "border-gray-700 text-gray-300"
            : "border-gray-300 text-black"
        }`}
      >
        Winners never quit, Quitters never win.
      </p>

      {/* Profile Completion Banner */}
      <div
        className={`p-3 text-sm flex justify-between items-center ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-red-100 text-black"
        }`}
      >
        <span>
          Your Profile is <b>64%</b> completed. A complete Profile has higher
          chances of landing a job.
          <a
            href="#"
            className={`${darkMode ? "text-indigo-400" : "text-blue-600"} ml-1`}
          >
            Complete now
          </a>
        </span>
      </div>

      {/* Form Section */}
      <div className="flex justify-center mt-8">
        <div
          className={`w-3/4 border p-6 rounded-md ${
            darkMode
              ? "border-gray-700 bg-gray-800 text-white"
              : "border-gray-300 bg-white text-black"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Contact Details</h2>
            <button
              onClick={handleCancel}
              className={`cursor-pointer font-semibold border rounded px-3 py-1 transition ${
                darkMode
                  ? "text-red-400 border-red-500 hover:bg-red-900"
                  : "text-red-500 border-red-300 hover:bg-red-50"
              }`}
            >
              Cancel
            </button>
          </div>

          {/* Input Fields */}
          <div className="flex items-center space-x-6">
            {/* Full Name */}
            <div className="flex items-center space-x-2 w-1/2">
              <FaGithub className="text-xl" />
              <label className="font-medium">Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`rounded px-2 py-1 flex-1 border ${
                  darkMode
                    ? "bg-gray-900 border-gray-600 text-white"
                    : "bg-white border-gray-400 text-black"
                }`}
              />
            </div>

            {/* Profile Photo URL */}
            <div className="flex items-center space-x-2 w-1/2">
              <FaGlobe className="text-xl" />
              <label className="font-medium">Profile Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className={`rounded px-2 py-1 flex-1 border ${
                  darkMode
                    ? "bg-gray-900 border-gray-600 text-white"
                    : "bg-white border-gray-400 text-black"
                }`}
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className={`px-4 py-2 rounded cursor-pointer transition ${
                darkMode
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-red-300 hover:bg-red-400 text-white"
              }`}
            >
              Update
            </button>
          </div>

          <hr
            className={`mt-6 ${
              darkMode ? "border-gray-700" : "border-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
