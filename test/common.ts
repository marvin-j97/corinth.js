const PORT = 44444;
export const getIp = () => `http://localhost:${PORT}`;

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
