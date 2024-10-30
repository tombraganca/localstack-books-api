import { Module } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DYNAMODB_CLIENT',
      useFactory: (configService: ConfigService) => {
        const client = new DynamoDBClient({
          region: configService.get('AWS_REGION'),
          endpoint: configService.get('DYNAMODB_ENDPOINT'),
          credentials: {
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          },
        });
        return DynamoDBDocumentClient.from(client);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DYNAMODB_CLIENT'],
})
export class DynamoDbModule {}
