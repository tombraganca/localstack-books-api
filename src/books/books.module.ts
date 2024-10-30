import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DynamoDbModule } from '../dynamo-db/dynamo-db.module';

@Module({
  imports: [
    DynamoDbModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
