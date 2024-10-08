﻿# backend-ecomerce

 # Sistema de Gerenciamento de Vendas Online

Este repositório contém o código para um sistema de gerenciamento de vendas online, incluindo as funcionalidades de cadastro de clientes, produtos, vendas e pedidos.

## Diagrama do Banco de Dados

Este diagrama ilustra a estrutura do banco de dados do sistema.

![Diagrama do Banco de Dados](models/image/imagem.svg)

## Descrição das Entidades

- **Cliente**:
  - `cliente_cod`: Código único do cliente.
  - `cliente_nome`: Nome do cliente.
  - `cliente_email`: Email do cliente.
  - `cliente_endereco`: Endereço do cliente.
  - `d_cadastro`: Data de cadastro do cliente.

- **Produto**:
  - `produto_cod`: Código único do produto.
  - `produto_nome`: Nome do produto.
  - `produto_preco`: Preço do produto.
  - `estoque_cod`: Código do estoque relacionado.

- **Venda**:
  - `venda_cod`: Código único da venda.
  - `cliente_cod`: Código do cliente que fez a venda.
  - `data_venda`: Data em que a venda foi realizada.
  - `valor_total`: Valor total da venda.

- **Pedido**:
  - `pedido_cod`: Código único do pedido.
  - `cliente_cod`: Código do cliente que fez o pedido.
  - `data_pedido`: Data em que o pedido foi realizado.
  - `status`: Status do pedido (ex: pendente, concluído).

- **Estoque**:
  - `estoque_cod`: Código único do estoque.
  - `produto_cod`: Código do produto relacionado.
  - `quantidade_disponivel`: Quantidade disponível do produto em estoque.

## Relações
- Um **Cliente** pode ter várias **Vendas**.
- Uma **Venda** pode conter vários **Pedidos**.
- Cada **Produto** tem um único registro em **Estoque**.
- Um **Produto** pode estar presente em vários **Pedidos**.

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/PatrickSergio/backend-ecomerce.git

