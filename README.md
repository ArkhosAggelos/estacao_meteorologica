# 🌦️ Estação Meteorológica IoT

Este projeto exibe dados meteorológicos em tempo real, armazenados em um banco de dados PostgreSQL (Railway) e visualizados em uma página web hospedada no [Vercel](https://vercel.com).

## 📌 Funcionalidades

- Exibição dos dados meteorológicos mais recentes (temperatura, umidade, pressão, luminosidade).
- Interface moderna com TailwindCSS.
- Backend leve com Node.js (funções serverless via Vercel).
- Integração com banco PostgreSQL hospedado no Railway.
- Atualizações em tempo real (frontend consome os endpoints da API).

---

## 🗂 Estrutura do Projeto

```
estacao_meteorologica/
├── api/
│   └── hoje.js         # Endpoint para leitura mais recente
├── public/
│   └── index.html      # Página principal com layout Tailwind
├── package.json        # Dependências do Node.js
├── .env                # Variáveis de ambiente (não versionar)
└── vercel.json         # Configuração de rotas no Vercel
```

---

## 🚀 Deploy via Vercel

### 1. Configuração

Antes do deploy, crie um arquivo `.env` com a seguinte variável:

```env
PG_URL=postgresql://usuario:senha@host:porta/banco
```

### 2. Deploy

- Conecte seu repositório ao [Vercel](https://vercel.com).
- Configure a variável de ambiente `PG_URL` no painel do projeto.
- O Vercel detectará automaticamente a estrutura e realizará o deploy.

---

## 💻 Rodando localmente

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/estacao_meteorologica.git
cd estacao_meteorologica
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` e adicione sua URL do banco PostgreSQL.

4. Execute localmente com Vercel CLI:

```bash
vercel dev
```

---

## 🔧 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Vercel](https://vercel.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [PostgreSQL (Railway)](https://railway.app/)
- HTML, JavaScript

---

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
