import axios from 'axios';
import { getAccessToken } from './hotmartAuth';

const HOTMART_PAYMENT_BASE_URL = process.env.HOTMART_PAYMENT_BASE_URL

export async function makeGetRequest(endpoint: string) {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(`${endpoint}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error making GET request to ${endpoint}:`, error);
    throw error;
  }
}

export async function makePostRequest( data: any) {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.request({
      method: 'GET',
      url: `${HOTMART_PAYMENT_BASE_URL}`,
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('response ->', response)
    console.log('response data->', response.data)
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${HOTMART_PAYMENT_BASE_URL}:`, error);
    throw error;
  }
}