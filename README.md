# Seguros Unimed

A aplicação tem como objetivo apresentar os dados de clientes para consultas e também permite cadastrar, alterar ou excluir clientes.

## Rodando a aplicação

### Pré requisitos:
```text
* Node
* Npm
* Docker
```

## Desenvolvimento

Para criar essa aplicação eu escolhi o ReactJs por ser um framework em Javascript bem utilizado atualmente e também possui uma rápida curva de aprendizado.

Para instalar as dependências basta entrar na raiz do projeto e executar o seguinte comando:
``` npm i --force ```

Para rodar a aplicação em modo de desenvolvimento basta navegar até a raiz do diretório e rodar o seguinte comando:
`npm start`

Logo após acessar o seguinte endereço no broswer:
`http://localhost:3000`


No arquivo `.env` que está na raiz do projeto contém as váriveis de ambiente utilizadas como URL da API e também o token de autenticação:


## Build

Para gerar um build com os artefatos basta executar o seguinte comando:

`npm run build`

Os artefatos serão gerados no diretório `build`

Para realizar o deploy dos artefatos gerados basta instalar o servidor de aplicação simples e informar o diretório de build:
```
npm install -g serve
serve -s build
```

## Docker

Para rodar a aplicação local de maneira fácil foi criado um arquivo docker-compose.yml na raiz do projeto.

Para criar o container com a aplicação execute o seguinte comando:
`docker compose up -d`

Para destruir o container criado anteriormente execute o seguinte comando:
`docker compose down`

### Para acessar a aplicação basta entrar no seguinte endereço: `http://localhost:3000`
