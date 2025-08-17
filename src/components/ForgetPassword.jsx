import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANaJRxFmDFxPmAhRakHBVQMmCVOZroo-M`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.error?.message || "Something went wrong");
      }

      setMessage(
        "You would receive a password reset link in your email. Please check your inbox."
      );
      setEmail("");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-blue-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-center text-sm mt-4">
            Already a user?
            <Link to="/" className="text-orange-300 hover:underline">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
