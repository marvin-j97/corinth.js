export const PORT = 44445;
export const getIp = () => `http://localhost:${PORT}`;

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
