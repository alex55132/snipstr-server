import { Module } from '@nestjs/common';
import { CreateSnippetUseCase } from '@application/Snippets/CreateSnippet.use-case';
import { PasswordUtilService } from '@domain/PasswordUtil.service';
import { SnippetEncryptionService } from '@domain/SnippetEncryption.service';
import { SnippetController } from '@infrastructure/Snippets/Snippet.controller';
import { PostgresSnippetRepository } from '@infrastructure/Snippets/PostgresSnippet.repository';
import { PrismaService } from '@infrastructure/prisma.service';
import { GetSnippetContentUseCase } from '@application/Snippets/GetSnippet.use-case';

@Module({
  imports: [],
  controllers: [SnippetController],
  providers: [
    { provide: 'SnippetsRepository', useClass: PostgresSnippetRepository },
    CreateSnippetUseCase,
    PrismaService,
    SnippetEncryptionService,
    PasswordUtilService,
    GetSnippetContentUseCase,
  ],
})
export class SnippetModule {}
