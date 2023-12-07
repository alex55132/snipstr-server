import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SnippetModule } from './modules/snippet.module';
import { PrismaService } from '@infrastructure/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.CONTAINER === "true"
    }),

    SnippetModule,
  ],
  controllers: [],
  providers: [ PrismaService],
})
export class AppModule {}
