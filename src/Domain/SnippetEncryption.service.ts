import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DecipherGCM } from 'crypto';
import { createCipheriv, createDecipheriv,  randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


@Injectable()
export class SnippetEncryptionService {
  private readonly defaultKey: string;
  private readonly authTagLength: number;
  private readonly ivLength: number;
  private readonly saltLength: number;

  constructor(private readonly configService: ConfigService) {
    this.defaultKey = this.configService.get('ENCRYPTION_DEFAULT_KEY');
    this.authTagLength = 16;
    this.ivLength = 16;
    this.saltLength = 24;
  }

  async encryptSnippet(snippet: string, passwordHash?: string): Promise<string> {
    const passwordToGenerateKey = passwordHash ?? this.defaultKey;

    const iv = randomBytes(this.ivLength)
    const salt = randomBytes(this.saltLength);

    const key = (await promisify(scrypt)(
      passwordToGenerateKey,
      salt,
      32,
    )) as Buffer;

    const cipher = createCipheriv('aes-256-gcm', key, iv, {authTagLength: this.authTagLength});

    return Buffer.concat([
      iv,
      salt,
      cipher.update(Buffer.from(snippet)),
      cipher.final(),
      cipher.getAuthTag()
    ]).toString('base64'); 
  }

  async decryptSnippet(encryptedSnippet: string, passwordHash: string) {
    const passwordToGenerateKey = passwordHash ?? this.defaultKey;
    const decryptTextWithAuthTag = Buffer.from(encryptedSnippet, 'base64');
    
    const keyStartIndex = this.ivLength + this.saltLength

    const iv = decryptTextWithAuthTag.subarray(0, this.ivLength)
    const salt = decryptTextWithAuthTag.subarray(this.ivLength, keyStartIndex)
  
    const key = (await promisify(scrypt)(
      passwordToGenerateKey,
      salt,
      32,
    )) as Buffer;

    const decipher: DecipherGCM = createDecipheriv('aes-256-gcm', key, iv);

    decipher.setAuthTag(decryptTextWithAuthTag.subarray(-this.authTagLength))

    const decryptedText = Buffer.concat([
      decipher.update(decryptTextWithAuthTag.subarray(keyStartIndex, -this.authTagLength)),
      decipher.final(),
    ]).toString();

    return decryptedText;
  }
}
