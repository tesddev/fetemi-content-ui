export const CONFIG = {
  // Set to true to use live endpoints, false for test endpoints
  IS_LIVE: true,
  API_KEY: import.meta.env.VITE_N8N_API_KEY,
};

const BASE_URL_LIVE = 'https://cohort2pod2.app.n8n.cloud/webhook';
const BASE_URL_TEST = 'https://cohort2pod2.app.n8n.cloud/webhook-test';

export const API_BASE_URL = CONFIG.IS_LIVE ? BASE_URL_LIVE : BASE_URL_TEST;

export const ENDPOINTS = {
  CONTENT_SUBMIT: `${API_BASE_URL}/content-submit`,
  DRAFT_SELECT: `${API_BASE_URL}/draft-select`
};

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'X-API-Key': CONFIG.API_KEY
};
