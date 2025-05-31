import express from 'express';

import {
  registerUser,
  loginUser,
  updateProfile,
  searchAll,          // import your search controller here
} from '../controller/userController.js';

import {
  createResource,
  updateResource,
  getAllResources,
  deleteResource,
} from '../controller/resourceController.js';

import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  likePost,
  commentPost,
} from '../controller/postController.js';

import {
  createGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
  joinGroup,
  sendMessageToGroup,
} from '../controller/groupController.js';

import {
  createMoodLog,
  getMoodLog,
  updateMoodLog,
  deleteMoodLog,
} from '../controller/moodLogController.js';

import { authenticateUser } from '../middleware/middleware.js';

const router = express.Router();

// ========== USER ==========
// Public
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

// Protected
router.put('/user/updateProfile/:userId', authenticateUser, updateProfile);

// Search route - protected
router.get('/search', authenticateUser, searchAll);

// ========== RESOURCE ==========
router.post('/resources', authenticateUser, createResource);
router.put('/resources/:resourceId', authenticateUser, updateResource);
router.get('/resources', authenticateUser, getAllResources);
router.delete('/resources/:resourceId', authenticateUser, deleteResource);

// ========== POST ==========
router.post('/posts', authenticateUser, createPost);
router.put('/posts/:postId', authenticateUser, updatePost);
router.delete('/posts/:postId', authenticateUser, deletePost);
router.get('/posts', authenticateUser, getAllPosts);

router.post('/posts/:postId/like', authenticateUser, likePost);
router.post('/posts/:postId/comment', authenticateUser, commentPost);

// ========== GROUP ==========
router.post('/groups', authenticateUser, createGroup);
router.get('/groups', authenticateUser, getAllGroups);
router.put('/groups/:groupId', authenticateUser, updateGroup);
router.delete('/groups/:groupId', authenticateUser, deleteGroup);
router.post('/groups/:groupId/join', authenticateUser, joinGroup);
router.post('/groups/:groupId/message', authenticateUser, sendMessageToGroup);

// ========== MOODLOG ==========
router.post('/moodlog', authenticateUser, createMoodLog);
router.get('/moodlog', authenticateUser, getMoodLog);
router.put('/moodlog', authenticateUser, updateMoodLog);
router.delete('/moodlog', authenticateUser, deleteMoodLog);

export default router;
