export async function importKey(secret: string): Promise<CryptoKey> {
    const enc = new TextEncoder().encode(secret.padEnd(32, '0').slice(0, 32)); // pad or trim to 32 bytes
    return crypto.subtle.importKey(
        "raw",
        enc,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );
}

export async function encrypt(rawData: any, secret: string): Promise<{ key: string }> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await importKey(secret);
    const data = new TextEncoder().encode(JSON.stringify(rawData));

    const encryptedBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);

    // Combine IV and ciphertext
    const result = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    result.set(iv);
    result.set(new Uint8Array(encryptedBuffer), iv.length);

    return { key: btoa(String.fromCharCode(...result)) }; // base64 encoded string
}

export async function decrypt(encrypted: { key: string }, secret: string): Promise<any> {
    const encryptedBytes = Uint8Array.from(atob(encrypted.key), c => c.charCodeAt(0));
    const iv = encryptedBytes.slice(0, 12);
    const data = encryptedBytes.slice(12);

    const keyObj = await importKey(secret);
    const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, keyObj, data);

    const json = new TextDecoder().decode(decryptedBuffer);
    return JSON.parse(json);
}
