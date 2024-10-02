const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  produtos: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true }
  }],
  dataVenda: { type: Date, default: Date.now },
  valorTotal: { type: Number, required: true }
});

const Venda = mongoose.model('Venda', vendaSchema);
module.exports = Venda;
