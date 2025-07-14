// script.js atualizado com filtros dinâmicos para as últimas 24h e últimos 30 dias

const agora = new Date();
const dataHoraLimite = new Date(agora.getTime() - 24 * 60 * 60 * 1000);
const dataDiaLimite = new Date(agora);
dataDiaLimite.setDate(dataDiaLimite.getDate() - 1);

const dataHoraISO = dataHoraLimite.toISOString();
const dataDiaISO = dataDiaLimite.toISOString().split("T")[0];

const urlTempoReal = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras?select=*&order=id.desc&limit=1";
const urlHora = `https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_hora?select=*&id=gte.${dataHoraISO}&order=id.asc`;
const urlDia = `https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_dia?select=*&id=lte.${dataDiaISO}&order=id.asc`;

const headers = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYXB0eG94eXJxeXFhb3JraXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDg3MjUsImV4cCI6MjA1OTUyNDcyNX0.EUqY36QI7ey3cVBAHZsG4x4oTSPP2Etyxc7xY4I7v-0",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYXB0eG94eXJxeXFhb3JraXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDg3MjUsImV4cCI6MjA1OTUyNDcyNX0.EUqY36QI7ey3cVBAHZsG4x4oTSPP2Etyxc7xY4I7v-0",
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
          <div class="card-grid">
            <div class="card"><p><span class="card-icon">🌡️</span><strong>${d.temperatura} °C</strong></p></div>
            <div class="card"><p><span class="card-icon">💧</span><strong>${d.umidade} %</strong></p></div>
            <div class="card"><p><span class="card-icon">🌀</span><strong>${d.pressao} hPa</strong></p></div>
            <div class="card"><p><span class="card-icon">💡</span><strong>${d.lux} lx</strong></p></div>
            <div class="card"><p><span class="card-icon">🌤️</span><strong>${d.previsao}</strong></p></div>
            <div class="card"><p><span class="card-icon">🕒</span>${new Date(d.id).toLocaleString("pt-BR")}</p></div>
          </div>
        `;
      }
    });
}

function carregarGraficoHora() {
  fetch(urlHora, { headers })
    .then(res => res.json())
    .then(data => {
      const labels = data.map(d => new Date(d.id).toLocaleTimeString("pt-BR", { hour: '2-digit' }));
      const temperatura = data.map(d => d.temperatura_avg);
      const umidade = data.map(d => d.umidade_avg);
      const pressao = data.map(d => d.pressao_avg);
      const lux = data.map(d => d.lux_avg);

      new Chart(document.getElementById("grafico-hora-temp"), {
        type: "line",
        data: { labels, datasets: [{ label: "Temperatura (°C)", data: temperatura, borderColor: "blue", fill: false }] },
        options: { responsive: true }
      });

      new Chart(document.getElementById("grafico-hora-umidade"), {
        type: "line",
        data: { labels, datasets: [{ label: "Umidade (%)", data: umidade, borderColor: "cyan", fill: false }] },
        options: { responsive: true }
      });

      new Chart(document.getElementById("grafico-hora-pressao"), {
        type: "line",
        data: { labels, datasets: [{ label: "Pressão (hPa)", data: pressao, borderColor: "gray", fill: false }] },
        options: { responsive: true }
      });

      new Chart(document.getElementById("grafico-hora-lux"), {
        type: "line",
        data: { labels, datasets: [{ label: "Luminosidade (lx)", data: lux, borderColor: "orange", fill: false }] },
        options: { responsive: true }
      });
    });
}

function carregarGraficoDia() {
  fetch(urlDia, { headers })
    .then(res => res.json())
    .then(data => {
      const labels = data.map(d => new Date(d.id).toLocaleDateString("pt-BR"));
      const temperatura = data.map(d => d.temperatura_avg);
      const umidade = data.map(d => d.umidade_avg);
      const pressao = data.map(d => d.pressao_avg);
      const lux = data.map(d => d.lux_avg);

      new Chart(document.getElementById("grafico-dia"), {
        type: "line",
        data: {
          labels,
          datasets: [
            { label: "Temperatura (°C)", data: temperatura, borderColor: "blue", fill: false },
            { label: "Umidade (%)", data: umidade, borderColor: "cyan", fill: false },
            { label: "Pressão (hPa)", data: pressao, borderColor: "gray", fill: false },
            { label: "Luminosidade (lx)", data: lux, borderColor: "orange", fill: false },
          ]
        },
        options: { responsive: true }
      });
    });
}

carregarTempoReal();
carregarGraficoHora();
carregarGraficoDia();

setInterval(() => {
  carregarTempoReal();
  carregarGraficoHora();
  carregarGraficoDia();
}, 300000);
