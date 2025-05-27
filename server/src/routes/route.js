const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');
const likeController = require('../controllers/like');
const friendController = require('../controllers/friend');
const messageController = require('../controllers/message');
const notificationController = require('../controllers/notification');
const authMiddleware = require('../middlewares/authMiddleware'); // for protected routes

// Auth routes
router.post('/auth/sign-up', authController.signUp);
router.post('/auth/log-in', authController.logIn);
router.post('/auth/send-otp', authController.sendOtp);

// User routes (protected)
router.use(authMiddleware); // Apply auth middleware for all routes below

router.get('/users/:id', userController.getUserProfile);
router.put('/users/update-profile', userController.updateProfile);
router.get('/users/search', userController.searchUsers); // query params for search

// Post routes
router.post('/posts', postController.createPost);
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

// Comment routes
router.post('/comments', commentController.createComment);
router.get('/comments/:postId', commentController.getCommentsByPost);
router.delete('/comments/:id', commentController.deleteComment);

// Like routes
router.post('/likes', likeController.likePost);
router.delete('/likes/:id', likeController.unlikePost);
router.get('/likes/:postId', likeController.getLikesByPost);

// Friend routes
router.post('/friends/request', friendController.sendFriendRequest);
router.post('/friends/accept', friendController.acceptFriendRequest);
router.get('/friends/list', friendController.getFriendsList);
router.delete('/friends/:id', friendController.removeFriend);

// Message routes
router.post('/messages', messageController.sendMessage);
router.get('/messages/conversation/:userId', messageController.getConversation);
router.get('/messages/unread', messageController.getUnreadMessages);

// Notification routes
router.get('/notifications', notificationController.getUserNotifications);
router.post('/notifications/mark-read', notificationController.markNotificationsRead);

module.exports = router;
