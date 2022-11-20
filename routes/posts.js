const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

// Just the index route for posts
router.get('/', (req, res) => {
   res.send('Posts Page');
});

// *********************************************** //
// *********************************************** //

// Retrieve the latest Data Entry
router.get('/read-latest-post', async (req, res) => {
   try {
      const readLatestPost = await Post.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
      res.json(readLatestPost);
   } catch (err) {
      res.json({ message: err });
   }
});

// Retrieve the latest Data Entry ID
router.get('/read-latest-post-id', async (req, res) => {
   try {
      const readLatestPostID = await Post.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
      res.json(`Latest Post ID is: ${readLatestPostID.id}`);
   } catch (err) {
      res.json({ message: err });
   }
});

// *********************************************** //
// *********************************************** //

// Create a new post
router.post('/create-post', async (req, res) => {
   const post = new Post({
      title: req.body.title,
      description: req.body.description,
   });

   try {
      const savedPost = await post.save();
      res.json(savedPost);
   } catch (err) {
      res.json({ message: err });
   }
});

// Retrieve all posts
router.get('/read-all-posts', async (req, res) => {
   try {
      const readPosts = await Post.find();
      res.json(readPosts);
   } catch (err) {
      res.json({ message: err });
   }
});

// Specific Post by ID
router.get('/:postID', async (req, res) => {
   try {
      const specificPost = await Post.findById(req.params.postID);
      res.json(specificPost);
   } catch (err) {
      res.json({ message: err });
   }
});

// Delete a Specific Post
router.delete('/:postID', async (req, res) => {
   try {
      const deletePost = await Post.findByIdAndDelete(req.params.postID);
      res.json(deletePost);
   } catch (err) {
      res.json({ message: err });
   }
});

// Update a specific post
router.patch('/:postId', async (req, res) => {
   try {
      const updatePost = await Post.findByIdAndUpdate(
         {
            _id: req.params.postId,
         },
         {
            $set: req.body,
         }
      );
      res.json(updatePost);
   } catch (err) {
      res.json({ message: err });
   }
});

module.exports = router;
