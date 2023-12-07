import { Body, Controller, Get, Param, Post, Res, Headers, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateSnippetDto } from './CreateSnippet.dto';

import { Response } from 'express';
import { CreateSnippetUseCase } from '@application/Snippets/CreateSnippet.use-case';
import { GetSnippetDataDto } from './GetSnippetData.dto';
import { GetSnippetContentUseCase } from '@application/Snippets/GetSnippet.use-case';
import { SnippetPassNotValidError } from '@domain/Snippets/SnippetPassNotValid.Error';
import { NoSnippetPassProvidedError } from '@domain/Snippets/NoSnippetPassProvided.Error';

@Controller('snippet')
export class SnippetController {
  constructor(private readonly createSnippetUseCase: CreateSnippetUseCase, private readonly getSnippetContentUseCase: GetSnippetContentUseCase) {}

  @Post('/')
  async createSnippet(
    @Body() body: CreateSnippetDto,
    @Res() response: Response,
  ) {
    const { content, pass } = body;

    const snippetUrl = await this.createSnippetUseCase.execute(content, pass);

    response.status(HttpStatus.CREATED).send({
      snippet: snippetUrl
    });
  }

  @Post('/:snippetId')
  @HttpCode(HttpStatus.OK)
  async getSnippet(@Param('snippetId') snippetId: string, @Body() data: GetSnippetDataDto, @Res() response: Response) {

    const { pass } = data;
    try {
      const snippetContent = await this.getSnippetContentUseCase.execute(snippetId, pass)
      response.send({
        content: snippetContent
      })
    } catch(e) {
      if(e instanceof SnippetPassNotValidError) {
        response.sendStatus(HttpStatus.FORBIDDEN)
      } 
      else if(e instanceof NoSnippetPassProvidedError) {
        response.sendStatus(HttpStatus.BAD_REQUEST)
      }else {
        response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
