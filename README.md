# Trio Bit Garage - Sistema de Gestão de Concessionária

Projeto desenvolvido para a disciplina de Engenharia de Software. Este sistema visa otimizar e modernizar a gestão de vendas e o controle de estoque de veículos da concessionária "Trio Bit Garage".

## Índice

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [A Dor do Cliente](#a-dor-do-cliente)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Equipe](#equipe)

## Visão Geral do Projeto

O "Trio Bit Garage" é um sistema web completo para a gestão de concessionárias de veículos. Ele oferece uma plataforma centralizada para administrar o catálogo de carros, gerenciar vendas, acompanhar o funil de clientes e automatizar processos que atualmente são manuais, reduzindo a chance de erros e aumentando a eficiência da equipe.

---

## A Dor do Cliente

A concessionária "Trio Bit Garage" enfrenta desafios operacionais que impactam diretamente sua lucratividade e a satisfação do cliente. O controle de estoque é realizado de forma manual, através de planilhas complexas e suscetíveis a erros humanos, o que frequentemente resulta em informações de disponibilidade de veículos desatualizadas.

Além disso, o processo de vendas é descentralizado. Cada vendedor utiliza métodos próprios para registrar interações com clientes, tornando o acompanhamento de propostas e o histórico de negociações uma tarefa árdua e ineficiente. Essa falta de um sistema unificado gera perda de oportunidades de negócio e dificulta a criação de relatórios gerenciais precisos para a tomada de decisões estratégicas. O sistema proposto visa solucionar essas dores, centralizando a informação e automatizando os processos-chave da empresa.

---

## Tecnologias Utilizadas

Para a construção deste projeto, foram selecionadas tecnologias modernas e robustas, visando garantir escalabilidade, segurança e uma ótima experiência de usuário.

### Frontend

| Tecnologia | Versão | Descrição |
| :--- | :--- | :--- |
| **HTML5** | `5` | Linguagem de marcação para a estrutura das páginas. |
| **CSS3** | `3` | Folhas de estilo para o design e a responsividade. |
| **JavaScript**| `ES2025` | Linguagem de programação para interatividade do lado do cliente.|
| **React** | `19.x` | Biblioteca JavaScript para a construção de interfaces de usuário. |
| **Vue.js** | `3.x` | Framework progressivo para a construção de interfaces de usuário. |

### Backend

| Tecnologia | Versão | Descrição |
| :--- | :--- | :--- |
| **JavaScript** | `21 (LTS)` | Linguagem de programação para o desenvolvimento do servidor. |
| **Node.js**| `3.x` | Framework para simplificar a criação de aplicações JavaScript. |
| **MySQL** | `8.x` | Sistema de Gerenciamento de Banco de Dados Relacional. |

---

## Funcionalidades

O sistema contará com as seguintes funcionalidades principais:

- **Módulo de Estoque:**
  - [ ] Cadastro, edição e remoção de veículos.
  - [ ] Consulta detalhada de veículos com filtros (marca, modelo, ano, etc.).
  - [ ] Controle de status (disponível, vendido, em manutenção).

- **Módulo de Vendas:**
  - [ ] Registro de propostas e negociações.
  - [ ] Cadastro de clientes.
  - [ ] Geração de contratos de venda.

- **Dashboard Gerencial:**
  - [ ] Relatórios de vendas por período.
  - [ ] Métricas de desempenho dos vendedores.
  - [ ] Visão geral do faturamento.

- **Módulo de Autenticação:**
  - [ ] Login e Logout de usuários do sistema (vendedores, gerentes).
  - [ ] Controle de acesso baseado no perfil do usuário.

---

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
### 2. Configurar o Back-End
```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install

# Execute a aplicação
npm start
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

| Nome do Integrante | Matrícula | GitHub |
| :--- | :--- | :--- |
| Guilherme Lirio Miranda | 202410367 | [@guilirio](https://github.com/guilirio) |
| Fábio Damas Valim | - | [@usuario](https://github.com/) |
| Caio Finnochio Martins | 202410377 | [@caiobfm](https://github.com/caiobfm) |
