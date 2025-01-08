let map;

function initMap() {
    // Inicializa o mapa centralizado em Lisboa
    const mapOptions = {
        center: { lat: 38.7223, lng: -9.1393 }, // Coordenadas de Lisboa
        zoom: 12,
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Evento de clique no botão Buscar
    document.getElementById('buscar').addEventListener('click', () => {
        const linha = document.getElementById('linha').value;
        if (linha) {
            getRouteData(linha);
        } else {
            showAlert('Por favor, selecione uma linha!', 'error');
        }
    });
}

// Função para buscar e desenhar a rota no mapa a partir da API TransitLand
function getRouteData(linha) {
    const apiUrl = `https://api.transit.land/api/v1/routes/r-eyck-1726?feedOnestopId=f-carris~metropolitana~pt&feedVersionSha1=bf8201ed7032c6d00ce3fce02700e1dad87aa01c&entityId=1726_0`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                // Vamos imaginar que você tem uma lista de coordenadas de paradas
                const coordinates = route.geometry; // Suponha que geometry seja uma lista de coordenadas
                
                drawRoute(coordinates);
                showAlert(`Rota da Linha ${linha} carregada com sucesso!`, 'success');
            } else {
                showAlert('Erro ao carregar a rota, tente novamente!', 'error');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
            showAlert('Erro ao carregar a rota, tente novamente!', 'error');
        });
}

// Função para desenhar a linha no mapa
function drawRoute(rota) {
    const routePath = new google.maps.Polyline({
        path: rota,
        geodesic: true,
        strokeColor: "#FF0000", // Cor da linha
        strokeOpacity: 1.0,
        strokeWeight: 3,
    });
    routePath.setMap(map);
}

// Função para mostrar alertas
function showAlert(message, type) {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    setTimeout(() => {
        alertBox.textContent = '';
        alertBox.className = 'alert';
    }, 3000);
}
