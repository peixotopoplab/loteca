// app/analise/[id]/page.tsx
import fs from "fs";
import path from "path";
import { JogoCard } from "@/components/JogoCard";
import { VolanteSimulador } from "@/components/VolanteSimulador";
import { GabaritoCard } from "@/components/GabaritoCard";
import { LotecaAnaliseSchema } from "@/lib/schema";
import Link from "next/link";

export async function generateStaticParams() {
  try {
    const dir = path.join(process.cwd(), "data", "analises");
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
    return files.map(f => ({ id: f.replace(".json", "") }));
  } catch {
    return [{ id: "1262" }];
  }
}

export default function AnalisePage({ params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), "data", "analises", `${params.id}.json`);
  let raw: any;
  try {
    raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return <div className="p-10 text-white">Análise {params.id} não encontrada. Adicione data/analises/{params.id}.json</div>;
  }

  const parsed = LotecaAnaliseSchema.safeParse(raw);
  if (!parsed.success) {
    return <div className="p-10 text-white">Erro schema: {parsed.error.message}</div>;
  }
  const analise = parsed.data as any;

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <header className="border-b border-white/5 sticky top-0 bg-[#0A0A0B]/80 backdrop-blur z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center font-black text-black text-xs">L</div>
            <span className="font-bold">LOTECA IA</span>
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">Concurso {analise.concurso}</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{analise.tipo}</span>
            <span className="px-2.5 py-1 rounded-full bg-green-500 text-black font-bold">{analise.visibilidade}</span>
          </div>
        </div>
      </header>

      {/* Top bar */}
      <div className="max-w-[1400px] mx-auto px-6 py-4 grid grid-cols-4 gap-3">
        {[
          { k: "Taxa 13 pts", v: `${((analise.meta?.taxa_acerto_historico_13 || 0.55) * 100).toFixed(0)}%` },
          { k: "Duplo Auto", v: `J${analise.duplo_automatico.jogo} ${analise.duplo_automatico.opcoes?.join("") || ""}` },
          { k: "Anterior", v: `${analise.meta?.acertos_concurso_anterior || 13} acertos` },
          { k: "Acumulado", v: `R$ ${(analise.meta?.valor_acumulado || 0).toLocaleString("pt-BR")}` },
        ].map(s => (
          <div key={s.k} className="rounded-xl bg-[#161618] border border-[#2A2A2E] p-3">
            <div className="text-[10px] text-zinc-500 uppercase">{s.k}</div>
            <div className="text-sm font-bold font-mono">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Jogos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 content-start">
          {analise.jogos.map((jogo: any, idx: number) => (
            <JogoCard key={idx} jogo={jogo} isDuploAutomatico={jogo.numero === analise.duplo_automatico.jogo} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 lg:sticky lg:top-[72px] h-fit">
          <VolanteSimulador jogos={analise.jogos} colunasIniciais={analise.volante_recomendado?.colunas || analise.jogos.map((j: any) => j.coluna_recomendada)} />
          <GabaritoCard />
          <div className="rounded-2xl bg-[#161618] border border-[#2A2A2E] p-4">
            <h4 className="font-bold text-sm mb-2">Top 3 Combinações</h4>
            <div className="space-y-2">
              {(analise.top3_combinacoes || analise.combinacoes_top3 || []).map((c: any, i: number) => (
                <div key={i} className="bg-black/30 rounded-lg p-2.5 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">{c.id || c.rank} — {c.perfil || "Equilibrada"}</div>
                    <div className="text-[10px] font-mono text-zinc-500 truncate max-w-[180px]">{(c.volante || []).join(" ")}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-green-400">{(c.prob || c.probabilidade_acumulada || 0).toFixed ? (c.prob * 100).toFixed(1) + "%" : c.probabilidade_acumulada + "%"}</div>
                    <div className="text-[10px] text-zinc-500">R$ {c.custo_r || 6},00</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
