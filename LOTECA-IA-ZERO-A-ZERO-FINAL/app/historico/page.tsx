import fs from "fs";
import path from "path";
import Link from "next/link";

export default function HistoricoPage() {
  let analises: any[] = [];
  try {
    const dir = path.join(process.cwd(), "data", "analises");
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json")).sort().reverse();
    analises = files.map(f => {
      const d = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
      return { arquivo: f, ...d };
    });
  } catch {}

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-xs text-zinc-500 hover:text-white">← Voltar</Link>
        <h1 className="text-2xl font-black mt-4 mb-6">Histórico de Concursos — R06 Evolutivo</h1>
        <div className="space-y-2">
          {analises.map((a: any) => (
            <Link key={a.concurso} href={`/analise/${a.concurso}`} className="flex justify-between items-center bg-[#161618] border border-[#2A2A2E] rounded-xl p-4 hover:border-white/10">
              <div>
                <div className="font-bold text-sm">Concurso {a.concurso} — {a.tipo} — {a.data_analise?.slice(0,10)}</div>
                <div className="text-[11px] text-zinc-500 font-mono">{a.jogos?.length || 14} jogos | Duplo Auto J{a.duplo_automatico?.jogo} | {a.volante_recomendado?.colunas?.filter((c:string)=>c.length>1).length || 0}D</div>
              </div>
              <div className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{a.taxa_acerto_historico?.geral || "55%"}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
