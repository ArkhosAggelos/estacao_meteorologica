const urlTempoReal = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras?select=*&order=id.desc&limit=1";
const urlHora = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_hora?select=*&order=id.desc&limit=24";
const urlDia = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_dia?select=*&order=id.desc&limit=30";

const headers = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYXB0eG94eXJxeXFhb3JraXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDg3MjUsImV4cCI6MjA1OTUyNDcyNX0.EUqY36QI7ey3cVBAHZsG4x4oTSPP2Etyxc7xY4I7v-0",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYXB0eG94eXJxeXFhb3JraXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDg3MjUsImV4cCI6MjA1OTUyNDcyNX0.EUqY36QI7ey3cVBAHZsG4x4oTSPP2Etyxc7xY4I7v-0"
};

let chartHoraTemp = null;
let chartHoraUmidade = null;
let chartHoraPressao = null;
let chartHoraLux = null;

let chartDiaTemp = null;
let chartDiaUmidade = null;
let chartDiaPressao = null;
let chartDiaLux = null;

function mostrarAba(id) {
  document.querySelectorAll(".aba").forEach(div => div.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
  document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("ativo"));
  document.querySelector(`.tabs button[onclick="mostrarAba('${id}')"]`).classList.add("ativo");

  if (id === "hora") carregarGraficoHora();
  else if (id === "dia") carregarGraficoDia();
}

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

function carregarGraficoHora() {
  fetch(urlHora, { headers })
    .then(res => res.json())
    .then(data => {
      data.reverse(); // garantir ordem cronológica

      const labels = data.map(d => new Date(d.id).toLocaleTimeString("pt-BR", { hour: '2-digit' }));
      const temperatura = data.map(d => d.temperatura_avg);
      const umidade = data.map(d => d.umidade_avg);
      const pressao = data.map(d => d.pressao_avg);
      const lux = data.map(d => d.lux_avg);

      if (chartHoraTemp) chartHoraTemp.destroy();
      chartHoraTemp = new Chart(document.getElementById("grafico-hora-temperatura"), {
        type: "line",
        data: { labels, datasets: [{ label: "Temperatura (°C)", data: temperatura, borderColor: "blue", fill: false, tension: 0.3 }] },
        options: { responsive: true }
      });

      if (chartHoraUmidade) chartHoraUmidade.destroy();
      chartHoraUmidade = new Chart(document.getElementById("grafico-hora-umidade"), {
        type: "line",
        data: { labels, datasets: [{ label: "Umidade (%)", data: umidade, borderColor: "cyan", fill: false, tension: 0.3 }] },
        options: { responsive: true }
      });

      if (chartHoraPressao) chartHoraPressao.destroy();
      chartHoraPressao = new Chart(document.getElementById("grafico-hora-pressao"), {
        type: "line",
        data: { labels, datasets: [{ label: "Pressão (hPa)", data: pressao, borderColor: "gray", fill: false, tension: 0.3 }] },
        options: { responsive: true }
      });

      if (chartHoraLux) chartHoraLux.destroy();
      chartHoraLux = new Chart(document.getElementById("grafico-hora-lux"), {
        type: "line",
        data: { labels, datasets: [{ label: "Luminosidade (lx)", data: lux, borderColor: "orange", fill: false, tension: 0.3 }] },
        options: { responsive: true }
      });
    });
}

function carregarGraficoDia() {
  fetch(urlDia, { headers })
    .then(res => res.json())
    .then(data => {
      data.reverse(); // garantir ordem cronológica

      const labels = data.map(d => d.id.slice(0, 10));
      const temperatura = data.map(d => d.temperatura_avg);
      const umidade = data.map(d => d.umidade_avg);
      const pressao = data.map(d => d.pressao_avg);
      const lux = data.map(d => d.lux_avg);

      if (chartDiaTemp) chartDiaTemp.destroy();
      chartDiaTemp = new Chart(document.getElementById("grafico-dia-temperatura"), {
        type: "line",
        data: { labels, datasets: [{ label: "Temperatura (°C)", data: temperatura, borderColor: "blue", fill: false, tension: 0.3 }] },
        options: { responsive: true }
      });

      if (chartDiaUmidade) chartDiaUmidade.destroy();
      chartDiaUmidade = new Chart(document.getElementById("grafico-dia-umidade"), {
        type: "line",
        data: { labels, datasets: [{ label: "Umidade (%)", data: umidade, borderColor: "cyan", fill: false, tension: 0.3 }] },
        options: { responsive: true }
      });

      if (chartDiaPressao) chartDiaPressao.destroy();
      chartDiaPressao = new Chart(document.getElementById("grafico-dia-pressao"), {
        type: "line",
        data: { labels, datasets: [{ label: "Pressão (hPa)", data: pressao, borderColor: "gray", fill: false, tension: 0.3 }] },
        options: { responsive: true }
      });

      if (chartDiaLux) chartDiaLux.destroy();
      chartDiaLux = new Chart(document.getElementById("grafico-dia-lux"), {
        type: "line",
        data: { labels, datasets: [{ label: "Luminosidade (lx)", data: lux, borderColor: "orange", fill: false, tension: 0.3 }] },
        options: { responsive: true }
      });
    });
}

carregarTempoReal();
setInterval(carregarTempoReal, 300000);