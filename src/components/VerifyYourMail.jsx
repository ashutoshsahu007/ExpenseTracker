import { useContext, useState } from "react";

import { useSelector } from "react-redux";

export default function VerifyYourMail() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const idToken = useSelector((state) => state.auth.token);

  const sendVerificationEmail = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const API_KEY = "AIzaSyANaJRxFmDFxPmAhRakHBVQMmCVOZroo-M";
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle possible errors from Firebase docs
        switch (data.error?.message) {
          case "INVALID_ID_TOKEN":
            throw new Error("Your session has expired. Please log in again.");
          case "USER_NOT_FOUND":
            throw new Error("User account not found.");
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
            throw new Error(
              "Too many verification requests. Please try again later."
            );
          default:
            throw new Error("Something went wrong. Please try again.");
        }
      }

      setMessage(
        "Check your email — you might have received a verification link. Click on it to verify."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={sendVerificationEmail}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-400"
            : "bg-blue-500 cursor-pointer hover:bg-blue-600"
        }`}
      >
        {loading ? "Sending..." : "Verify Email"}
      </button>

      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
