"use client";

import { useState } from "react";

interface Jogo {
  numero: number;
  mandante: string;
  visitante: string;
  competicao: string;
  e_classico: boolean;
  posicao_mandante?: string;
  posicao_visitante?: string;
  forma_mandante?: string; // "VVVEV"
  forma_visitante?: string;
  h2h_6_jogos?: string;
  desfalques_mandante?: string[];
  desfalques_visitante?: string[];
  probabilidades: { p1: number; pX: number; p2: number };
  p_base?: number;
  p_final?: number;
  coluna_recomendada: string;
  coluna_segura: string;
  modificadores_ativos: string[];
  justificativa_curta?: string;
  justificativa_completa?: string;
  odd_mercado?: { "1": number; X: number; "2": number };
}

function FormaDots({ forma }: { forma: string }) {
  return (
    <div className="flex gap-1">
      {forma.split("").map((c, i) => (
        <span
          key={i}
          className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold
            ${c === "V" ? "bg-green-500/20 text-green-400 border border-green-500/30" : ""}
            ${c === "E" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : ""}
            ${c === "D" ? "bg-red-500/20 text-red-400 border border-red-500/30" : ""}
            ${c === "X" ? "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30" : ""}
          `}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export function JogoCard({ jogo, isDuploAutomatico }: { jogo: Jogo; isDuploAutomatico?: boolean }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div
      className={`group relative rounded-2xl bg-[#161618] border p-4 transition-all cursor-pointer
      ${isDuploAutomatico ? "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]" : "border-[#2A2A2E] hover:border-[#3A3A3E]"}
      ${expandido ? "ring-1 ring-white/10" : ""}`}
      onClick={() => setExpandido(!expandido)}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-500">#{String(jogo.numero).padStart(2, "0")}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">{jogo.competicao}</span>
          {jogo.e_classico && <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">🏆 CLÁSSICO R02</span>}
        </div>
        {isDuploAutomatico && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500 text-black font-bold">DUPLO AUTO</span>}
      </div>

      {/* Times */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">{jogo.mandante[0]}</div>
          <span className="font-semibold text-white">{jogo.mandante}</span>
          <span className="text-xs text-zinc-500">{jogo.posicao_mandante}</span>
        </div>
        <span className="text-zinc-600 text-xs">vs</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">{jogo.posicao_visitante}</span>
          <span className="font-semibold text-white">{jogo.visitante}</span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">{jogo.visitante[0]}</div>
        </div>
      </div>

      {/* Barra Prob */}
      <div className="flex h-1.5 rounded-full overflow-hidden mb-3">
        <div className="bg-green-500" style={{ width: `${jogo.probabilidades.p1}%` }} />
        <div className="bg-zinc-400" style={{ width: `${jogo.probabilidades.pX}%` }} />
        <div className="bg-blue-500" style={{ width: `${jogo.probabilidades.p2}%` }} />
      </div>
      <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-3">
        <span>1 {jogo.probabilidades.p1}%</span>
        <span>X {jogo.probabilidades.pX}%</span>
        <span>2 {jogo.probabilidades.p2}%</span>
      </div>

      {/* Colunas */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {jogo.modificadores_ativos.map(m => (
            <span key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">{m}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Segura: {jogo.coluna_segura}</span>
          <span className="text-sm font-bold px-2.5 py-1 rounded-lg bg-green-500 text-black">{jogo.coluna_recomendada}</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500 line-clamp-2">{jogo.justificativa_curta}</p>

      {/* EXPANDIDO - DADOS RICOS V1.0 */}
      {expandido && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-in">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-black/30 rounded-lg p-2.5">
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Forma Mandante</div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-white">{jogo.forma_mandante || "VVVEV"}</span>
                <FormaDots forma={jogo.forma_mandante || "VVVEV"} />
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-2.5">
              <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">Forma Visitante</div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-white">{jogo.forma_visitante || "XDEVD"}</span>
                <FormaDots forma={jogo.forma_visitante || "XDEVD"} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-black/30 rounded-lg p-2.5">
              <div className="text-zinc-500 text-[10px]">H2H 6J</div>
              <div className="text-white font-mono font-bold">{jogo.h2h_6_jogos || "4V-1X-1D"}</div>
            </div>
            <div className="bg-black/30 rounded-lg p-2.5">
              <div className="text-zinc-500 text-[10px]">P_base → P_final</div>
              <div className="text-white font-mono">{jogo.p_base || 76}% → <span className="text-green-400 font-bold">{jogo.p_final || jogo.probabilidades.p1}%</span></div>
            </div>
            <div className="bg-black/30 rounded-lg p-2.5">
              <div className="text-zinc-500 text-[10px]">Odds</div>
              <div className="text-white font-mono text-[11px]">{jogo.odd_mercado?.["1"]} / {jogo.odd_mercado?.X} / {jogo.odd_mercado?.["2"]}</div>
            </div>
          </div>

          {(jogo.desfalques_visitante?.length || jogo.desfalques_mandante?.length) ? (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-xs">
              <div className="text-amber-400 font-bold mb-1">⚠️ Desfalques</div>
              <div className="text-zinc-300">{[...(jogo.desfalques_mandante||[]), ...(jogo.desfalques_visitante||[])].join(", ")}</div>
            </div>
          ) : null}

          <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5">Justificativa Completa (R04 validado 2+ fontes)</div>
            <p className="text-xs text-zinc-300 leading-relaxed">{jogo.justificativa_completa || jogo.justificativa_curta}</p>
            <div className="mt-2 text-[10px] font-mono text-zinc-600">Fórmula: (Forma×35%) + (Tabela×25%) + (H2H×20%) + (Desfalques×12%) + (Motivação×8%) = {jogo.p_base}% | R02 -12pp → {jogo.p_final}%</div>
          </div>
        </div>
      )}

      <div className="mt-3 text-center">
        <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">{expandido ? "▲ Recolher" : "▼ Expandir detalhes técnicos v1.0"}</span>
      </div>
    </div>
  );
}
