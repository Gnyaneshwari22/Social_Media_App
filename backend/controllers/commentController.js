const db = require("../models");

exports.createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const comment = await db.Comment.create({ text, postId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
