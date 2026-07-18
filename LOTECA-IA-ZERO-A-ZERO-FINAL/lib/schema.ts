
import { z } from "zod";

export const JogoSchema = z.object({
  numero: z.number().min(1).max(14),
  mandante: z.string(),
  visitante: z.string(),
  competicao: z.string(),
  e_classico: z.boolean(),
  // Campos ricos v1.0 preservados - opcionais para compatibilidade
  posicao_mandante: z.string().optional(),
  posicao_visitante: z.string().optional(),
  forma_mandante: z.string().optional(),
  forma_visitante: z.string().optional(),
  h2h_6_jogos: z.string().optional(),
  desfalques_mandante: z.array(z.string()).optional(),
  desfalques_visitante: z.array(z.string()).optional(),
  odds: z.object({ "1": z.number(), X: z.number(), "2": z.number() }).optional(),
  // Campos v1.1 web
  probabilidades: z.object({ p1: z.number(), pX: z.number(), p2: z.number() }),
  p_base: z.number().optional(),
  p_final: z.number().optional(),
  coluna_recomendada: z.string(),
  coluna_segura: z.string(),
  zebra_alerta: z.boolean().optional(),
  modificadores_ativos: z.array(z.string()),
  justificativa_curta: z.string().optional(),
  justificativa_completa: z.string().optional(),
  justificativa: z.string().optional(), // alias v1.0
  odd_mercado: z.object({ "1": z.number(), X: z.number(), "2": z.number() }).optional(),
  p1: z.number().optional(), // compat v1.0
  pX: z.number().optional(),
  p2: z.number().optional(),
});

export const LotecaAnaliseSchema = z.object({
  schema_version: z.enum(["1.0", "1.1"]),
  concurso: z.number(),
  tipo: z.enum(["FS", "MW", "ME"]),
  data_analise: z.string(),
  data_jogos: z.string().optional(),
  status: z.string().optional(),
  visibilidade: z.enum(["free", "premium"]).optional().default("premium"),
  meta: z.object({
    taxa_acerto_historico_13: z.number().optional(),
    acertos_concurso_anterior: z.number().optional(),
    valor_acumulado: z.number().optional(),
  }).optional(),
  jogos: z.array(JogoSchema).length(14),
  duplo_automatico: z.object({
    jogo: z.number(),
    times: z.string().optional(),
    opcoes: z.array(z.string()).optional(),
    cobertura_pct: z.number().optional(),
    score: z.number().optional(),
    motivo: z.string().optional(),
  }),
  volante_recomendado: z.object({
    colunas: z.array(z.string()).length(14),
    probabilidade_acumulada: z.number(),
    custo_estimado_duplos: z.number(),
    custo_estimado_triplos: z.number(),
  }).optional(),
  top3_combinacoes: z.array(z.any()).optional(),
  combinacoes_top3: z.array(z.any()).optional(), // alias v1.0
  taxa_acerto_historico: z.any().optional(),
  calculo_aposta: z.object({
    duplos: z.number(),
    triplos: z.number(),
    total_apostas: z.number(),
    custo_total: z.number(),
    valido: z.boolean(),
    limite_caixa: z.number(),
  }).optional(),
});

export type LotecaAnalise = z.infer<typeof LotecaAnaliseSchema>;
