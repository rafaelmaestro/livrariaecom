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

_A rota de login retornará um access_token que deverá ser salvo pelo frontend para requisições futuras às rotas protegidas pelo guard jwt. O token deve ser informado nas requisições futuras como Authorization Bearer._

## Obter Endereços do Usuário

Para obter os endereços cadastradas do usuário, realizar GET na rota `localhost:5000/livraria-ecom/usuario/$cpf/enderecos` fornecendo o cpf do usuario como parâmetro (**rota protegida pelo guard**).

O retorno segue o padrão à seguir:

```json
[
    {
        "id": 1,
        "rua": "Rua Jao de Barro, 65",
        "cep": "18137-191",
        "estado": "SP",
        "cidade": "São Roque",
        "cpf": "527777788809"
    }
]
```

# Livros (Estoque)

## Buscar Autores

Para registrar um livro em estoque é necessário fornecer dados do autor, essa rota retorna os autores cadastrados de forma paginada, realizando um GET na rota `localhost:5000/livraria-ecom/estoque/autores` (protegida por guard), devem ser enviados os parâmetros de pagina e limite e o retorno segue o modelo de exemplo à seguir:

```json
{
    "data": [
        {
            "email": "rafaelmaestro@live.com",
            "nome": "Robert C. Martin"
        }
    ],
    "paginacao": {
        "pagina": 0,
        "limite": 5,
        "total": 1
    }
}
```

## Buscar Editoras

Para registrar um livro em estoque é necessário fornecer dados da editora, essa rota retorna as editoras cadastrados de forma paginada, realizando um GET na rota `localhost:5000/livraria-ecom/estoque/editoras` (protegida por guard), devem ser enviados os parâmetros de pagina e limite e o retorno segue o modelo de exemplo à seguir:

```json
{
    "data": [
        {
            "cnpj": "04713695000100",
            "nome": "Alta Books",
            "telefone": "2132788069",
            "email": "suporte@altabooks.com"
        }
    ],
    "paginacao": {
        "pagina": 0,
        "limite": 5,
        "total": 1
    }
}
```

## Cadastro de Livros (Estoque)

Para registrar um novo livro em estoque , é necessário enviar um POST na rota `localhost:5000/livraria-ecom/estoque`, essa requisição é protegida por guard e deve ser enviado no campo Authorization header o access_token retornado na requisição de login como `Bearer`. No body da requisiçãp, deve ser enviado um payload no formato à seguir:

**OBS: caso autores e editoras retornados nas buscar anteriores não forem satistórios, preencher as informações do payload de cadastro de livro automaticamente cadastram novo autor e editora**

```
{
    isbn: string
    nome: string
    valor: number
    imagem?: string
    autor: {
      	email: string
      	nome: string
    }
    editora: {
		cnpj: string
		nome: string
		email: string
		telefone: string
    }
    estoque: {
		sku: string
		quantidade: number
		isbn: string
    }
}

```

## Buscar Livros Em Estoque

Para buscar os livros em estoque , é necessário enviar um GET na rota `localhost:5000/livraria-ecom/estoque`, essa requisição é protegida por guard e deve ser enviado no campo Authorization header o access_token retornado na requisição de login como `Bearer`. Essa requisição **é paginada**. Nos query parameters da requisição devem ser enviados os parâmetros `pagina: number` e `limite: number`, conforme o exemplo à seguir:

```
localhost:5000/livraria-ecom/estoque?pagina=0&limite=5
```

O retorno seguirá o padrão à seguir:

```json
{
    "data": [
        {
            "isbn": "9788550804606",
            "nome": "Arquitetura Limpa",
            "valor": 99.9,
            "imagem": null,
            "nome_autor": "Robert C. Martin",
            "cnpj_editora": "04713695000100",
            "autor": {
                "email": "rafaelmaestro@live.com",
                "nome": "Robert C. Martin"
            },
            "editora": {
                "cnpj": "04713695000100",
                "nome": "Alta Books",
                "telefone": "2132788069",
                "email": "suporte@altabooks.com"
            },
            "estoque": {
                "sku": "1515",
                "quantidade": 10,
                "isbn": "9788550804606"
            }
        }
    ],
    "paginacao": {
        "pagina": 0,
        "limite": 1,
        "total": 1
    }
}
```

## Alterar preço de livro

Para alterar preço de um livro, realizar POST na rota `localhost:5000/livraria-ecom/estoque/$isbn/alterar-preco` (**protegida pelo guard**), passando como parâmetro o isbn do livro e no body o valor à ser atualizado.

Exemplo:

`localhost:5000/livraria-ecom/estoque/FO8442026867387233/alterar-preco`

```json
{
    "valor": "70.90"
}
```

O retorno será um código 201 em caso de sucesso.

# Venda

## Inicializar carrinho

Para iniciar um processo de pedido para um cliente, é necessário inicializar um carro sem nenhum produto antes, para isso realizar um POST na rota `localhost:5000/livraria-ecom/venda/carrinho` (**rota protegida pelo guard**) passando no body da requisição, o cpf do cliente. Caso o cliente já tenha um carrinho com situação igual à aguardando_pagamento, este será retornado e não será criado um novo.

Exemplo:

```json
{
    "cpf": "52776389803"
}
```

O retorno seguirá o modelo à seguir:

```json
{
    "codigo": 3,
    "situacao": "aguardando_pagamento",
    "cpf": "52776789807"
}
```

## Manipular produtos no carrinho

Após inicialização do carrinho, para manipular os itens é necessário realizar um requisição do tipo PATCH para a rota `localhost:5000/livraria-ecom/venda/carrinho` (**rota protegida pelo guard**), passando no body o código do carrinho, quantidade e isbn.

**OBS: para incrementar a quantidade, passar um número POSITIVO, e para decrementar, um número NEGATIVO**

Exemplo:

```json
{
    "codigo_carrinho": 3,
    "quantidade": -1,
    "isbn": "9788550804777"
}
```

Em caso de sucesso a rota retorna apenas código 200, mas pode retornar algumas exceçoes específicas, como por exemplo, numa tentativa de inserir ou retirar um produto de um carrinho já pago, ou ainda inserir uma quantidade não disponível em estoque de um livro.

## Retornar carrinho

Para retornar informações gerais do carrinho, realizar GET na rota `localhost:5000/livraria-ecom/venda/carrinho` (**protegida pelo guard**), fornecendo como query paramater o codigo do carrinho, o retorno seguirá o modelo à seguir:

```json
{
    "codigo": 3,
    "situacao": "aguardando_pagamento",
    "cpf": "52776789807",
    "valor_total": 159.8,
    "itens": [
        {
            "livro": {
                "isbn": "9788550804777",
                "titulo": "Código Limpo",
                "valor": 79.9,
                "imagem": null,
                "autor": "Robert C. Martin"
            },
            "quantidade": 2
        }
    ],
    "pagamento": null
}
```

## Pagar Carrinho

Para realizar o pagamento de um carrinho, realizar POST na rota `localhost:5000/livraria-ecom/venda/carrinho/:codigo_carrinho/pagamento` (**protegida pelo guard**), passando na url o código do carrinho à ser pago e no body a forma de pagamento, seguindo o formato `cartao, pix ou boleto`.

Exemplo:

`localhost:5000/livraria-ecom/venda/carrinho/3/pagamento`

```json
{
    "forma_pagamento": "cartao"
}
```

O retorno será um código 201 em caso de sucesso, em caso de erro, segue o padrão convencional com codigo e mensagem, como por exemplo:

```json
{
    "statusCode": 400,
    "message": "Este carrinho já está pago e não pode ser alterado."
}
```
