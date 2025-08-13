import React, { useContext, useState } from "react";
import { FaGithub, FaGlobe } from "react-icons/fa";
import AuthContext from "../store/auth-context";

export default function UpdateProfile() {
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const authCtx = useContext(AuthContext);

  const handleUpdate = async () => {
    alert(`Name: ${fullName}\nPhoto URL: ${photoURL}`);

    const apiKey = "YOUR_FIREBASE_API_KEY";
    const idToken = authCtx.token; // Must be a valid, non-expired token

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
    <div className="min-h-screen bg-white">
      {/* Top Quote */}
      <p className="italic text-sm p-3 border-b border-gray-300">
        Winners never quite, Quitters never win.
      </p>

      {/* Profile Completion Banner */}
      <div className="bg-red-100 p-3 text-sm flex justify-between items-center">
        <span>
          Your Profile is <b>64%</b> completed. A complete Profile has higher
          chances of landing a job.
          <a href="#" className="text-blue-600 ml-1">
            Complete now
          </a>
        </span>
      </div>

      {/* Form Section */}
      <div className="flex justify-center mt-8">
        <div className="w-3/4 border p-6 rounded-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Contact Details</h2>
            <button
              onClick={handleCancel}
              className="text-red-500 font-semibold border border-red-300 rounded px-3 py-1 hover:bg-red-50"
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
                className="border border-gray-400 rounded px-2 py-1 flex-1"
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
                className="border border-gray-400 rounded px-2 py-1 flex-1"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-400"
            >
              Update
            </button>
          </div>

          <hr className="mt-6" />
        </div>
      </div>
    </div>
  );
}
