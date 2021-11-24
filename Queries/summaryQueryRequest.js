const axios = require('axios');
const oauth = require('axios-oauth-client');
const GraphQLClient = require('graphql-request').GraphQLClient;
require('dotenv').config();

const APIKey = process.env.WCL_API_KEY;
const clientID = process.env.WCL_CLIENT;
const clientSecret = process.env.WCL_SECRET;
const oAuthEndpoint = process.env.WCL_OAUTH_ENDPOINT;
const wclEndpoint = process.env.WCL_GQL_ENDPOINT;

module.exports = async function (code, id, startTime, endTime) {
  const query = `{
    reportData {
      report(code: "${code}") {
        table(dataType:  Summary startTime: ${startTime} endTime: ${endTime})
        fights(encounterID: ${id} translate: true, killType: All) {
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
  }`;

  const getClientCredentials = oauth.client(axios.create(), {
    url: oAuthEndpoint,
    grant_type: 'client_credentials',
    client_id: clientID,
    client_secret: clientSecret,
  });

  const auth = await getClientCredentials();

  const graphQLClient = new GraphQLClient(wclEndpoint, {
    headers: {
      authorization: `Bearer ${auth.access_token}`,
    },
  });

  const data = await graphQLClient.request(query);
  const dataToExtract = JSON.stringify(data, undefined, 2);

  return dataToExtract;
};
