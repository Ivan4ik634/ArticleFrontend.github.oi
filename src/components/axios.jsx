import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://article-bacend-github-oi-o6fj-8n4lxr102-ivans-projects-94b08fd7.vercel.app',
});
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
export default instance;
