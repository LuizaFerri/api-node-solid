# GymFlow

Uma API RESTful desenvolvida em Node.js para gerenciamento de academias e check-ins, similar ao GymPass. Construída seguindo princípios SOLID e boas práticas de desenvolvimento, oferecendo uma solução robusta e escalável.

### 🎯 Principais Funcionalidades

- **Gerenciamento de Academias**: Cadastro, busca e localização de academias próximas
- **Sistema de Check-in**: Registro e validação de presença nas academias
- **Autenticação Segura**: JWT com refresh token e controle de perfis (Admin/Member)
- **Geolocalização**: Busca de academias por proximidade usando coordenadas
- **Métricas e Histórico**: Acompanhamento de check-ins e atividades dos usuários

### 💡 Diferenciais

- Arquitetura limpa e modular
- Testes automatizados (unitários e E2E)
- Validação de dados com Zod
- Sistema de autenticação robusto
- Geocoding para localização de academias

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Docker e Docker Compose
- Uma instância do PostgreSQL (fornecida via Docker)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone [url-do-seu-repositorio]
cd solidnode
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 🧪 Testes

### Executar testes unitários
```bash
npm test
```

### Executar testes E2E
```bash
npm run test:e2e
```

### Visualizar cobertura de testes
```bash
npm run test:coverage
```

## 📚 Documentação da API

### Autenticação

#### Registro de Usuário
- **POST** `/users`
- **Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min: 6 caracteres)"
}
```
- **Response:** `201 Created`

#### Login
- **POST** `/sessions`
- **Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response:** `200 OK`
```json
{
  "token": "string"
}
```

#### Refresh Token
- **PATCH** `/token/refresh`
- **Cookies:** `refreshToken`
- **Response:** `200 OK`
```json
{
  "token": "string"
}
```

#### Perfil do Usuário
- **GET** `/me`
- **Auth:** Bearer Token
- **Response:** `200 OK`
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "ADMIN | MEMBER"
  }
}
```

### Academias

#### Criar Academia (Admin)
- **POST** `/gyms`
- **Auth:** Bearer Token (ADMIN)
- **Body:**
```json
{
  "title": "string",
  "description": "string?",
  "phone": "string?",
  "latitude": "number",
  "longitude": "number"
}
```
- **Response:** `201 Created`

#### Buscar Academias
- **GET** `/gyms/search`
- **Auth:** Bearer Token
- **Query:**
  - `q`: string (termo de busca)
  - `page`: number (default: 1)
- **Response:** `200 OK`
```json
{
  "gyms": [
    {
      "id": "string",
      "title": "string",
      "description": "string?",
      "phone": "string?",
      "latitude": "number",
      "longitude": "number"
    }
  ]
}
```

#### Academias Próximas
- **GET** `/gyms/nearby`
- **Auth:** Bearer Token
- **Query:**
  - `latitude`: number
  - `longitude`: number
- **Response:** `200 OK`
```json
{
  "gyms": [
    {
      "id": "string",
      "title": "string",
      "description": "string?",
      "phone": "string?",
      "latitude": "number",
      "longitude": "number"
    }
  ]
}
```

### Check-ins

#### Criar Check-in
- **POST** `/gyms/:gymId/check-ins`
- **Auth:** Bearer Token
- **Params:**
  - `gymId`: string (UUID)
- **Body:**
```json
{
  "latitude": "number",
  "longitude": "number"
}
```
- **Response:** `201 Created`

#### Histórico de Check-ins
- **GET** `/check-ins/history`
- **Auth:** Bearer Token
- **Query:**
  - `page`: number (default: 1)
- **Response:** `200 OK`
```json
{
  "checkIns": [
    {
      "id": "string",
      "created_at": "string",
      "validated_at": "string?"
    }
  ]
}
```

#### Métricas de Check-ins
- **GET** `/check-ins/metrics`
- **Auth:** Bearer Token
- **Response:** `200 OK`
```json
{
  "checkInsCount": "number"
}
```

#### Validar Check-in (Admin)
- **PATCH** `/check-ins/:checkInId/validate`
- **Auth:** Bearer Token (ADMIN)
- **Params:**
  - `checkInId`: string (UUID)
- **Response:** `204 No Content`

## 🏗️ Arquitetura

Este projeto segue os princípios SOLID:

- **S** - Single Responsibility Principle
- **O** - Open-Closed Principle
- **L** - Liskov Substitution Principle
- **I** - Interface Segregation Principle
- **D** - Dependency Inversion Principle
