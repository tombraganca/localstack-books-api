<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# Projeto NestJS com DynamoDB (Usando LocalStack)

Este projeto é uma API básica para gerenciar livros, desenvolvida com NestJS e usando o DynamoDB como banco de dados. Para facilitar o desenvolvimento local, o DynamoDB é simulado via LocalStack em um contêiner Docker, dispensando o acesso à AWS real.

## Requisitos

- Node.js >= 14.x
- Docker
- AWS CLI (para comandos de inicialização do DynamoDB localmente)

## Configuração do Ambiente

1. Clone o Repositório:

```sh
git clone <URL-do-repositorio>
cd <nome-do-repositorio>
```

2. Instale as Dependências:

```sh
npm install
```

3. Configuração das Variáveis de Ambiente:

Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente:

```text
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
DYNAMODB_ENDPOINT=http://localhost:4566
```

## Inicialização do LocalStack

1.  Inicie o LocalStack com Docker Compose:

```sh
docker-compose up -d
```

Isso irá configurar o LocalStack com o DynamoDB rodando na porta 4566.

2. Crie a Tabela DynamoDB (Books):

Para criar a tabela Books no LocalStack, execute o comando abaixo no terminal (dentro do contêiner ou fora dele):

```sh
aws dynamodb create-table \
    --table-name Books \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --region us-east-1 \
    --endpoint-url http://localhost:4566
```

## Executando a Aplicação NestJS

Para rodar o servidor NestJS:

```sh
npm run start:dev
```

A API estará disponível em http://localhost:3000.

## Endpoints

- POST /books: Adiciona um livro ao banco de dados.

  - **Exemplo de Payload:**

```json
{
  "id": "1",
  "title": "Exemplo de Livro",
  "author": "Autor Exemplo"
}
```

- GET /books: Retorna todos os livros cadastrados.

## Notas

- Certifique-se de que o LocalStack esteja ativo antes de iniciar a aplicação NestJS.
- Caso o comando aws dynamodb retorne um erro de região, adicione --region us-east-1 ao comando ou configure usando aws configure.

## Tecnologias Utilizadas

- NestJS: Framework para construção de APIs.
- DynamoDB (LocalStack): Banco de dados NoSQL, simulado via LocalStack.
- AWS SDK: Biblioteca para integração com a AWS.
