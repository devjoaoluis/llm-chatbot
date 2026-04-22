# 🤖 LLM Chatbot

![Svelte](https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Um chatbot moderno, rápido e responsivo construído com **SvelteKit**, **Tailwind CSS v4** e o **Vercel AI SDK**. Este projeto foi projetado para oferecer uma interface de conversação fluida, com suporte nativo a múltiplos provedores de Inteligência Artificial, renderização de Markdown e componentes estilizados de alta performance.

---

##  Funcionalidades

- **Streaming em Tempo Real:** Respostas geradas e exibidas instantaneamente na tela, sem tempo de espera, utilizando o `@ai-sdk/svelte`.
- **Múltiplos Provedores LLM:**
  - ☁️ Suporte a modelos na nuvem via **OpenAI** (GPT-4o, GPT-4-turbo, etc).
  - 🖥️ Suporte a modelos locais, gratuitos e privados via **Ollama** (Llama 3, Mistral, Gemma, etc).
- **Suporte Avançado a Rich Text:** O chat compreende e renderiza Markdown de forma elegante. Textos, códigos e listas são estilizados através das bibliotecas `marked`, `mdsvex` e `@tailwindcss/typography`.
- **Design Moderno e Responsivo:** UI flexível e minimalista desenvolvida com a nova engine do Tailwind CSS v4.
- **Desenvolvimento Otimizado:** Tipagem estática com TypeScript, linting severo com ESLint e formatação consistente via Prettier.

---

## 🛠️ Stack Tecnológica

* **Framework:** Svelte 5 + SvelteKit
* **Estilização:** Tailwind CSS v4 + Tailwind Typography
* **IA & Integrações:** * `ai` (Vercel AI SDK)
  * `@ai-sdk/openai`
  * `ollama-ai-provider`
* **Processamento de Texto:** `marked`, `mdsvex`
* **Build & Ferramentas:** Vite, TypeScript, ESLint, Prettier

---

## ⚙️ Pré-requisitos

Antes de começar, garanta que seu ambiente possui as seguintes ferramentas:

* **Node.js**: Versão 22 ou superior recomendada.
* **Gerenciador de Pacotes**: `npm`, `yarn` ou `pnpm`.
* **Ollama (Opcional)**: Necessário apenas se você desejar rodar os modelos localmente. [Baixe aqui](https://ollama.com/).

---

## 🚀 Como rodar o projeto localmente

**1. Clone o repositório:**
```bash
git clone https://github.com/devjoaoluis/llm-chatbot.git
cd llm-chatbot
```
**2. Instale as dependências:**

```bash
npm install
```
**3. Configure as Variáveis de Ambiente:**

Crie um arquivo .env na raiz do projeto copiando a estrutura base.
Preencha de acordo com os provedores de IA que você vai utilizar:

```bash
# Necessário caso deseje utilizar os modelos da OpenAI
OPENAI_API_KEY="sk-sua_chave_de_api_aqui"

# Necessário caso deseje utilizar modelos locais via Ollama (URL padrão)
OLLAMA_BASE_URL="[http://127.0.0.1:11434/api](http://127.0.0.1:11434/api)"
```

**4. Inicie o Servidor de Desenvolvimento:**

```bash
npm run dev
```

Abra o seu navegador e acesse http://localhost:5173 para iniciar sua interação com a LLM.