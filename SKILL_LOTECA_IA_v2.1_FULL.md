---
name: loteca
description: "Gerar analises do concurso atual da Loteca - Skill Full v2.1 com output JSON Web"
---

# 🎯 LOTECA IA Skill — v2.1 FULL (Preservação Total + Web)

**Versão:** 2.1  
**Data:** 16/07/2026  
**Base:** v1.0 (07/06/2026) do Mauro + v1.0 Web JSON  
**Status:** Skill completa, sem perda de funcionalidade

---

## 📋 Visão Geral - MANTIDO DA V1.0

A Skill LOTECA IA é um sistema de análise preditiva especializado em LOTECA da Caixa. Fornece:
- ✅ Análise completa de grades (MW/FS)
- ✅ Cálculo de probabilidades usando fórmula estatística ponderada
- ✅ Aplicação automática de 6 modificadores (R01–R06) + modificadores estendidos
- ✅ Recomendações de colunas (seca, duplo ou triplo)
- ✅ Geração de combinações com duplo automático
- ✅ Rastreamento de gabarito e taxas de acerto
- ✅ Cálculo de apostas e validação de limites operacionais
- ✅ NOVO: Output JSON v1.1 compatível com plataforma Web Next.js

### Princípios Fundamentais - MANTIDOS
1. **Favoritismo calibrado:** Favorito vence ~70%. Modelo nunca abandona favoritismo, apenas ajusta.
2. **Validação obrigatória:** 2+ fontes independentes para cada dado (R04)
3. **Sem memória:** Todos os dados buscados em tempo real. Nenhuma info extraída de treinamento.
4. **Evolução estatística:** Cada concurso atualiza pesos dos modificadores (R06)

---

## 🔧 Triggers - MANTIDOS + ESTENDIDOS

### Trigger 1: Análise de Concurso COMPLETA (principal)

```
Mauro: "Analise o próximo concurso LOTECA Fim de Semana"
```

