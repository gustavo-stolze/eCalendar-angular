export const genKey = (): number => {
  let dt = new Date().getTime();
  let number = Math.floor(Math.random() * dt);
  return number;
};
