import express from 'express';
import { getGroups, toggleJoinGroup, getSupportPosts, createSupportPost, logMood, getSupportResources } from '../controllers/supportController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/groups', authMiddleware, getGroups);
router.post('/groups/:id/toggle-join', authMiddleware, toggleJoinGroup);

router.get('/support-posts', authMiddleware, getSupportPosts);
router.post('/support-posts', authMiddleware, createSupportPost);

router.post('/mood', authMiddleware, logMood);

router.get('/resources', authMiddleware, getSupportResources);

export default router;
