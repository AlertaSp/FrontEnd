const form = document.getElementById('formRelato');
const resposta = document.getElementById('resposta');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const relato = document.getElementById('relato').value;
  const imagemInput = document.getElementById('imagem');
  const endereco = document.getElementById('endereco').value;

  // Captura de dados da imagem (apenas visual)
  const imagemSelecionada = imagemInput.files[0];
  const imagemNome = imagemSelecionada?.name || "sem_imagem.jpg";
  const imagemTipo = imagemSelecionada?.type || "image/jpeg";
  const imagemTamanho = imagemSelecionada?.size ? Math.round(imagemSelecionada.size / 1024) : 0;

  // Geocodificação do endereço (OpenStreetMap)
  const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`)
    .then(res => res.json());

  if (!geo[0]) {
    resposta.textContent = 'Endereço não encontrado. Tente ser mais específico.';
    return;
  }

  const latitude = parseFloat(geo[0].lat);
  const longitude = parseFloat(geo[0].lon);

  const data = {
    usuarioId: email,
    relato,
    imagem: {
      nome: imagemNome,
      tipo: imagemTipo,
      tamanho_kb: imagemTamanho
    },
    localizacao: { latitude, longitude },
    data_hora: new Date(),
    tags: ["alagamento", "comunidade"],
    visualizado: false
  };

  try {
    const response = await fetch('http://localhost:3000/api/relato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    resposta.textContent = result.message || result.error;
    form.reset();
  } catch (err) {
    resposta.textContent = 'Erro ao enviar o relato.';
    console.error(err);
  }
});
