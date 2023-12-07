import { Inject, Injectable } from '@nestjs/common';
import { SnippetRepository } from '@domain/Snippets/SnippetRepository';
import { PasswordUtilService } from '@domain/PasswordUtil.service';
import { SnippetEncryptionService } from '@domain/SnippetEncryption.service';
import * as uuid from 'uuid';
import { Snippets } from '@domain/Snippets/Snippets';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateSnippetUseCase {
  constructor(
    @Inject('SnippetsRepository')
    private readonly snippetRepository: SnippetRepository,
    private readonly passwordUtilService: PasswordUtilService,
    private readonly snippetEncryptionService: SnippetEncryptionService,
    private readonly configService: ConfigService
  ) {}

  async execute(content: string, pass?: string): Promise<string> {
    const id = uuid.v4();

    const passHash = pass ? await this.passwordUtilService.hashPassword(pass) : undefined;
    const isPrivate = !!pass;

    const encryptedSnippet = await this.snippetEncryptionService.encryptSnippet(
      content,
      passHash,
    );

    const snippet: Snippets = new Snippets(id, encryptedSnippet, passHash, isPrivate);

    await this.snippetRepository.add(snippet);

    return `${this.configService.get("BASE_URL")}/snippet/${snippet.id}`
  }
}
