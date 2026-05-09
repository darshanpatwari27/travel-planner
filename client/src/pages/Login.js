import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      toast.success(res.data.message);
      setLoading(false);
      navigate("/dashboard");

    } catch (error) {
        setLoading(false);
      console.log(error);

      toast.error("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Travel Planner
        </h1>

        <form onSubmit={handleSubmit}>

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
                loading ? "Loading..." : "Login"
                }

        </button>

        </form>

        <p className="text-center mt-4">

          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-500 ml-1"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;