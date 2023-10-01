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

Após as etapas anteriores, para executar o projeto em ambiente local com flag de --watch, executar o comando:

```shell
npm run start:dev
```

Ou apenas executar sem a flag de --watch:

```shell
npm run start
```

# Autenticação

## Registro de novo usuário

Para registrar novo usuário, é necessário enviar um POST na rota `localhost:5000/livraria-ecom/usuario`,
essa requisição não é protegida por guard e deve ser enviado no body o formato:

```
{
  cpf: string;
  email: string;
  nome: string;
  telefone: string;
  senha: string;
  rua: string;
  cep: string;
  estado: string;
  cidade: string;
}

```

_OBS: Caso utilize o ThunderClient para requisições no VSCode, o arquivo `thunder-collection_livrariaecom.json` na raiz do projeto contém exemplos de requisições._

## Login

Para realizar login de usuário é necessário realizar POST na rota `localhost:5000/livraria-ecom/login`, informando no payload:

```
{
  cpf: string,
  senha: string
}
```

_OBS: Caso utilize o ThunderClient para requisições no VSCode, o arquivo `thunder-collection_livrariaecom.json` na raiz do projeto contém exemplos de requisições._

A rota de login retornará um access_token que deverá ser salvo pelo frontend para requisições futuras às rotas protegidas pelo guard jwt. O token deve ser informado nas requisições futuras como Authorization Bearer.
