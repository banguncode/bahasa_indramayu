var express = require('express');
var router = express.Router();
var db = require('../config/db');
var sqlExec = require('../config/sqlExec');
var { rDictionary } = require('../config/core');

router.get('/', function (req, res, next) {
  res.render('pages/index');
});

/* by word */
router.get('/search', async function (req, res, next) {
  try {
    let langs = ['nk', 'km', 'id'];
    if (!req.query.q) {
      res.status(400).json({
        status: 'FAILED',
        message: 'Keyword is required'
      });
    } else if (!req.query.lang) {
      res.status(400).json({
        status: 'FAILED',
        message: 'Language is required'
      });
    } else if (!langs.includes(req.query.lang)) {
      res.status(400).json({
        status: 'FAILED',
        message: 'Language is not available'
      });
    } else {
      let sql, values;

      switch (req.query.lang) {
        case 'nk':
          sql = 'SELECT id, ngoko, krama, indonesia FROM `data` WHERE ngoko LIKE ? OR alias LIKE ?';
          values = [req.query.q.trim(), `%${req.query.q.trim()}%`];
          break;

        case 'km':
          sql = 'SELECT id, ngoko, krama, indonesia FROM `data` WHERE krama LIKE ?';
          values = [req.query.q.trim()];
          break;

        default:
          sql = 'SELECT id, ngoko, krama, indonesia FROM `data` WHERE indonesia LIKE ?';
          values = [req.query.q.trim()];
          break;
      }

      let data = await sqlExec(db, {
        sql: sql,
        values: values
      });

      if (data.length) {
        let html = rDictionary(data, req.query.lang);

        res.status(200).json({
          status: 'SUCCESS',
          data: html
        });
      } else {
        res.status(404).json({
          status: 'EMPTY',
          message: 'Data not found'
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error
    });
  }
});

/* alphabet */
router.get('/:l', async function (req, res, next) {
  try {
    let alphabet = /^[a-zA-Z]{1}$/;
    if (!alphabet.test(req.params.l)) {
      res.status(400).json({
        status: 'FAILED',
        message: 'Letter is required'
      });
    } else {
      let sql = 'SELECT id, ngoko, krama, indonesia FROM `data` WHERE alphabet = ?';
      let values = [req.params.l];

      let data = await sqlExec(db, {
        sql: sql,
        values: values
      });

      let html = rDictionary(data);

      res.status(200).json({
        status: 'SUCCESS',
        data: html
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error
    });
  }
});

module.exports = router;
