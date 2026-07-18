import { useState, useMemo } from "react";

interface Props {
  jogos: { mandante: string; visitante: string; probabilidades: { p1: number; pX: number; p2: number } }[];
  colunasIniciais: string[]; // ex: ["1X", "1", ...]
}

const LIMITE_POR_TRIPLO: Record<number, number> = {
  0: 8, 1: 8, 2: 5, 3: 5, 4: 3, 5: 1, 6: 0
};

export function VolanteSimulador({ jogos, colunasIniciais }: Props) {
  const [selecoes, setSelecoes] = useState<string[][]>(() =>
    colunasIniciais.map(c => c.split(""))
  );

  const toggle = (j: number, col: string) => {
    setSelecoes(prev => {
      const next = [...prev];
      const set = new Set(next[j]);
      if (set.has(col)) {
        if (set.size > 1) set.delete(col); // nunca deixar vazio
      } else {
        set.add(col);
      }
      next[j] = Array.from(set).sort();
      return next;
    });
  };

  const stats = useMemo(() => {
    let duplos = 0, triplos = 0, probAc = 1;
    selecoes.forEach((cols, idx) => {
      if (cols.length === 2) duplos++;
      if (cols.length === 3) triplos++;
      const probJogo = jogos[idx]?.probabilidades;
      if (probJogo) {
        const p = cols.reduce((acc, c) => {
          if (c === "1") return acc + probJogo.p1;
          if (c === "X") return acc + probJogo.pX;
          return acc + probJogo.p2;
        }, 0);
        probAc *= p / 100;
      }
    });
    const totalApostas = Math.pow(2, duplos) * Math.pow(3, triplos);
    const custo = totalApostas * 2;
    const limiteDuplos = LIMITE_POR_TRIPLO[triplos] ?? 0;
    const validoCaixa = totalApostas <= 864;
    const validoOperacional = duplos <= limiteDuplos;
    return { duplos, triplos, totalApostas, custo, probAc, limiteDuplos, validoCaixa, validoOperacional };
  }, [selecoes, jogos]);

  return (
    <div className="rounded-2xl bg-[#161618] border border-[#2A2A2E] p-4">
      <h3 className="font-bold text-white mb-1">Volante Simulador</h3>
      <p className="text-[11px] text-zinc-500 mb-4">Fórmula v1.0: 2^duplos × 3^triplos</p>

      <div className="space-y-1.5 max-h-[420px] overflow-auto pr-1">
        {jogos.slice(0, 14).map((jogo, idx) => (
          <div key={idx} className="flex items-center justify-between bg-black/30 rounded-lg px-2.5 py-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 w-4">{idx + 1}</span>
              <span className="text-xs text-white truncate">{jogo.mandante.slice(0,3)} x {jogo.visitante.slice(0,3)}</span>
            </div>
            <div className="flex gap-1">
              {(["1", "X", "2"] as const).map(col => {
                const ativo = selecoes[idx]?.includes(col);
                return (
                  <button
                    key={col}
                    onClick={() => toggle(idx, col)}
                    className={`w-6 h-6 rounded text-[11px] font-bold border transition-all
                      ${ativo ? "bg-green-500 text-black border-green-500" : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20"}`}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="bg-black/40 rounded-lg p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Apostas</div>
          <div className="text-white font-mono font-bold">{stats.totalApostas}</div>
          <div className="text-[10px] text-zinc-500">{stats.duplos}D + {stats.triplos}T | Limite {stats.limiteDuplos}D</div>
        </div>
        <div className="bg-black/40 rounded-lg p-2.5">
          <div className="text-[10px] text-zinc-500 uppercase">Custo</div>
          <div className="text-white font-mono font-bold">R$ {stats.custo.toFixed(2)}</div>
          <div className="text-[10px] text-zinc-500">Prob. Acum. {(stats.probAc * 100).toFixed(2)}%</div>
        </div>
      </div>

      <div className={`mt-3 text-xs px-3 py-2 rounded-lg border ${stats.validoCaixa && stats.validoOperacional ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
        {stats.validoCaixa && stats.validoOperacional ? "✅ Válido — dentro do limite Caixa 864 e operacional" : `❌ Inválido — ${!stats.validoCaixa ? "excede 864 apostas" : `máx ${stats.limiteDuplos} duplos com ${stats.triplos} triplos`}`}
      </div>
    </div>
  );
}
