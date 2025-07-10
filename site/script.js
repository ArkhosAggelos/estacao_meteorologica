
const urlTempoReal = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras?select=*&order=id.desc&limit=1";
const urlHora = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_hora?select=*&order=id.asc&limit=24";
const urlDia = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_dia?select=*&order=id.asc&limit=30";

const headers = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYXB0eG94eXJxeXFhb3JraXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDg3MjUsImV4cCI6MjA1OTUyNDcyNX0.EUqY36QI7ey3cVBAHZsG4x4oTSPP2Etyxc7xY4I7v-0",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
};

function mostrarAba(id) {
  document.querySelectorAll(".aba").forEach(div => div.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
  document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("ativo"));
  document.querySelector(`.tabs button[onclick="mostrarAba('${id}')"]`).classList.add("ativo");
}

function carregarTempoReal() {
  fetch(urlTempoReal, { headers })
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const d = data[0];
        document.getElementById("dados-tempo-real").innerHTML = `
          <div class="card"><p><span class="card-icon">🌡️</span><strong>${d.temperatura} °C</strong></p></div>
          <div class="card"><p><span class="card-icon">💧</span><strong>${d.umidade} %</strong></p></div>
          <div class="card"><p><span class="card-icon">🌀</span><strong>${d.pressao} hPa</strong></p></div>
          <div class="card"><p><span class="card-icon">💡</span><strong>${d.lux} lx</strong></p></div>
          <div class="card"><p><span class="card-icon">🌤️</span><strong>${d.previsao}</strong></p></div>
          <div class="card"><p><span class="card-icon">🕒</span>${new Date(d.id).toLocaleString("pt-BR")}</p></div>
        `;
      }
    });
}

function renderizarGrafico(id, labels, dados, legenda, cor) {
  new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: legenda,
        data: dados,
        borderColor: cor,
        backgroundColor: cor,
        fill: false,
        tension: 0.3
      }]
    },
    options: { responsive: true }
  });
}

function carregarGraficoHora() {
  fetch(urlHora, { headers })
    .then(res => res.json())
    .then(data => {
      const labels = data.map(d => new Date(d.id).toLocaleTimeString("pt-BR", { hour: '2-digit' }));
      renderizarGrafico("grafico-hora-temp", labels, data.map(d => d.temperatura_avg), "Temperatura (°C)", "blue");
      renderizarGrafico("grafico-hora-umidade", labels, data.map(d => d.umidade_avg), "Umidade (%)", "cyan");
      renderizarGrafico("grafico-hora-pressao", labels, data.map(d => d.pressao_avg), "Pressão (hPa)", "gray");
      renderizarGrafico("grafico-hora-lux", labels, data.map(d => d.lux_avg), "Luminosidade (lx)", "orange");
    });
}

function carregarGraficoDia() {
  fetch(urlDia, { headers })
    .then(res => res.json())
    .then(data => {
      const labels = data.map(d => new Date(d.id).toLocaleDateString("pt-BR"));
      renderizarGrafico("grafico-dia-temp", labels, data.map(d => d.temperatura_avg), "Temperatura (°C)", "blue");
      renderizarGrafico("grafico-dia-umidade", labels, data.map(d => d.umidade_avg), "Umidade (%)", "cyan");
      renderizarGrafico("grafico-dia-pressao", labels, data.map(d => d.pressao_avg), "Pressão (hPa)", "gray");
      renderizarGrafico("grafico-dia-lux", labels, data.map(d => d.lux_avg), "Luminosidade (lx)", "orange");
    });
}

carregarTempoReal();
carregarGraficoHora();
carregarGraficoDia();
setInterval(carregarTempoReal, 300000);
