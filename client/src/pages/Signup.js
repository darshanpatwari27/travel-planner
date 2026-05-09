import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
      const res = await API.post("/auth/signup", formData);

      toast.success(res.data.message);
        setLoading(false);
      navigate("/");

    } catch (error) {
        setLoading(false);
      console.log(error);

      toast.error("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="w-full border p-3 rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg mb-4"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg mb-4"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >  

            {
                loading ? "Loading..." : "Signup"
            }

          </button>

        </form>

        <p className="text-center mt-4">

          Already have an account?

          <Link
            to="/"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;