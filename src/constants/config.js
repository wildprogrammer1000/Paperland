const nakamaConfig = {
  serverkey: import.meta.env.VITE_NKM_SERVER_KEY,
  host: import.meta.env.VITE_NKM_SERVER_HOST,
  port: import.meta.env.VITE_NKM_SERVER_PORT,
  useSSL: import.meta.env.VITE_NKM_SERVER_USESSL,
};

export { nakamaConfig };
