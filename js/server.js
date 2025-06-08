const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB no banco "alagaSp"
mongoose.connect('mongodb://localhost:27017/alagaSp')
  .then(() => console.log('🟢 Conectado ao MongoDB (alagaSp)'))
  .catch(err => console.error('🔴 Erro ao conectar no MongoDB:', err));

// Schema do Relato
const RelatoSchema = new mongoose.Schema({
  usuarioId: String,
  relato: String,
  imagem: {
    nome: String,
    tipo: String,
    tamanho_kb: Number
  },
  localizacao: {
    latitude: Number,
    longitude: Number
  },
  data_hora: Date,
  tags: [String],
  visualizado: Boolean
});

// ⚠️ Modelo Relato agora salva na coleção "enchentes.relatos"
const Relato = mongoose.model('Relato', RelatoSchema, 'enchentes.relatos');

// Rota para cadastrar relato
app.post('/api/relato', async (req, res) => {
  try {
    console.log("📩 Dados recebidos:", req.body);
    const novoRelato = new Relato(req.body);
    await novoRelato.save();
    res.status(201).json({ message: 'Relato salvo com sucesso!' });
  } catch (err) {
    console.error("❌ Erro ao salvar relato:", err);
    res.status(500).json({ error: 'Erro ao salvar.' });
  }
});

// Rota para listar relatos
app.get('/api/relatos', async (req, res) => {
  try {
    const relatos = await Relato.find().sort({ data_hora: -1 });
    res.json(relatos);
  } catch (err) {
    console.error("❌ Erro ao buscar relatos:", err);
    res.status(500).json({ error: 'Erro ao buscar relatos.' });
  }
});

// Iniciar servidor
app.listen(3000, () => console.log('🚀 API rodando na porta 3000'));
