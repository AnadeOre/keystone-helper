const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const oauth = require('axios-oauth-client');
const GraphQLClient = require('graphql-request').GraphQLClient;

const APIKey = process.env.WCL_API_KEY;


const clientID = process.env.WCL_CLIENT;
const clientSecret = process.env.WCL_SECRET;
const oAuthEndpoint = process.env.WCL_OAUTH_ENDPOINT;
const wclEndpoint = process.env.WCL_GQL_ENDPOINT


router.get("/:code", async (req, res) => {
  const { code } = req.params;


  const query = `{
    reportData {
      report(code: "${code}") {
        fights(translate: true, killType: Kills) {
          averageItemLevel
          keystoneAffixes
          keystoneLevel
          id
          startTime
          endTime
          keystoneTime
          gameZone {
            id
            name
          }
          friendlyPlayers
          encounterID
          dungeonPulls {
            name
            encounterID
            enemyNPCs{
              id
              gameID
            }
            maps {
              id
            }
            x
            y
            endTime
            startTime
          }
          boundingBox {
            minX
            minY
          }          
        }
        region {
          slug
        }
        title
        startTime
        endTime
        masterData{
          actors(type: "Player"){
            id
            name
            subType
            server
          }
        }
      } 
    }
  }`

  const getClientCredentials = oauth.client(axios.create(), {
    url: oAuthEndpoint,
    grant_type: 'client_credentials',
    client_id: clientID,
    client_secret: clientSecret
  });

  const auth = await getClientCredentials();

  const graphQLClient = new GraphQLClient(wclEndpoint, {
    headers: {
      authorization: `Bearer ${auth.access_token}`
    }
  })
  const data = await graphQLClient.request(query)
  //console.log(JSON.stringify(data, undefined, 2))

  /*
  const apiURL = `https://www.warcraftlogs.com:443/v1/report/fights/${code}?translate=false&api_key=${APIKey}`

  //axios.get(apiURL).then(response => res.json(response))
 
  const response = await axios.get(apiURL);
*/
  const dataToExtract = JSON.stringify(data, undefined, 2)
  res.send(dataToExtract)

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