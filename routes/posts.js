var express = require('express');
var router = express.Router();
var app = express();
var model = require('../models/index');
var users = require('../models').User
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

app.use(bodyParser.json());



/* GET Post listing. */
router.get('/', async function (req, res, next) {
  try {
    const post = await model.Post.findAll({
      order:[
        ['createdAt','DESC']
    ],
    include:users
  });
    if (post.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': post
      })
    } else {
      res.json({
        'status': 'ERROR',
        'messages': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    res.json({
      'status': 'err mang',
      'messages': err.messages,
      'data': {}
    })
  }
});
//semestinya userID diambil dari server
router.post('/', async function (req, res, next) {
  try {
    const {
	    posts,
      user_id
    } = req.body;
    const post = await model.Post.create({
      posts,
      user_id
    });
  if (post) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'User berhasil ditambahkan',
      'data': post,
    })
  }
 } catch (err) {
   res.status(400).json({
     'status': 'ERROR',
     'messages': err.message,
     'data': {},
   })
 }
});

router.get('/:id', async  function (req, res, next) {
  try {
    const Post = await model.Post.findOne({where:{
       id:req.params.id
      }
    })
    if (Post.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': Post
      })
    } else {
      res.json({
        'status': 'ERROR',
        'messages': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'messages': err.messages,
      'data': {}
    })
  }
});

router.patch('/:id', async function (req, res, next) {
  try {
    const postsId = req.params.id;
    const {
      posts,
      user_id
    } = req.body;
    const post = await model.Post.update({
      posts,
      user_id
    }, {
      where: {
        id: postsId
      }
    });
    if (user) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil diupdate',
        'data': post,
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const Post = await model.Post.destroy({ where: {
      id: req.params.id
    }})
    if (Post) {
      res.json({
        'status': 'OK',
        'messages': 'Post berhasil dihapus',
        
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  }
});

module.exports = router;