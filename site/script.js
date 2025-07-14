function mensagemSemDados(msg, idCanvas) {
  const canvas = document.getElementById(idCanvas);
  if (canvas) {
    canvas.style.display = "none";
    let msgElem = canvas.parentElement.querySelector('.sem-dados');
    if (!msgElem) {
      msgElem = document.createElement('p');
      msgElem.className = 'sem-dados';
      canvas.parentElement.appendChild(msgElem);
    }
    msgElem.textContent = msg;
  }
}

function limparMensagemSemDados(idCanvas) {
  const canvas = document.getElementById(idCanvas);
  if (canvas) {
    canvas.style.display = '';
    const msgElem = canvas.parentElement.querySelector('.sem-dados');
    if (msgElem) msgElem.remove();
  }
}

// ajustar carregarTempoReal para limpar mensagem
function carregarTempoReal() {
  fetch(urlTempoReal, { headers })
    .then(res => res.json())
    .then(data => {
      const el = document.getElementById("dados-tempo-real");
      if (data.length > 0) {
        el.innerHTML = `
          <div class="card-grid">
            <div class="card"><p><span class="card-icon">🌡️</span><strong>${data[0].temperatura} °C</strong></p></div>
            <div class="card"><p><span class="card-icon">💧</span><strong>${data[0].umidade} %</strong></p></div>
            <div class="card"><p><span class="card-icon">🌀</span><strong>${data[0].pressao} hPa</strong></p></div>
            <div class="card"><p><span class="card-icon">💡</span><strong>${data[0].lux} lx</strong></p></div>
            <div class="card"><p><span class="card-icon">🌤️</span><strong>${data[0].previsao}</strong></p></div>
            <div class="card"><p><span class="card-icon">🕒</span>${new Date(data[0].id).toLocaleString("pt-BR")}</p></div>
          </div>
        `;
      } else {
        el.innerHTML = `<p class="sem-dados">Sem dados disponíveis no momento.</p>`;
      }
    });
}

// Gráficos de hora
function carregarGraficoHora() {
  fetch(urlHora, { headers })
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        mensagemSemDados("Sem dados disponíveis para as últimas 24h.", "grafico-hora-temp");
        mensagemSemDados("Sem dados disponíveis para as últimas 24h.", "grafico-hora-umidade");
        mensagemSemDados("Sem dados disponíveis para as últimas 24h.", "grafico-hora-pressao");
        mensagemSemDados("Sem dados disponíveis para as últimas 24h.", "grafico-hora-lux");
        return;
      }
      // Se há dados, limpa mensagem e mostra canvas
      limparMensagemSemDados("grafico-hora-temp");
      limparMensagemSemDados("grafico-hora-umidade");
      limparMensagemSemDados("grafico-hora-pressao");
      limparMensagemSemDados("grafico-hora-lux");

      const labels = data.map(d => new Date(d.id).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }));
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

// Gráfico diário
function carregarGraficoDia() {
  fetch(urlDia, { headers })
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        mensagemSemDados("Sem dados disponíveis para os últimos 30 dias.", "grafico-dia");
        return;
      }
      limparMensagemSemDados("grafico-dia");

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