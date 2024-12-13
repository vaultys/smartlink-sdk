export class Webhook {
  static async verify(body: { date: number; signature: string; data: unknown }, apiKey: string): Promise<boolean> {
    const date = body.date;
    if (new Date().getTime() - date <= 60 * 1 * 1000) {
      const keyBuffer = new TextEncoder().encode(apiKey);
      const cryptoKey = await crypto.subtle.importKey("raw", keyBuffer, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["verify"]);
      const { signature, ...data } = body;
      const dataBuffer = new TextEncoder().encode(JSON.stringify(data));
      const match = signature.match(/.{1,2}/g);
      if (!match) return false;
      const signatureArray = new Uint8Array(match.map((byte: string) => parseInt(byte, 16)));
      return await crypto.subtle.verify("HMAC", cryptoKey, signatureArray, dataBuffer);
    }
    console.error("Webhook verification failed: timestamp is too old");
    return false;
  }
}
