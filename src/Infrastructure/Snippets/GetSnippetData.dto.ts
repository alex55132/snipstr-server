import { IsOptional, IsString } from "class-validator";

export class GetSnippetDataDto {
    @IsString()
    @IsOptional()
    pass?: string;
}