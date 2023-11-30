## TFC Backend

## Descrição

Projeto que cria endpoints para o front-end da TRYBE, que é um aplicativo de gerenciamento de partidas de futebol.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas antes de começar:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

**Testes:**

```bash
npm test
```

Executa testes usando Mocha.

**Cobertura de Testes em Formato JSON:**

```bash
npm run test:coverage:json
```

Gera um relatório de cobertura de testes em formato JSON usando NYC.

**Resetar Banco de Dados:**

```bash
npm run db:reset
```

Compila o TypeScript, recria o banco de dados, executa migrações e popula o banco de dados com dados iniciais.

**Build:**

```bash
npm run build
```

Compila o projeto TypeScript.

**Iniciar Servidor:**

```bash
npm start
```

Inicia o servidor usando o arquivo compilado em `./build/server.js`.

**Desenvolvimento:**

```bash
npm run dev
```

Inicia o servidor em modo de desenvolvimento com suporte a recarga automática usando ts-node-dev.

**Lint:**

```bash
npm run lint
```

Executa o ESLint para verificar possíveis problemas no código.

## Dependências de Desenvolvimento

Veja as dependências de desenvolvimento no arquivo `package.json` sob a chave `devDependencies`.

## Dependências

Veja as dependências no arquivo `package.json` sob a chave `dependencies`.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [Bcrypt](https://www.npmjs.com/package/bcryptjs)
- [JWT (JsonWebToken)](https://www.npmjs.com/package/jsonwebtoken)
- [Express](https://expressjs.com/)
- [Eslint](https://eslint.org/)

## Codigo da TRYBE

- Todo o front-end foi desenvolvido pela TRYBE, o codigo pode ser encontrado no seguinte repositorio:
  `app/frontend`
- O docker-compose.yml foi desenvolvido pela TRYBE, o codigo pode ser encontrado no seguinte repositorio:
  `app/docker-compose.yml`
- Os DockerFiles fui eu que desenvolvi, o codigo pode ser encontrado no seguinte repositorio:
  `app/backend/Dockerfile`
  `app/frontend/Dockerfile`

## Docker

- Recomendo rodar o projeto usando docker, para isso basta rodar o seguinte comando:
  `npm run compose:up`
  no diretorio raiz do projeto.
- Para parar o docker basta rodar o seguinte comando:
  `npm run compose:down`
  no diretorio raiz do projeto.
- O docker-compose.yml cria 3 containers:
  - backend
  - frontend
  - mysql
- O container de mysql é de suma importancia para o funcionamento do projeto, pois é nele que o banco de dados é criado, e o banco configurado na aplicação é o banco criado no container de mysql.
