const express = require('express');
const router = express.Router();
const infoQueryReq = require('../Queries/infoQueryRequest');
const summaryQueryReq = require('../Queries/summaryQueryRequest');

router.get('/firstInfo/:code', async (req, res) => {
  const { code } = req.params;

  const data = await infoQueryReq(code);

  res.send(data);
});

router.get('/summary/:code/:id/:startTime/:endTime', async (req, res) => {
  const { code, id, startTime, endTime } = req.params;
  const data = await summaryQueryReq(code, id, startTime, endTime);

  res.send(data);
});

module.exports = router;
