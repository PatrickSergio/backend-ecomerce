const mongoose = require('mongoose');

const estoqueSchema = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  quantidadeDisponivel: { type: Number, required: true },
  movimentacoes: [{
    tipo: { type: String, enum: ['entrada', 'saida'], required: true },
    quantidade: { type: Number, required: true },
    dataMovimentacao: { type: Date, default: Date.now }
  }]
});

const Estoque = mongoose.model('Estoque', estoqueSchema);
module.exports = Estoque;
