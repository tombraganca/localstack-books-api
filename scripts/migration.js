const AWS = require('aws-sdk');
const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');

require('dotenv').config();


// const client = new AWS.DynamoDB({
//   region: process.env.AWS_REGION,
//   endpoint: process.env.DYNAMODB_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function createTable() {
  try {

    const params = {
      TableName: 'Books',
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    const data = await client.send(new CreateTableCommand(params));
    console.log('Tabela criada com sucesso:', data.TableDescription.TableName);
  } catch (err) {
    if (err.name === 'ResourceInUseException') {
      console.log('A tabela já existe.');
    } else {
      console.error('Erro ao criar tabela:', err);
    }
  }
}

createTable();