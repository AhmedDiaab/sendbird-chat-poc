export async function withRetry(fn, retries = 3, retryWindowFallbackInSeconds = 5) {
    let attempt = 0;

    while (attempt < retries) {
        try {
            return await fn();
        } catch (err) {
            if (
                err?.response?.status === 429 &&
                err?.response?.headers?.["X-RateLimit-RetryAfter"]
            ) {
                const retryAfter = parseInt(err.response?.headers["X-RateLimit-RetryAfter"], 10) || retryWindowFallbackInSeconds;
                const waitTimeMs = retryAfter * 1000;

                console.warn(`Rate limited. Retrying in ${waitTimeMs}ms...`);
                await new Promise((resolve) => setTimeout(resolve, waitTimeMs));
                attempt++;
            } else {
                throw err;
            }
        }
    }

    throw new Error("Exceeded retry limit due to rate limiting.");
}
