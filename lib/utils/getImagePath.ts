export const getImagePath = (path: string = "") => {
  return `http://${window.location.hostname}:1338/img?path=${path}`;
};
