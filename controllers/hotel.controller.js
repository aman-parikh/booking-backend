const { errorHandler } = require("../utils/error-handler");
const Error = require("../utils/error");
const Hotel = require("../models/hotel.model.js");
const Room = require("../models/room.model.js");

const createHotel = errorHandler(async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    return res.status(200).json(savedHotel);
  } catch (err) {
    throw new Error(err, 500, null);
  }
});

const updateHotel = errorHandler(async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedHotel);
  } catch (err) {
    throw new Error(err, 500, null);
  }
});
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    throw new Error(err, 500, null);
  }
};
const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    return res.status(200).json({ data: hotel });
  } catch (err) {
    throw new Error(err, 500, null);
  }
};

const getHotels = errorHandler(async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    return res.status(200).json({ data: hotels });
  } catch (err) {
    throw new Error(err, 500, null);
  }
});

const countByCity = errorHandler(async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    return res.status(200).json({ data: list });
  } catch (err) {
    throw new Error(err, 500, null);
  }
});


const countByType = errorHandler(async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    throw new Error(err, 500, null);
  }
});

const getHotelRooms = errorHandler(async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json({ data: list });
  } catch (err) {
    throw new Error(err, 500, null);
  }
});

module.exports = {
  getHotel,
  getHotelRooms,
  getHotels,
  createHotel,
  countByCity,
  countByType,
  updateHotel,
  deleteHotel,
};
