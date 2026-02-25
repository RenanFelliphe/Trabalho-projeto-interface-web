# UsefulToolsPortal

Aplicação web desenvolvida em **React + TypeScript** com o objetivo de centralizar organização pessoal em um único ambiente digital.

O sistema é composto por três módulos principais:

- **TaskMaster** – Gestão de Tarefas  
- **MoneyFlow** – Controle Financeiro  
- **ConnectHub** – Gerenciamento de Contatos  

---

## 📌 Visão do Produto

O UsefulToolsPortal foi desenvolvido para auxiliar utilizadores na organização de tarefas, controle financeiro e gestão de contatos de forma simples, intuitiva e eficiente.

A aplicação entrega valor ao permitir:

- Organização clara de atividades por prioridade
- Controle de entradas e saídas financeiras com saldo automático
- Armazenamento estruturado de contatos
- Persistência de dados mesmo após atualização da página

O sistema utiliza validação robusta com **Zod**, gerenciamento de formulários com **React Hook Form** e persistência com **LocalStorage**, garantindo consistência e boa experiência de uso.

---

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- React Router DOM
- React Hook Form
- Zod
- TailwindCSS
- LocalStorage (Persistência de Dados)

---

## 📂 Estrutura dos Módulos

### TaskMaster
Gerenciamento completo de tarefas com:

- Cadastro com validação
- Definição de categoria
- Nível de prioridade com destaque visual
- Exclusão de tarefas
- Persistência no LocalStorage

---

### MoneyFlow
Controle financeiro simples e eficiente:

- Registro de entradas e saídas
- Cálculo automático do saldo
- Histórico de transações
- Persistência no LocalStorage

---

### ConnectHub
Gerenciamento de contatos com:

- Nome, e-mail e telefone
- Validação de campos
- Listagem dinâmica
- Persistência no LocalStorage

---

## 📊 Funcionalidades Implementadas

- ✅ Validação completa de formulários com Zod
- ✅ Estados derivados calculados corretamente
- ✅ Persistência com LocalStorage
- ✅ Renderização dinâmica com React
- ✅ Navegação com React Router
- ✅ Feedback visual de erros
- ✅ Interface responsiva com TailwindCSS

---

## 🚀 Como Executar o Projeto

```bash
# Clonar repositório
git clone https://github.com/RenanFelliphe/Trabalho-projeto-interface-web

# Instalar dependências
npm install

# Executar aplicação
npm run dev
