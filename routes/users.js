var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var app = express();
var model = require('../models/index');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

router.get('/', async function (req, res, next) {
  try {
    const user = await model.User.findAll({});
    if (user.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': user
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

router.post('/', async function (req, res, next) {
  try {
    const {
      name,
      email,
      password,
      avatar
    } = req.body;
    const user = await model.User.create({
      name,
      email,
      password,
      avatar
    });
  if (user) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'User berhasil ditambahkan',
      'data': user,
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
    const user = await model.User.findByPk(req.params.id)
    if (user.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': user
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
    const usersId = req.params.id;
    const {
      name,
      email,
      password,
      avatar
    } = req.body;
    const user = await model.User.update({
      name,
      email,
      password,
      avatar
    }, {
      where: {
        id: usersId
      }
    });
    if (user) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil diupdate',
        'data': user,
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
    const users = await model.User.destroy({ where: {
      id: req.params.id
    }})
    if (user) {
      res.json({
        'status': 'OK',
        'messages': 'User berhasil dihapus'
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message
    })
  }
});

module.exports = router;