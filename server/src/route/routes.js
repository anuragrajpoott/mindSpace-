import express from 'express';
import {
  registerUser,
  loginUser,
  updateProfile,
} from '../controller/userController.js';

import {
  createResource,
  updateResource,
  getAllResources,
  deleteResource
} from '../controller/resourceController.js';

import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts
} from '../controller/postController.js';

import {
  createGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
  joinGroup,
  sendMessageToGroup
} from '../controller/groupController.js';

import {
  createMoodLog,
  getMoodLog,
  updateMoodLog,
  deleteMoodLog
} from '../controller/moodLogController.js';

const router = express.Router();

// ========== USER ==========
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.put('/user/updateProfile/:userId', updateProfile);

// ========== RESOURCE ==========
router.post('/resources', createResource);
router.put('/resources/:resourceId', updateResource);
router.get('/resources', getAllResources);
router.delete('/resources/:resourceId', deleteResource);

// ========== POST ==========
router.post('/posts', createPost);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);
router.get('/posts', getAllPosts);

// ========== GROUP ==========
router.post('/groups', createGroup);
router.get('/groups', getAllGroups);
router.put('/groups/:groupId', updateGroup);
router.delete('/groups/:groupId', deleteGroup);
router.post('/groups/:groupId/join', joinGroup);
router.post('/groups/:groupId/message', sendMessageToGroup);

// ========== MOODLOG ==========
router.post('/moodlog', createMoodLog);
router.get('/moodlog', getMoodLog);
router.put('/moodlog', updateMoodLog);
router.delete('/', deleteMoodLog);

export default router;
