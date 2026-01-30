export interface Env {
  PUSHOVER_API_TOKEN: string;
  PUSHOVER_USER_KEYS: string;
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Range",
};
