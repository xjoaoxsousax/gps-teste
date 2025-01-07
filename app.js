let map;
let marker;

function initMap() {
    // Criando o mapa
    map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 13,
        center: { lat: 38.726, lng: -9.145 },
    });

    // Preencher o seletor com opções de linhas
    fetchLinhas();

    // Detectar mudanças no seletor de linha
    document.getElementById('linha').addEventListener('change', function () {
        const linhaId = this.value;
        if (linhaId) {
            fetchInformacoesLinha(linhaId);
            fetchEstimativasChegada(linhaId);
        }
    });
}

function fetchLinhas() {
    // Aqui você vai buscar as linhas na API (usando um endpoint como /lines)
    // Exemplo de dados fictícios
    const linhas = [
        { id: '1001', nome: 'Linha 1001 - Alfragide a Reboleira' },
        { id: '1002', nome: 'Linha 1002 - Belém a Cais do Sodré' },
    ];

    const selectElement = document.getElementById('linha');
    linhas.forEach(linha => {
        const option = document.createElement('option');
        option.value = linha.id;
        option.textContent = linha.nome;
        selectElement.appendChild(option);
    });
}

function fetchInformacoesLinha(linhaId) {
    // Aqui você vai buscar as informações da linha na API (usando um endpoint como /lines/:id)
    // Exemplo de dados fictícios
    const informacoes = {
        '1001': 'Informações da linha 1001: Alfragide a Reboleira.',
        '1002': 'Informações da linha 1002: Belém a Cais do Sodré.',
    };

    document.getElementById('informacoes').textContent = informacoes[linhaId] || 'Informações não disponíveis.';
}

function fetchEstimativasChegada(linhaId) {
    // Aqui você vai buscar as estimativas de chegada na API (usando um endpoint como /stops/:id/realtime)
    // Exemplo de dados fictícios
    const estimativas = [
        { horario: '08:56', destino: 'Freiria (E.B. 2-3)' },
        { horario: '09:00', destino: 'Reboleira (Estação)' },
    ];

    const lista = document.getElementById('estimativas-lista');
    lista.innerHTML = ''; // Limpar lista existente

    estimativas.forEach(estimativa => {
        const li = document.createElement('li');
        li.textContent = `Horário: ${estimativa.horario}, Destino: ${estimativa.destino}`;
        lista.appendChild(li);
    });
}
