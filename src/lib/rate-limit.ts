type RateLimitRecord = {
    count: number;
    timestamp: number;
};

const requests = new Map<string, RateLimitRecord>();

export function rateLimit(
    ip: string,
    limit = 5,
    windowMs = 60 * 1000
) {
    const now = Date.now();

    const existingRequest = requests.get(ip);

    const isFirstRequest = !existingRequest;

    const isWindowExpired = !!existingRequest && now - existingRequest.timestamp > windowMs;

    if (isFirstRequest || isWindowExpired ) {
        requests.set(ip, {
            count: 1,
            timestamp: now,
        });
        return true;
    }

    const hasReachedLimit = existingRequest.count >= limit;

    if (hasReachedLimit) {
        return false;
    }
    existingRequest.count += 1;
    requests.set(ip, existingRequest);
    return true;
}