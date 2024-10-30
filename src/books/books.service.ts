import { Inject, Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class BooksService {
  constructor(
    @Inject('DYNAMODB_CLIENT') private readonly dynamoDbClient: DynamoDBDocumentClient,
  ) {}

  async createBook(book: any) {
    const params = {
      TableName: 'Books',
      Item: book,
    };
    await this.dynamoDbClient.send(new PutCommand(params));
    return { message: 'Book created', book };
  }

  async getBooks() {
    const params = {
      TableName: 'Books',
    };
    const data = await this.dynamoDbClient.send(new ScanCommand(params));
    return data.Items;
  }
}
