export const getImagePath = (path: string = "") => {
  const isProd = import.meta.env.VITE_VERCEL_ENV === "production";
  const DEV_URL = `http://${window.location.hostname}:1338/img?path=${path}`;
  const PROD_URL = `https://servers.acadarena.com/img?path=${path}`;
  return isProd ? PROD_URL : DEV_URL;
};
