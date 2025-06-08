const lista = document.getElementById('listaRelatos');

fetch('http://localhost:3000/api/relatos')
  .then(res => res.json())
  .then(relatos => {
    if (relatos.length === 0) {
      lista.innerHTML = '<p>Nenhum relato encontrado.</p>';
      return;
    }

    relatos.forEach(relato => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <h3>📧 ${relato.usuarioId}</h3>
        <p><strong>Relato:</strong> ${relato.relato}</p>
        <p><strong>Imagem:</strong> ${relato.imagem?.nome || 'Sem imagem'}</p>
        <p><strong>Localização:</strong> Lat: ${relato.localizacao?.latitude} / Long: ${relato.localizacao?.longitude}</p>
        <p><strong>Data/Hora:</strong> ${new Date(relato.data_hora).toLocaleString()}</p>
        <hr>
      `;
      lista.appendChild(div);
    });
  })
  .catch(err => {
    console.error(err);
    lista.innerHTML = '<p>Erro ao carregar relatos.</p>';
  });
