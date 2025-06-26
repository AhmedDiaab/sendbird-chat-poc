export async function chunkedExecute(items, chunkSize, asyncFn) {
    const results = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);
        results.push(...await Promise.all(chunk.map(asyncFn)));
    }
    return results;
}
