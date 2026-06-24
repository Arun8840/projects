import { getSession, signOut } from '@/utils/auth/client';
import axios from 'axios';
// --- 1. Base Configuration ---
const publicConfig = {
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const privateConfig = {
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const publicApi = axios.create(publicConfig);

export const privateApi = axios.create(privateConfig);

privateApi.interceptors.request.use(
  async (config) => {
    const { data: session } = await getSession();
    const access_token = session?.session?.token;

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (
      status === 401 ||
      status === 404 ||
      error?.response?.data?.message === 'Could not validate the Token'
    ) {
      console.warn(`Auth failure (${status}): Signing out user...`);

      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.replace('/auth/login');
          },
        },
      });
    }

    return Promise.reject(error);
  },
);
