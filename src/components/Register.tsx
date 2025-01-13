import Authentication from "./Popups/Authentication";
import React, { useState } from "react";
const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/v8/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      console.log("Registration failed", response.json());
      setIsSuccess(false);
      setShowPopup(true);
      return
    }

    const data = await response.json();

    if (data.code === "success") {
      console.log("Registration successful");
      setIsSuccess(true);
      setShowPopup(true);
    } else {
      console.log("Registration failed");
      setIsSuccess(false);
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {showPopup && (
        <Authentication
          isVisible={showPopup}
          isSuccess={isSuccess}
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <p className="text-black">* Username</p>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <p className="text-black">* Email</p>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <p className="text-black">* Password (8 characters minimum)</p>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
