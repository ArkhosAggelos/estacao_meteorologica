const urlTempoReal = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras?select=*&order=id.desc&limit=1";
const urlHora = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_hora?select=*&order=id.asc&limit=24";
const urlDia = "https://ajaptxoxyrqyqaorkisl.supabase.co/rest/v1/leituras_dia?select=*&order=id.asc&limit=30";
const headers = {
  apikey: "your-api-key",
  Authorization: "Bearer your-api-key",
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
      const el = document.getElementById("dados-tempo-real");
      if (data.length > 0) {
        const d = data[0];
        el.innerHTML = `<div class="card-grid">
          <div class="card"><p><span class="card-icon">🌡️</span><strong>${d.temperatura} °C</strong></p></div>
          <div class="card"><p><span class="card-icon">💧</span><strong>${d.umidade} %</strong></p></div>
          <div class="card"><p><span class="card-icon">🌀</span><strong>${d.pressao} hPa</strong></p></div>
          <div class="card"><p><span class="card-icon">💡</span><strong>${d.lux} lx</strong></p></div>
          <div class="card"><p><span class="card-icon">🌤️</span><strong>${d.previsao}</strong></p></div>
          <div class="card"><p><span class="card-icon">🕒</span>${new Date(d.id).toLocaleString("pt-BR")}</p></div>
        </div>`;
      } else {
        el.innerHTML = "<p class='sem-dados'>Sem dados disponíveis</p>";
      }
    });
}
carregarTempoReal();
setInterval(carregarTempoReal, 300000);