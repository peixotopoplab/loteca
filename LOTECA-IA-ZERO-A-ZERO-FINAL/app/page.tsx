// app/page.tsx - Landing Page LOTECA IA
import Link from "next/link";
import fs from "fs";
import path from "path";

function getUltimasAnalises() {
  try {
    const dir = path.join(process.cwd(), "data", "analises");
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json")).sort().reverse().slice(0, 5);
    return files.map(f => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
      return data;
    });
  } catch {
    return [];
  }
}

export default function Home() {
  const analises = getUltimasAnalises();
  const ultima = analises[0];

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Header */}
      <header className="border-b border-white/5 sticky top-0 bg-[#0A0A0B]/80 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center font-black text-black text-xs">L</div>
            <span className="font-bold tracking-tight">LOTECA IA</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 ml-2">v2.1 FULL</span>
          </div>
          <div className="flex gap-2">
            <Link href="/historico" className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10">Histórico</Link>
            <Link href={ultima ? `/analise/${ultima.concurso}` : "#"} className="text-xs px-3 py-1.5 rounded-full bg-green-500 text-black font-bold">Última Análise</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SISTEMA PREDITIVO EVOLUTIVO • R01-R06 • AP001-AP008
          </div>
          <h1 className="text-5xl font-black tracking-tight leading-[0.9] mb-4">
            A LOTECA com<br />
            <span className="text-green-500">inteligência real.</span>
          </h1>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            Skill v1.0 preservada 100%. Fórmula base (Forma×35% + Tabela×25% + H2H×20% + Desfalques×12% + Motivação×8%), modificadores R01-R06, validação 2+ fontes, cálculo de apostas 2^D×3^T. Agora com plataforma web freemium.
          </p>
          <div className="flex gap-3">
            <Link href={ultima ? `/analise/${ultima.concurso}` : "#"} className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm">Ver Análise #{ultima?.concurso || "1262"}</Link>
            <Link href="/historico" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm">Como funciona</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mt-12 max-w-3xl">
          {[
            { k: "Taxa 13 acertos", v: "55%" },
            { k: "Clássicos R02", v: "100%" },
            { k: "Desgaste <72h", v: "100%" },
            { k: "Concursos", v: `${analises.length}` },
          ].map(s => (
            <div key={s.k} className="rounded-xl bg-[#161618] border border-[#2A2A2E] p-3">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{s.k}</div>
              <div className="text-lg font-bold font-mono">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Freemium */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#161618] border border-[#2A2A2E] p-6">
            <h3 className="font-bold mb-1">Free</h3>
            <p className="text-xs text-zinc-500 mb-4">Landing + última análise com coluna segura apenas</p>
            <ul className="text-xs text-zinc-400 space-y-1">
              <li>• Última análise (coluna segura)</li>
              <li>• Histórico últimos 2 concursos</li>
              <li>• Tabela de custos</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/5 border border-green-500/20 p-6">
            <h3 className="font-bold mb-1 text-green-400">Premium</h3>
            <p className="text-xs text-zinc-500 mb-4">Acesso total v2.1 FULL</p>
            <ul className="text-xs text-zinc-300 space-y-1">
              <li>• 14 jogos com forma, H2H, desfalques, P_base→P_final</li>
              <li>• Simulador volante 2^D×3^T + validação 864</li>
              <li>• Top 3 combinações + duplo automático</li>
              <li>• Gabarito R06 + AP001-AP008 + histórico completo</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
