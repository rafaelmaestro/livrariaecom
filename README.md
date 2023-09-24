# Execução

## Instância Local de MySQL

Já existe uma configuração para subir uma instância local de um banco de dados mysql no projeto.

Para isso será necessário executar o comando à seguir dentro da pasta raiz do projeto:

```shell
docker-compose -up
```

OBS: Quaisquer alterações na conexão devem ser refletidas no arquivo de configuração dos containers em `docker-compose.yml` e nas váriaveis de ambiente no arquivo `.env`.

## Instalação das depedências

Para instalação das dependências do projeto Node, executar o seguinte comando no terminal:

```shell
npm install
```

## Criação dos objetos de banco

Para criação das tabelas e demais objetos de banco necessários para funcionamento da aplicação, executar o seguinte comando na raiz do projeto:

```shell
npm run migration:run
```

## Execução em ambiente local

Após as etapas anteriores, para executar o projeto em ambiente local, executar o comando:

```shell
npm run start
```
