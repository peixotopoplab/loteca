"use client";
import { useState } from "react";
import { LotecaAnaliseSchema } from "@/lib/schema";

export default function AdminPage() {
  const [jsonText, setJsonText] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [preview, setPreview] = useState<any>(null);

  const validar = () => {
    try {
      const obj = JSON.parse(jsonText);
      const res = LotecaAnaliseSchema.safeParse(obj);
      if (!res.success) {
        setStatus({ ok: false, msg: `❌ Schema inválido: ${res.error.errors[0].message} em ${res.error.errors[0].path.join(".")}` });
        return;
      }
      setPreview(res.data);
      setStatus({ ok: true, msg: `✅ JSON v${res.data.schema_version} válido! Concurso ${res.data.concurso} com ${res.data.jogos.length} jogos. Pronto para commit.` });
    } catch (e: any) {
      setStatus({ ok: false, msg: `❌ JSON inválido: ${e.message}` });
    }
  };

  const comandoGit = preview ? `git add data/analises/${preview.concurso}.json && git commit -m "Add concurso ${preview.concurso} ${preview.tipo}" && git push` : "";

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-black mb-1">Admin LOTECA IA v2.1</h1>
        <p className="text-xs text-zinc-500 mb-6">Upload de análise — validação Zod v1.1 (compatível v1.0). Sem backend, só git.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Cole o JSON gerado pela Skill v2.1 FULL</label>
            <textarea
              value={jsonText}
              onChange={e => setJsonText(e.target.value)}
              placeholder='{"schema_version": "1.1", "concurso": 1263, ...}'
              className="mt-2 w-full h-[420px] bg-[#161618] border border-[#2A2A2E] rounded-xl p-3 font-mono text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50"
            />
            <button onClick={validar} className="mt-3 w-full py-2.5 rounded-full bg-green-500 text-black font-bold text-sm hover:bg-green-400">
              Validar JSON v1.1
            </button>

            {status && (
              <div className={`mt-3 text-xs p-3 rounded-xl border ${status.ok ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                {status.msg}
              </div>
            )}

            {preview && (
              <div className="mt-4 bg-black/40 rounded-xl p-3 border border-white/5">
                <div className="text-[10px] text-zinc-500 uppercase mb-1">Comando git (copie e cole no terminal)</div>
                <code className="text-[11px] font-mono text-white break-all bg-black/50 p-2 rounded block">{comandoGit}</code>
              </div>
            )}
          </div>

          <div>
            {preview ? (
              <div className="rounded-2xl bg-[#161618] border border-[#2A2A2E] p-4">
                <h3 className="font-bold text-sm mb-3">Preview — Concurso {preview.concurso} {preview.tipo}</h3>
                <div className="space-y-1.5 max-h-[380px] overflow-auto pr-1">
                  {preview.jogos.slice(0, 14).map((j: any) => (
                    <div key={j.numero} className="flex justify-between text-xs bg-black/30 rounded-lg px-2.5 py-1.5">
                      <span className="text-zinc-400">#{j.numero} {j.mandante.slice(0,4)} x {j.visitante.slice(0,4)}</span>
                      <span className="font-mono text-white">{j.coluna_recomendada} <span className="text-zinc-600">({j.probabilidades.p1}/{j.probabilidades.pX}/{j.probabilidades.p2})</span></span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                  <div className="bg-black/40 rounded p-2"><div className="text-zinc-500">Duplo Auto</div><div className="text-white font-bold">J{preview.duplo_automatico.jogo}</div></div>
                  <div className="bg-black/40 rounded p-2"><div className="text-zinc-500">Volante</div><div className="text-white font-bold">{preview.volante_recomendado?.colunas.filter((c:string)=>c.length>1).length || 0}D + {preview.volante_recomendado?.colunas.filter((c:string)=>c.length>2).length || 0}T</div></div>
                  <div className="bg-black/40 rounded p-2"><div className="text-zinc-500">Status</div><div className="text-green-400 font-bold">{preview.status}</div></div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#161618] border border-dashed border-[#2A2A2E] p-8 text-center">
                <div className="text-zinc-600 text-sm">Cole o JSON da skill v2.1 FULL ao lado e clique em Validar</div>
                <div className="text-[11px] text-zinc-700 mt-2 font-mono">O admin valida com Zod, mostra preview e gera o comando git automaticamente. Zero custo, zero servidor.</div>
              </div>
            )}

            <div className="mt-4 rounded-xl bg-amber-500/5 border border-amber-500/10 p-3">
              <div className="text-xs font-bold text-amber-400">Fluxo completo:</div>
              <ol className="text-[11px] text-zinc-400 mt-1 list-decimal list-inside space-y-0.5">
                <li>Claude com skill v2.1 gera JSON</li>
                <li>Cole aqui e valide</li>
                <li>Salve em data/analises/{"{concurso}"}.json</li>
                <li>git add + commit + push</li>
                <li>Vercel deploya em 30s</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
