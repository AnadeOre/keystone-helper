const axios = require('axios');
const oauth = require('axios-oauth-client');
const GraphQLClient = require('graphql-request').GraphQLClient;
require('dotenv').config();

const APIKey = process.env.WCL_API_KEY;
const clientID = process.env.WCL_CLIENT;
const clientSecret = process.env.WCL_SECRET;
const oAuthEndpoint = process.env.WCL_OAUTH_ENDPOINT;
const wclEndpoint = process.env.WCL_GQL_ENDPOINT;

module.exports = async function (code) {
  const query = `{
    reportData {
      report(code: "${code}") {
        fights(translate: true, killType: Kills) {
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
          encounterID         
        }
        title
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
