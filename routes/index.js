const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req, res, next)=> {
  try {
    const result = await db.query('SELECT * FROM fishes');
   return res.json(result.rows);
  } catch(err) {
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  const query = {
    text: 'INSERT INTO fishes (name, type, image_url, description) VALUES($1, $2, $3, $4) RETURNING *',
    values: [req.body.name, req.body.type, req.body.image_url, req.body.description],
  };
  
  try {
    const result = await db.query(query);
    console.log('Created>>>>>>>', result.rows[0]);
    return res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, next)=> {
  const query = {
    text: 'UPDATE fishes SET name = $1, type = $2, image_url = $3, description = $4 WHERE id = $5 RETURNING *',
    values: [req.body.name, req.body.type, req.body.image_url, req.body.description, req.params.id],
  };
  try {
    const result = await db.query(query);
    console.log('Updated to >>>>>>', result.rows[0]);
    return res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});


router.delete('/:id', async (req, res, next)=> {
  const query = {
    text: 'DELETE FROM fishes WHERE id = $1 RETURNING *',
    values: [req.params.id],
  };
  try {
    const result = await db.query(query);
    console.log('Deleted >>>>>>', result.rows[0]);
    const msg = `${result.rows[0]} Deleted Successfully`;
    return res.json({mesaage: msg});
  } catch (err) {
    next(err);
  }
});


module.exports = router;