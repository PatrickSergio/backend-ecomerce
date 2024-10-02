const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String },
  endereco: { type: String }
});

const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;
