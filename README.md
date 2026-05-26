# User CRUD — Teste Técnico

Aplicação de cadastro de usuários construída com Next.js 16, React 19 e TypeScript.

## Como executar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Testes

```bash
npm test
```

## Decisões tomadas

Os dados são armazenados em um `Map` singleton no servidor (`lib/store.ts`), sem dependências externas. Em ambientes serverless os dados resetam em cold starts, então, para o futuro, o store seria substituído por um banco de dados.

## Bibliotecas utilizadas

- **Tailwind CSS 4** — estilização
- **Zod** — validação de schema compartilhada entre API e formulário
- **lucide-react** — ícones
- **Vitest + React Testing Library** — testes unitários e de componente

## Possíveis melhorias futuras

- Substituir o store in-memory por um banco de dados para persistência real
- Paginação e busca na listagem de usuários
- Testes de integração para os Route Handlers
