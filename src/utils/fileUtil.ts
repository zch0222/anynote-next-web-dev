import * as crypto from 'crypto';

export function calculateFileHash(reader: FileReader, type: "sha256" | "sha512" = "sha512"): string {
    return crypto.createHash(type).digest("hex")
}