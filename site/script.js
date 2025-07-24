// URLs de acesso ao Supabase
const urlTempoReal = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras?select=*&order=id.desc&limit=1";
const urlUltimasLeituras = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras?select=*&order=id.desc&limit=12";
const urlHora = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_hora?select=*&order=id.desc&limit=24";
const urlDia = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_dia?select=*&order=id.desc&limit=30";

// Cabeçalhos de autenticação Supabase
const headers = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYXB0eG94eXJxeXFhb3JraXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDg3MjUsImV4cCI6MjA1OTUyNDcyNX0.EUqY36QI7ey3cVBAHZsG4x4oTSPP2Etyxc7xY4I7v-0",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYXB0eG94eXJxeXFhb3JraXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDg3MjUsImV4cCI6MjA1OTUyNDcyNX0.EUqY36QI7ey3cVBAHZsG4x4oTSPP2Etyxc7xY4I7v-0"
};

// Gráficos globais
let chartHoraTemp = null, chartHoraUmidade = null, chartHoraPressao = null, chartHoraLux = null;
let chartDiaTemp = null, chartDiaUmidade = null, chartDiaPressao = null, chartDiaLux = null;
let chartTempReal = null, chartUmidReal = null, chartLuxReal = null;

// Controle de abas
function mostrarAba(id) {
  document.querySelectorAll(".aba").forEach(div => div.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
  document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("ativo"));
  document.querySelector(`.tabs button[onclick="mostrarAba('${id}')"]`).classList.add("ativo");

  if (id === "tempo-real") {
    carregarTempoReal();
    carregarGraficosTempoReal();
  }
  else if (id === "hora") carregarGraficoHora();
  else if (id === "dia") carregarGraficoDia();
}

// Cartões com a última leitura
function carregarTempoReal() {
  fetch(urlTempoReal, { headers })
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const d = data[0];
        document.getElementById("dados-tempo-real").innerHTML = `
          <div class="card-grid">
            <div class="card"><p><span class="card-icon">&#127777;</span><strong>${d.temperatura} °C</strong></p></div>
            <div class="card"><p><span class="card-icon">&#128167;</span><strong>${d.umidade} %</strong></p></div>
            <div class="card"><p><span class="card-icon">&#127744;</span><strong>${d.pressao} hPa</strong></p></div>
            <div class="card"><p><span class="card-icon">&#128161;</span><strong>${d.lux} lx</strong></p></div>
            <div class="card"><p><span class="card-icon">&#127781;</span><strong>${d.previsao}</strong></p></div>
            <div class="card"><p><span class="card-icon">&#128339;</span><strong>${new Date(d.id).toLocaleString("pt-BR")}</strong></p></div>
          </div>`;
      }
    });
}

// Gráficos dos últimos 12 registros reais
function carregarGraficosTempoReal() {
  fetch(urlUltimasLeituras, { headers })
    .then(res => res.json())
    .then(data => {
      const dados = data.reverse();
      const labels = dados.map(d => new Date(d.id).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }));
      const temperatura = dados.map(d => d.temperatura);
      const umidade = dados.map(d => d.umidade);
      const lux = dados.map(d => d.lux);

      if (chartTempReal) chartTempReal.destroy();
      chartTempReal = new Chart(document.getElementById("grafico-temp-real"), {
        type: "line",
        data: { labels, datasets: [{ label: "Temperatura (°C)", data: temperatura, borderColor: "blue", backgroundColor: "rgba(0,0,255,0.1)", fill: true, tension: 0.3 }] },
        options: { responsive: true }
      });

      if (chartUmidReal) chartUmidReal.destroy();
      chartUmidReal = new Chart(document.getElementById("grafico-umid-real"), {
        type: "line",
        data: { labels, datasets: [{ label: "Umidade (%)", data: umidade, borderColor: "cyan", backgroundColor: "rgba(0,255,255,0.1)", fill: true, tension: 0.3 }] },
        options: { responsive: true }
      });

      if (chartLuxReal) chartLuxReal.destroy();
      chartLuxReal = new Chart(document.getElementById("grafico-lux-real"), {
        type: "line",
        data: { labels, datasets: [{ label: "Luminosidade (lx)", data: lux, borderColor: "orange", backgroundColor: "rgba(255,165,0,0.1)", fill: true, tension: 0.3 }] },
        options: { responsive: true }
      });
    });
}

// Inicializa carregamento
carregarTempoReal();
carregarGraficosTempoReal();
setInterval(() => {
  carregarTempoReal();
  carregarGraficosTempoReal();
}, 300000);
