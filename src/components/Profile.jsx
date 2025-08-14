import React from "react";

const Profile = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 p-2">
      <h1 className="italic text-lg">Welcome to Expense Tracker!!!</h1>
      <div className="bg-red-100 px-4 py-2 rounded-full text-sm italic">
        Your profile is Incomplete.
        <a href="/profile" className="text-blue-600 hover:underline ml-1">
          Complete now
        </a>
      </div>
    </div>
  );
};

export default Profile;
