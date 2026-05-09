const Trip = require("../models/Trip");

const createTrip = async (req, res) => {
  try {

    const { destination, startDate, endDate, budget } = req.body;

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      startDate,
      endDate,
      budget,
    });

    res.status(201).json({
      message: "Trip Created Successfully",
      trip,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTrips = async (req, res) => {
  try {

    const trips = await Trip.find({
      userId: req.user.id,
    });

    res.status(200).json(trips);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteTrip = async (req, res) => {
  try {

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    // Check owner
    if (trip.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Trip Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createTrip,
  getTrips,
  deleteTrip,
};