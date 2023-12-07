import { PasswordUtilService } from "@domain/PasswordUtil.service";
import { SnippetEncryptionService } from "@domain/SnippetEncryption.service";
import { NoSnippetPassProvidedError } from "@domain/Snippets/NoSnippetPassProvided.Error";
import { SnippetPassNotValidError } from "@domain/Snippets/SnippetPassNotValid.Error";
import { SnippetRepository } from "@domain/Snippets/SnippetRepository";
import { Snippets } from "@domain/Snippets/Snippets";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class GetSnippetContentUseCase {

    constructor( @Inject('SnippetsRepository')
    private readonly snippetRepository: SnippetRepository,
    private readonly passwordUtilService: PasswordUtilService,
    private readonly snippetEncryptionService: SnippetEncryptionService) {}

    async execute(snippetId: string, pass: string | undefined): Promise<string> {

        const snippet: Snippets = await this.snippetRepository.get(snippetId);

        let content = "";

        //Validate if the provided pass is valid
        if(snippet.isPrivate) {
            if(!pass) {
                throw new NoSnippetPassProvidedError()
            }

            const isValid = await this.passwordUtilService.verifyPassword(pass, snippet.passHash)

            if(!isValid){
               throw new SnippetPassNotValidError() 
            }

            //Decrypt snippet
            content = await this.snippetEncryptionService.decryptSnippet(snippet.content, snippet.passHash)
        } else {
            content = snippet.content;
        }
        

        return content;

    }

}