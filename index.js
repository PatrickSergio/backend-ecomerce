const express = require('express');
const mongoose = require('mongoose');
const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const Venda = require('./models/venda');  
const Pedido = require('./models/pedido'); 
const Estoque = require('./models/estoque');  

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/dncommerce')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));


app.post('/produtos', async (req, res) => {
  const { nome, descricao, preco, quantidade_em_estoque } = req.body;
  try {
    const novoProduto = new Produto({ nome, descricao, preco, quantidade_em_estoque });
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar produto' });
  }
});

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade_em_estoque } = req.body;
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, descricao, preco, quantidade_em_estoque },
      { new: true }
    );
    if (!produtoAtualizado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const produtoDeletado = await Produto.findByIdAndDelete(id);
    if (!produtoDeletado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
});

// Rotas para Clientes
app.post('/clientes', async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  try {
    const novoCliente = new Cliente({ nome, email, telefone, endereco });
    await novoCliente.save();
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar cliente' });
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
});

app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, endereco } = req.body;
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(
      id,
      { nome, email, telefone, endereco },
      { new: true }
    );
    if (!clienteAtualizado) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json(clienteAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente' });
  }
});

app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const clienteDeletado = await Cliente.findByIdAndDelete(id);
    if (!clienteDeletado) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente' });
  }
});


app.post('/vendas', async (req, res) => {
  const { cliente, produtos } = req.body;
  try {
    const clienteExiste = await Cliente.findById(cliente);
    if (!clienteExiste) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    let valorTotal = 0;
    for (const item of produtos) {
      const produto = await Produto.findById(item.produto);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      valorTotal += produto.preco * item.quantidade;
    }

    const novaVenda = new Venda({
      cliente,
      produtos,
      valorTotal
    });

    await novaVenda.save();

    const vendaPopulada = await Venda.findById(novaVenda._id)
      .populate('cliente')
      .populate('produtos.produto');

    res.status(201).json(vendaPopulada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar venda' });
  }
});

app.get('/vendas', async (req, res) => {
  try {
    const vendas = await Venda.find().populate('cliente').populate('produtos.produto');
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vendas' });
  }
});

app.put('/vendas/:id', async (req, res) => {
  const { id } = req.params;
  const { cliente, produtos } = req.body;

  try {
    let valorTotal = 0;
    for (const item of produtos) {
      const produto = await Produto.findById(item.produto);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      valorTotal += produto.preco * item.quantidade;
    }

    const vendaAtualizada = await Venda.findByIdAndUpdate(
      id,
      { cliente, produtos, valorTotal },
      { new: true }
    ).populate('cliente').populate('produtos.produto');

    if (!vendaAtualizada) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }

    res.status(200).json(vendaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar venda' });
  }
});

app.delete('/vendas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const vendaDeletada = await Venda.findByIdAndDelete(id);
    if (!vendaDeletada) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    res.status(200).json({ message: 'Venda deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar venda' });
  }
});


app.post('/pedidos', async (req, res) => {
  const { cliente, produtos } = req.body;
  try {
    let valorTotal = 0;
    for (const item of produtos) {
      const produto = await Produto.findById(item.produto);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      valorTotal += produto.preco * item.quantidade;
    }

    const novoPedido = new Pedido({
      cliente,
      produtos,
      valorTotal
    });

    await novoPedido.save();
    const pedidoPopulado = await Pedido.findById(novoPedido._id)
      .populate('cliente')
      .populate('produtos.produto');

    res.status(201).json(pedidoPopulado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar pedido' });
  }
});

app.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('cliente').populate('produtos.produto');
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos' });
  }
});

app.put('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { cliente, produtos, status } = req.body;

  try {
    let valorTotal = 0;
    for (const item of produtos) {
      const produto = await Produto.findById(item.produto);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      valorTotal += produto.preco * item.quantidade;
    }

    const pedidoAtualizado = await Pedido.findByIdAndUpdate(
      id,
      { cliente, produtos, valorTotal, status },
      { new: true }
    ).populate('cliente').populate('produtos.produto');

    if (!pedidoAtualizado) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.status(200).json(pedidoAtualizado);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar pedido' });
  }
});

app.delete('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pedidoDeletado = await Pedido.findByIdAndDelete(id);
    if (!pedidoDeletado) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.status(200).json({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar pedido' });
  }
});


app.post('/estoque/movimentar', async (req, res) => {
  const { produto, quantidade, tipo } = req.body;

  try {
    const estoque = await Estoque.findOne({ produto });
    if (!estoque) {
      return res.status(404).json({ message: 'Produto não encontrado no estoque' });
    }

    if (tipo === 'saida' && quantidade > estoque.quantidadeDisponivel) {
      return res.status(400).json({ message: 'Quantidade insuficiente no estoque' });
    }

    const novaMovimentacao = { tipo, quantidade };
    estoque.movimentacoes.push(novaMovimentacao);

    if (tipo === 'entrada') {
      estoque.quantidadeDisponivel += quantidade;
    } else if (tipo === 'saida') {
      estoque.quantidadeDisponivel -= quantidade;
    }

    await estoque.save();
    res.status(201).json(estoque);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao movimentar estoque' });
  }
});

app.get('/estoque', async (req, res) => {
  try {
    const estoques = await Estoque.find().populate('produto');
    res.status(200).json(estoques);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar estoque' });
  }
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
