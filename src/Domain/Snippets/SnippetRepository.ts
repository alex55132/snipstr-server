import { Snippets } from './Snippets';

export interface SnippetRepository {
  add(snippet: Snippets);
  get(snippetId: string);
}
