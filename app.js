// Inicializa o mapa
function initMap() {
    // Define o ponto inicial do mapa (coordenadas de Lisboa)
    const mapOptions = {
        center: { lat: 38.7223, lng: -9.1393 },
        zoom: 12,
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Define o comportamento do botão de busca
    const buscarBtn = document.getElementById('buscar');
    buscarBtn.addEventListener('click', () => {
        const linha = document.getElementById('linha').value;
        if (linha) {
            getRouteData(linha, map);
        } else {
            showAlert('Por favor, selecione uma linha!', 'error');
        }
    });
}

// Função para obter os dados de uma rota (mocked example)
function getRouteData(linha, map) {
    // Exemplo de dados mockados para rotas (substitua isso com dados reais)
    const rotas = {
        "1001": [
            { lat: 38.7350, lng: -9.1400 },
            { lat: 38.7400, lng: -9.1450 },
            { lat: 38.7450, lng: -9.1500 },
        ],
        "1002": [
            { lat: 38.7300, lng: -9.1350 },
            { lat: 38.7350, lng: -9.1400 },
            { lat: 38.7400, lng: -9.1450 },
        ],
        "1003": [
            { lat: 38.7250, lng: -9.1300 },
            { lat: 38.7300, lng: -9.1350 },
            { lat: 38.7350, lng: -9.1400 },
        ]
    };

    const rota = rotas[linha];
    if (rota) {
        drawRoute(rota, map);
        showAlert(`Rota da Linha ${linha} carregada com sucesso!`, 'success');
    } else {
        showAlert('Erro ao carregar a rota, tente novamente!', 'error');
    }
}

// Função para desenhar a rota no mapa
function drawRoute(rota, map) {
    const routePath = new google.maps.Polyline({
        path: rota,
        geodesic: true,
        strokeColor: "#FF0000",  // Cor da linha
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    routePath.setMap(map);
}

// Função para exibir alertas
function showAlert(message, type) {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    setTimeout(() => {
        alertBox.textContent = '';
        alertBox.className = 'alert';
    }, 3000);
}
