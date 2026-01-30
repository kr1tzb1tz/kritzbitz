/*
 * API Base - Cloudflare Worker URL
 */
export const workerUrl = process.env.NEXT_PUBLIC_WORKER_URL;

/*
 * Post the contact form to Cloudflare Worker.
 */
export const postInquiry = async (data) => {
  const response = await fetch(`${workerUrl}/inquiry`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const error = new Error("Request failed");
    error.status = response.status;
    throw error;
  }
  return response.json();
};
