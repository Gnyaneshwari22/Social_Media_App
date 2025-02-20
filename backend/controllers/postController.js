const db = require("../models");

exports.createPost = async (req, res) => {
  try {
    const { imageLink, description } = req.body;
    const post = await db.Post.create({ imageLink, description });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [{ model: db.Comment, as: "comments" }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
