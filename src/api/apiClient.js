// import axios from "axios";

// const apiClient = axios.create({
//    baseURL:import.meta.env.VITE_API_BASE_URL,
//    timeout:10000,
// });

// export default apiClient;

import axios from "axios";

const apiClient = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   timeout: 10000,
   
   // 1. MUST BE TRUE to send and receive cookies (like the CSRF cookie)
   withCredentials: true, 
   
   // 2. Tell Axios the exact names Spring Boot uses for CSRF
   xsrfCookieName: 'XSRF-TOKEN',
   xsrfHeaderName: 'X-XSRF-TOKEN',
});

export default apiClient;