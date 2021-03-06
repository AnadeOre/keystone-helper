const express = require('express');
const router = express.Router();
const queryReq = require('../queryRequest');

router.get('/:code', async (req, res) => {
  const { code } = req.params;

  const data = await queryReq(code);
  console.log(data);
  res.send(data);
});

module.exports = router;
