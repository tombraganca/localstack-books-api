import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDbModule } from './dynamo-db/dynamo-db.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DynamoDbModule,
     BooksModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
