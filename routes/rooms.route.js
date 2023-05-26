const router = require("express").Router();
const roomController = require("../controllers/room.controller.js");
const verify = require("../utils/verifyToken.js");

router.post("/:hotelid", verify.verifyAdmin, roomController.createRoom);

//UPDATE
router.put("/availability/:id", roomController.updateRoomAvailability);
router.put("/:id", verify.verifyAdmin, roomController.updateRoom);
router.delete("/:id/:hotelid", verify.verifyAdmin, roomController.deleteRoom);

router.get("/:id", roomController.getRoom);

router.get("/", roomController.getRooms);
module.exports = router;
