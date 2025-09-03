import express from "express";
import { authorizedRoles, verifyAuth } from "../middlewares/authenticate.js";
import { validateFormData } from "../middlewares/validateForm.js";
import { validateRoomSchema } from "../utils/dataSchema.js";
import { createRoom, getAllRooms, getRoomMeta, updateRoom } from "../controllers/roomController.js";
import { cacheMiddleware, clearCache } from "../middlewares/cache.js";

const router = express.Router();

router.post(
  "/create",
  verifyAuth,
  authorizedRoles("admin"),
  validateFormData(validateRoomSchema),
  clearCache("rooms"),
  createRoom
);

router.get(
  "/meta",
  verifyAuth,
  authorizedRoles("admin"),
  cacheMiddleware("room_meta", 30000),
  getRoomMeta
);

router.get(
  "/all",
  verifyAuth,
  authorizedRoles("admin"),
  cacheMiddleware("rooms", 10600),
  getAllRooms
);

router.patch(
  "/:id/update",
  verifyAuth,
  authorizedRoles("admin"),
  validateFormData(validateRoomSchema),
  clearCache("rooms"),
  updateRoom
);

export default router;
