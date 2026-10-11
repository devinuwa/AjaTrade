export async function submitWaitlist(payload) {
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT;

  if (!endpoint) {
    console.warn("VITE_WAITLIST_ENDPOINT is not configured; simulating waitlist success.");
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    return { ok: true };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Waitlist request failed with status ${response.status}.`);
  }

  return { ok: true };
}
