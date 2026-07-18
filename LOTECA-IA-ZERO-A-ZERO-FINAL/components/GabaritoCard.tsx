export function GabaritoCard() {
  const taxas = [
    { label: "Geral", valor: 55, cor: "bg-white" },
    { label: "Clássicos R02", valor: 100, cor: "bg-green-500" },
    { label: "Desgaste <72h", valor: 100, cor: "bg-blue-500" },
    { label: "Regular", valor: 60, cor: "bg-zinc-500" },
  ];

  const historico = [
    { concurso: 1254, tipo: "FS", data: "04/05/26", acertos: 8, total: 14, pct: 57 },
    { concurso: 1255, tipo: "MW", data: "07/05/26", acertos: 9, total: 14, pct: 64 },
    { concurso: 1256, tipo: "FS", data: "10/05/26", acertos: 7, total: 14, pct: 50 },
  ];

  const aps = [
    "AP001 — Clássicos desvio padrão 2.5× maior. R02 obrigatório.",
    "AP002 — Desgaste europeu <72h 100% confiabilidade.",
    "AP003 — VAR imprevisível, propensão cartões previsível.",
    "AP004 — Triplo R01 mais seguro quando |Pmax-Pmin| < 20pp.",
    "AP005 — Validação 2+ fontes inviolável.",
    "AP006 — Crise institucional pode motivar em clássicos.",
    "AP007 — Visitante em situação crítica +5pp. Em calibração.",
    "AP008 — Sonnet 4 + web search stack ideal.",
  ];

  return (
    <div className="rounded-2xl bg-[#161618] border border-[#2A2A2E] p-4">
      <h3 className="font-bold text-white mb-3">Gabarito & Histórico — R06</h3>

      <div className="space-y-2.5 mb-4">
        {taxas.map(t => (
          <div key={t.label} className="flex items-center gap-3">
            <span className="text-[11px] text-zinc-400 w-28">{t.label}</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full ${t.cor} rounded-full`} style={{ width: `${t.valor}%` }} />
            </div>
            <span className="text-xs font-mono text-white w-10 text-right">{t.valor}%</span>
          </div>
        ))}
      </div>

      <div className="bg-black/30 rounded-lg p-2.5 mb-4">
        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">Últimos concursos</div>
        <div className="space-y-1.5">
          {historico.map(h => (
            <div key={h.concurso} className="flex justify-between text-xs font-mono">
              <span className="text-zinc-500">#{h.concurso} {h.tipo} {h.data}</span>
              <span className={h.pct >= 60 ? "text-green-400" : "text-zinc-300"}>{h.acertos}/{h.total} — {h.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <details className="group">
        <summary className="text-xs text-zinc-400 cursor-pointer list-none flex justify-between items-center bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 hover:bg-white/[0.05]">
          <span>📚 Aprendizados AP001-AP008</span>
          <span className="group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="mt-2 space-y-1.5 bg-black/20 rounded-lg p-2.5">
          {aps.map((ap, i) => (
            <div key={i} className="text-[11px] text-zinc-400 leading-snug">• {ap}</div>
          ))}
        </div>
      </details>
    </div>
  );
}
