import { SnippetRepository } from '@domain/Snippets/SnippetRepository';
import { PrismaService } from '../prisma.service';
import { Snippets } from '@domain/Snippets/Snippets';
import { SnippetMapper } from './Snippet.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresSnippetRepository implements SnippetRepository {
  constructor(private prismaService: PrismaService) {}

  async get(snippetId: string) {
    return this.prismaService.snippet.findFirst({
      where: {
        id: snippetId
      }
    })
  }

  async add(snippet: Snippets): Promise<void> {
    await this.prismaService.snippet.create({
      data: SnippetMapper.toModel(snippet),
    });
  }
}
