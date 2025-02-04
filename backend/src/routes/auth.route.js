import { Router } from "express";
import {
  signup,
  login,
  logout,
  profileUpdate,
  checkAuth,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/profile-update', protectRoute, profileUpdate);
router.get('/check', protectRoute, checkAuth);

export default router;