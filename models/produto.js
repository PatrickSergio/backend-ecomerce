const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  quantidade_em_estoque: { type: Number, required: true }
});

const Produto = mongoose.model('Produto', produtoSchema);
module.exports = Produto;
