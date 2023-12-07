import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSnippetDto {
  @IsString()
  @MaxLength(240)
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(128)
  pass?: string;
}
