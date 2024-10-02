const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  produtos: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true }
  }],
  valorTotal: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'concluído', 'cancelado'], default: 'pendente' },
  dataPedido: { type: Date, default: Date.now }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;
