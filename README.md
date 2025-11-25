# Trio Bit Garage - Sistema de Gestão de Concessionária

Projeto desenvolvido para a disciplina de Engenharia de Software. Este sistema visa otimizar e modernizar a gestão de aluguel e o controle de estoque de veículos da concessionária "Trio Bit Garage".

## Índice

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [A Dor do Cliente](#a-dor-do-cliente)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Equipe](#equipe)

## Visão Geral do Projeto

O "Trio Bit Garage" é um sistema web completo para a gestão de concessionárias de veículos. Ele oferece uma plataforma centralizada para administrar o catálogo de carros, gerenciar vendas (aluguel de veículos), acompanhar o funil de clientes e automatizar processos que, atualmente, são manuais, reduzindo a chance de erros e aumentando a eficiência da equipe.

---

## A Dor do Cliente

A concessionária "Trio Bit Garage" enfrenta desafios operacionais que impactam diretamente sua lucratividade e a satisfação do cliente. O controle de estoque é realizado de forma manual, através de planilhas complexas e suscetíveis a erros humanos, o que frequentemente resulta em informações de disponibilidade de veículos desatualizadas.

Além disso, o processo de vendas é descentralizado. Cada vendedor utiliza métodos próprios para registrar interações com clientes, tornando o acompanhamento de propostas e o histórico de negociações uma tarefa árdua e ineficiente. Essa falta de um sistema unificado gera perda de oportunidades de negócio e dificulta a criação de relatórios gerenciais precisos para a tomada de decisões estratégicas. O sistema proposto visa solucionar essas dores, centralizando a informação e automatizando os processos-chave da empresa.

---

## Tecnologias Utilizadas

Para a construção deste projeto, foram selecionadas tecnologias modernas e robustas, visando garantir escalabilidade, segurança e uma ótima experiência de usuário.

### Frontend

| Tecnologia                                                                                                        | Versão   | Descrição                                                         |
| :---------------------------------------------------------------------------------------------------------------- | :------- | :---------------------------------------------------------------- |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)                | `5`      | Linguagem de marcação para a estrutura das páginas.               |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)                   | `3`      | Folhas de estilo para o design e a responsividade.                |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) | `ES2025` | Linguagem de programação para interatividade do lado do cliente.  |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)               | `19.x`   | Biblioteca JavaScript para a construção de interfaces de usuário. |
| ![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)          | `3.x`    | Framework progressivo para a construção de interfaces de usuário. |

### Backend

| Tecnologia                                                                                                        | Versão     | Descrição                                                      |
| :---------------------------------------------------------------------------------------------------------------- | :--------- | :------------------------------------------------------------- |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) | `21 (LTS)` | Linguagem de programação para o desenvolvimento do servidor.   |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)        | `20.x`     | Framework para simplificar a criação de aplicações JavaScript. |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)                | `8.x`      | Sistema de Gerenciamento de Banco de Dados Relacional.         |

---

## Estrutura de pastas do projeto

```bash

├── app/                   # Código principal da aplicação
│    ├── backend/          # Aplicação backend (Node.js, Mysql, etc.)
│    └── frontend/         # Aplicação frontend (React, Vue, etc.)
├── docs/                  # Documentação do projeto para disciplina
└── README.md
```

## Como Executar o Projeto

Siga as instruções abaixo para configurar e executar o ambiente de desenvolvimento.

### Pré-requisitos

- Node.js v20 ou superior
- Um gerenciador de pacotes (npm ou yarn)
- MySQL 8

### 1. Clonar o Repositório

```bash
git clone [https://github.com/guilirio/Projeto-ES.git](https://github.com/guilirio/Projeto-ES.git)
cd trio-bit-garage
```

### 2. Rodar o Back-End

- Comandos a serem dados no terminal ( na ordem ):

```bash
# Navegue até a pasta do backend
cd backend
```

```bash
# Instale as dependências
npm install
```

```bash
# Execute a aplicação
npm run dev
```

### ⚠️ Atenção:

- Para rodar o projeto Backend deve haver um arquivo chamado `.env` dentro da pasta `/backend` com as seguintes variáveis de ambiente:

| Variável   | Descrição                              | Valor              |
| :--------- | :------------------------------------- | :----------------- |
| PORT       | Porta em que o servidor estará rodando | 3333               |
| DB_HOST    | Host do servidos                       | localhost          |
| DB_USER    | Nome de usuário do banco de dados      | root               |
| DB_PASS    | Senha do seu banco de dados            | ( sua senha )      |
| DB_NAME    | Nome do banco de dados                 | trio_bit_garage_db |
| DB_DIALECT | -                                      | mysql              |

#### Exemplo do meu arquivo `.env`:

```javascript
// Você deve modificar alguns valores para o seu caso pessoal (ex: sua senha do banco de dados)

PORT = 3333;
DB_HOST = localhost;
DB_USER = root;
DB_PASS = 10203040;
DB_NAME = trio_bit_garage_db;
DB_DIALECT = mysql;
```

### ⚠️ Atenção:

- Para rodar o projeto backend é necessário que o banco de dados já esteja criado na sua máquina, para isso, rode o script (disponível em `backend/database`) em algum editor sql para criar o banco de dados.

#### Popular registros no banco de dados

```bash
# Esse comando irá popular o banco de dados com vários registros

npm run seed
```

### 3. Configurar o Front-End

```bash
# Navegue até a pasta do frontend
cd ../frontend

# Instale as dependências
npm install

# Execute a aplicação
npm start
```

---

## Equipe

| Nome do Integrante      | Matrícula | GitHub                                       |
| :---------------------- | :-------- | :------------------------------------------- |
| Guilherme Lirio Miranda | 202410367 | [@guilirio](https://github.com/guilirio)     |
| Fábio Damas Valim       | 202410372 | [@fabiovalim](https://github.com/fabiovalim) |
| Caio Finnochio Martins  | 202410377 | [@caiobfm](https://github.com/caiobfm)       |
