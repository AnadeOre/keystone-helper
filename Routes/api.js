const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const APIKey = process.env.WCL_API_KEY;

router.get("/", (req, res) => {
  res.json({ message: 'Hi' })
  console.log('Hello from server')
});
router.get("/:code", async (req, res) => {
  const { code } = req.params;
  const apiURL = `https://www.warcraftlogs.com:443/v1/report/fights/${code}?translate=false&api_key=${APIKey}`

  //axios.get(apiURL).then(response => res.json(response))
  const response = await axios.get(apiURL);
  data = {
    players: response.data.friendlies,
    keystoneLevel: response.data.fights[0].keystoneLevel,
    affixes: response.data.fights[0].affixes
  }
  console.log(data)
  await res.json(data)
});

/*
router.post('/save', (req, res) => {
  const data = req.body;
  const newUser = new User(data);
  newUser.save((error) => {
    if (error) res.status(500).json({ msg: 'Sorry, Internal server error' })
    else {
      res.json({
        msg: 'data recieved'
      })
    }
  });
 
})
 
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'))
})
 
router.delete('/delete/:id/:userId', (req, res) => {
  const { id, userId } = req.params;
  User.findOneAndRemove({ "usrId": userId, "recipieId": id })
    .then(data => {
      data.remove(err => {
        if (err) res.status(500).send({ msg: 'Error al eliminar la receta.' })
        res.status(200).send({ msg: 'receta eliminada' })
      })
    })
 
})*/



module.exports = router;