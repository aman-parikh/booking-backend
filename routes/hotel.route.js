const router = require('express').Router()
const hotelController = require('../controllers/hotel.controller.js')
const verify = require('../utils/verifyToken.js')

router.post("/", verify.verifyAdmin, hotelController.createHotel);
router.put("/:id", verify.verifyAdmin, hotelController.updateHotel);
router.delete("/:id", verify.verifyAdmin, hotelController.deleteHotel);
router.get("/find/:id", hotelController.getHotel);
router.get("/", hotelController.getHotels);
router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);
router.get("/room/:id", hotelController.getHotelRooms);

module.exports = router