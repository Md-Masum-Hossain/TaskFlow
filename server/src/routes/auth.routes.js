import { Router } from 'express';
import { loginUser, logoutUser, registerUser, me } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, me);
router.post('/logout', logoutUser);

export default router;
