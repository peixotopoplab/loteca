# LOTECA IA Web - Scaffold

## Estrutura Next.js (custo zero)

```
loteca-ia-web/
├── app/
│   ├── page.tsx -> Landing Page (free)
│   ├── analise/[id]/page.tsx -> Lê /data/analises/{id}.json
│   ├── historico/page.tsx -> Lista todos JSONs
│   └── api/upload/route.ts -> Futuro admin
├── data/
│   └── analises/
│       └── 1262.json (exemplo v1.0)
├── components/
│   ├── JogoCard.tsx
│   ├── VolanteSimulador.tsx
│   └── TopCombinacoes.tsx
└── lib/
    └── schema.ts -> zod validation do schema v1.0
```

## Stack exata
- Next.js 14 App Router + Static Export
- Tailwind CSS
- Vercel deploy automático via GitHub Actions
- Banco = pasta /data (git)

## Próximos passos codando

1. `npx create-next-app@latest loteca-ia-web --typescript --tailwind --app`
2. Copiar o data-exemplo-1262.json para /data/analises/
3. Criar lib/schema.ts com Zod usando o schema v1.0
4. Copiar o layout do artifact que te mostrei (já está pronto em React)

## Admin simples
Form em /admin:
- input file .json
- valida com Zod
- git commit via API ou manual upload pro repo
- GitHub Action faz deploy

## Freemium logic no código
```ts
if (analise.visibilidade === 'premium' && !user.isPremium) {
  showOnly(coluna_segura) // não mostra coluna_recomendada dupla
  hide(Top3Combinacoes)
  hide(VolanteSimulador)
}
```

## Skill atualizada
Arquivo SKILL_LOTECA_IA_v2.md contém o prompt novo que gera JSON v1.0 direto. É só colar na sua IA/skill atual.
