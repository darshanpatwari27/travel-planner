const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTrip,
  getTrips,
  deleteTrip,
} = require("../controllers/tripController");

router.post("/create", protect, createTrip);

router.get("/", protect, getTrips);

router.delete("/:id", protect, deleteTrip);

module.exports = router;