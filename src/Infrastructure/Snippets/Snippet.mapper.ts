import { Snippet } from '@prisma/client';
import { Snippets } from '@domain/Snippets/Snippets';

export class SnippetMapper {
  static toDomain(snippet: Snippet): Snippets {
    const { id, content, isPrivate, passHash } = snippet;

    return new Snippets(id, content, passHash, isPrivate);
  }

  static toModel(snippet: Snippets): Snippet {
    const { id, content, isPrivate, passHash } = snippet;

    return {
      id,
      content,
      isPrivate,
      passHash,
    } as Snippet;
  }
}
