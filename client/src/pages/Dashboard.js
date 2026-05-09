import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  // Fetch Trips
  const fetchTrips = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTrips(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Trip
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/trips/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Trip Added");

      fetchTrips();

    } catch (error) {
      console.log(error);
    }
  };

  // Delete Trip
  const deleteTrip = async (id) => {
    try {

      const token = localStorage.getItem("token");

      await API.delete(`/trips/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTrips();

    } catch (error) {
      console.log(error);
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Travel Planner
        </h1>

        <button
          onClick={logoutUser}
          className="bg-white text-blue-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="max-w-5xl mx-auto p-6">

        {/* Add Trip Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Add New Trip
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >

            <input
              type="text"
              name="destination"
              placeholder="Destination"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              type="date"
              name="startDate"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              type="date"
              name="endDate"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              type="number"
              name="budget"
              placeholder="Budget"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Add Trip
            </button>

          </form>

        </div>

        {/* Trips */}
        <div className="grid md:grid-cols-2 gap-6">

          {
            trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white p-5 rounded-xl shadow-md"
              >

                <h2 className="text-2xl font-bold text-blue-500">
                  {trip.destination}
                </h2>

                <p className="mt-2">
                  📅 {trip.startDate} → {trip.endDate}
                </p>

                <p className="mt-2 font-semibold">
                  💰 Budget: ₹{trip.budget}
                </p>

                <button
                  onClick={() => deleteTrip(trip._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;