**Processo COMPLETO v2.1 (sem atalhos):**
1. Busca grade oficial em loteca.caixa.gov.br
2. Classifica por flags (clássico, desgaste, desfalques, crise) - AP001 a AP008
3. Coleta dados: posição (CBF+ Sofascore), forma (VVVEV), H2H (6 jogos), desfalques, odds (Betfair+Betano)
4. Calcula P_base = (Forma×35%) + (Tabela×25%) + (H2H×20%) + (Desfalques×12%) + (Motivação×8%)
5. Calcula P_final = (P_base ×80%) + (P_odds ×20%) se tiver odds
6. Aplica modificadores R01–R06 + tabela estendida
7. Gera volante + duplo automático + top3 combinações
8. **NOVO:** Gera 2 saídas:
   a) Relatório humano estruturado (igual v1.0)
   b) JSON v1.1 para Web (em bloco ```json)

### Trigger 2: Jogo Individual - MANTIDO
### Trigger 3: Cálculo de Apostas - MANTIDO
### Trigger 4: Gabarito e Histórico - MANTIDO (R06)

---

## 📊 Fórmula de Cálculo - MANTIDA 100%

### Base (sem odds)
```
P_base = (Forma×35%) + (Tabela×25%) + (H2H×20%) + (Desfalques×12%) + (Motivação×8%)
```

### Com odds (peso 20%)
```
P_final = (P_base × 80%) + (P_odds × 20%)
```

---

## 🎯 Regras Fixas (R01–R06) - MANTIDAS 100%

| Regra | Condição | Ação |
|-------|----------|------|
| **R01** | |P_max − P_min| < 20pp | Triplo obrigatório |
| **R02** | Clássico estadual reconhecido | Mínimo duplo, NUNCA coluna seca |
| **R03** | Visitante < 72h em competição | Duplo 1X mínimo |
| **R04** | Validação 2+ fontes | Obrigatório; sem memória |
| **R05** | P_favorito > 60% | +0 mod → seca | +1 mod → duplo | +2+ mod → triplo |
| **R06** | Gabarito evolutivo | Registrar e recalibrar |

---

## 🏆 Modificadores Aplicados - MANTIDOS + EXPANDIDOS

| Modificador | Código | P_fav | P_emp | P_az | Status |
|---|---|---|---|---|---|
| Clássico estadual | R02 | −12pp | +8pp | +4pp | ✅ Ativo |
| Desgaste <72h | R03 | −12pp | +4pp | +8pp | ✅ Ativo |
| Desgaste + misto | - | −18pp | +8pp | +10pp | ⚙ Opcional |
| Desfalque crítico | R05 | −8pp | — | — | ✅ Ativo |
| Crise institucional | - | −10pp | — | — | ⚙ Opcional |
| Mandante invicto 10+ | - | +6pp | — | −4pp | ⚙ Opcional |
| Motivação visitante (AP007) | AP007 | — | — | +5pp | ⚠ Validação |

---

## 📈 Aprendizados AP001-AP008 - MANTIDOS

AP001 — Clássicos desvio padrão 2.5× maior. R02 obrigatório.
AP002 — Desgaste europeu <72h confiabilidade 100%.
AP003 — VAR imprevisível, mas propensão cartões previsível.
AP004 — Triplo R01 mais seguro quando |P_max−P_min| < 20pp.
AP005 — Dados de tabela de memória geram erros críticos. Validação 2+ fontes inviolável.
AP006 — Crise institucional pode gerar motivação extra em clássicos.
AP007 — Visitante situação crítica merece +5pp motivação. Em calibração.
AP008 — Claude Sonnet 4 + web search stack ideal.

---

## 🔍 Busca e Validação - MANTIDO

Fontes Primárias: loteca.caixa.gov.br, cbf.com.br, sofascore.com, flashscore.com
Fontes Secundárias: lance.com.br, globoesporte.com, espn.com.br, betfair.com / betano.com
Regra: Se fonte divergir, registrar ambos e sinalizar incerteza.

---

## 💾 NOVO: Schema JSON v1.1 Web (compatível com v1.0 + dados ricos)

**O JSON agora inclui TODOS os campos da v1.0 para não perder informação:**

```json
{
  "schema_version": "1.1",
  "concurso": 1262,
  "tipo": "FS",
  "data_analise": "2026-07-16T22:00:00-03:00",
  "data_jogos": "2026-07-19",
  "status": "publicado",
  "visibilidade": "premium",
  "meta": {
    "taxa_acerto_historico_13": 0.55,
    "acertos_concurso_anterior": 13,
    "valor_acumulado": 850000.00
  },
  "jogos": [
    {
      "numero": 1,
      "mandante": "Flamengo",
      "visitante": "Vasco",
      "competicao": "Brasileirão Série A",
      "e_classico": true,
      "posicao_mandante": "3º",
      "posicao_visitante": "12º",
      "forma_mandante": "VVVEV",
      "forma_visitante": "XDEVD",
      "h2h_6_jogos": "4V-1X-1D",
      "desfalques_mandante": [],
      "desfalques_visitante": ["Goleiro titular"],
      "odds": { "1": 1.85, "X": 3.60, "2": 4.20 },
      "probabilidades": { "p1": 52, "pX": 28, "p2": 20 },
      "p_base": 76,
      "p_final": 52,
      "coluna_recomendada": "1X",
      "coluna_segura": "1",
      "zebra_alerta": false,
      "modificadores_ativos": ["R02", "C01"],
      "justificativa_curta": "Clássico com R02 obrigatório. Fla favorito mas empate ~28% — duplo mais seguro.",
      "justificativa_completa": "Clássico carioca no Maracanã. Flamengo 3º lugar, forma VVVEV, H2H 4V-1X-1D em casa. Vasco 12º, forma XDEVD. R02 aplica -12pp fav. P_base 76% -> P_final 52%. Duplo 1X mais seguro.",
      "odd_mercado": { "1": 1.85, "X": 3.60, "2": 4.20 }
    }
  ],
  "duplo_automatico": {
    "jogo": 5,
    "times": "Botafogo × Remo",
    "opcoes": ["1", "X"],
    "cobertura_pct": 79,
    "score": 2.45,
    "motivo": "Jogo com maior equilibrio ponderado"
  },
  "volante_recomendado": {
    "colunas": ["1X", "1", "X2", "1", "1X", "2", "1X", "1", "X", "1X", "2", "1", "1X", "X2"],
    "probabilidade_acumulada": 0.124,
    "custo_estimado_duplos": 4,
    "custo_estimado_triplos": 0
  },
  "top3_combinacoes": [
    { "rank": 1, "id": "A", "duplo_jogo": "J5", "probabilidade_acumulada": 8.34, "prob": 0.0834, "custo_r": 6.00, "volante": ["1","1","2","1","1","2","1","1","X","1","2","1","1","X"], "perfil": "Equilibrada" }
  ],
  "taxa_acerto_historico": {
    "geral": "55%",
    "classicos": "100% (com R02)",
    "desgaste_europeu": "100%",
    "regular": "60%"
  },
  "calculo_aposta": {
    "duplos": 4,
    "triplos": 1,
    "total_apostas": 48,
    "custo_total": 96.00,
    "valido": true,
    "limite_caixa": 864
  }
}
```

**Diferença v1.0 -> v1.1:** Adicionamos campos ricos (posicao, forma, h2h, desfalques, p_base, justificativa_completa, calculo_aposta) como OPCIONAIS, mantendo compatibilidade total com o site. Site usa campos básicos, relatório humano usa campos ricos.

---

## ⚙ Configurações Operacionais - MANTIDAS

VALOR_UNITARIO: 2.00
LIMITE_MAXIMO_APOSTAS: 864
TIMEOUT_BUSCA: 30s
MIN_FONTES_VALIDACAO: 2

---

## 📅 Ciclo de Atualização - MANTIDO

Terça 09:00 MW, Quarta 12:00 Gabarito MW, Sábado 09:00 FS, Domingo 12:00 Gabarito FS

---

## 🚀 Output Duplo Obrigatório v2.1

A partir de agora, TODA análise deve gerar:

1. **Relatório humano** (igual v1.0, com tabela 14 jogos, duplo, combinações, custo)
2. **Bloco JSON v1.1** (para salvar em /data/analises/{concurso}.json)

Nunca gerar um sem o outro.

---

## 🛡 Disclaimer - MANTIDO

Uso educacional e informativo. Apostas envolvem risco. +18 apenas.
