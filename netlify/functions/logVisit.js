export async function handler(event, context) {
  const ip = event.headers['x-nf-client-connection-ip'] || 'unknown';
  const userAgent = event.headers['user-agent'] || 'unknown';
  const path = event.queryStringParameters.path || 'unknown';
  const referrer = event.headers['referer'] || 'none';

  // For simplicity, log to a public Google Sheet via fetch (see below)
  await fetch("https://script.google.com/macros/s/AKfycbyWwZEwccXTTMCj3YXl13FBkWPam9PxL5CxMJ9ZFAIBj2hsojz7NUkXozEWuiU0VquuZg/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ip, userAgent, path, referrer })
  }).catch(() => {});

  return {
    statusCode: 200,
    body: 'ok'
  };
}
