import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const apiKey = process.env.JOTFORM_API_KEY;
  if (!apiKey) {
    console.log('STATUS: FAILED - JOTFORM_API_KEY is missing.');
    return;
  }
  
  const endpoints = [
    'https://api.jotform.com/user/forms',
    'https://eu-api.jotform.com/user/forms'
  ];

  for (const url of endpoints) {
    console.log(`TESTING ENDPOINT: ${url}`);
    try {
      const response = await axios.get(url, {
        params: { apiKey, limit: 50 },
        timeout: 5000
      });
      console.log(`STATUS: SUCCESS for ${url}`);
      const forms = response.data.content || [];
      console.log(`FORMS_FOUND: ${forms.length}`);
    } catch (error: any) {
      console.log(`STATUS: FAILED for ${url} - Error: ${error.response?.data?.message || error.message}`);
    }
  }
  console.log('CRITICAL: All form fetch endpoints failed.');
}

test();
