import * as uuid from 'uuid';

export class Snippets {
  constructor(
    readonly id: string,
    readonly content: string,
    readonly passHash: string | null,
    readonly isPrivate: boolean = false
  ) {}
}
