import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to get post',
    });
  }
};

export const getOne = async (req, res) => {
  const postId = req.params.id;

  PostModel.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $inc: { viewsCount: 1 },
    },
    {
      returnDocument: 'after',
    },
  )
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }

      res.json(doc);
    })
    .catch((err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: 'Error return post',
        });
      }
    });
};

export const remove = async (req, res) => {
  const postId = req.params.id;

  PostModel.findOneAndDelete({
    _id: postId,
  })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }

      res.json({
        success: true,
      });
    })
    .catch((err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: 'Error delete post',
        });
      }
    });
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.title,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to create post',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      },
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to update post',
    });
  }
};
