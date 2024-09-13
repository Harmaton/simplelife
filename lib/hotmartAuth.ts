import axios from 'axios';

export async function getAccessToken(): Promise<string> {
  const clientId = process.env.HOTMART_CLIENT_ID;
  const clientSecret = process.env.HOTMART_CLIENT_SECRET;
  const basicAuth = process.env.BASIC_AUTH;

  if (!clientId || !clientSecret || !basicAuth) {
    throw new Error('HOTMART_CLIENT_ID, HOTMART_CLIENT_SECRET, or BASIC_AUTH is not set in environment variables');
  }

  const url = "https://api-sec-vlc.hotmart.com/security/oauth/token";
  const options = {
    method: 'POST',
    url: url + `?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuth}`
    },
    maxRedirects: 20
  };

  try {
    const response = await axios(options);
    const access_token = response.data.access_token;
    // console.log('acceess-token ->',access_token)
    return access_token
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}