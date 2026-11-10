// Modo quiz: cenário (opcional) + pergunta + alternativas + feedback da Marta
export default function QuizScreen({ v }) {
  return (
    <div className="absolute inset-0 bg-teal z-20">
      <div className="absolute inset-0 grid-bg" />

      {/* barra superior */}
      <div className="absolute left-0 right-0 top-0 h-11 bg-sand border-b-[3px] border-bark flex items-center gap-[14px] px-3 box-border text-[22px]">
        <button type="button" onClick={v.toMenu} className="font-silk text-[12px] px-[10px] py-1 bg-beige bevel cursor-pointer">MENU</button>
        <div className="font-silk text-[13px]">QUIZ {v.qNum}/{v.qTotal}</div>
        <div className="flex-1 h-[14px] bg-beige border-2 border-bark">
          <div className="h-full bg-[#3fae5a]" style={{ width: v.qPct }} />
        </div>
        <div className="bg-sun border-2 border-ink px-[10px] text-[20px]">{v.qCat}</div>
        <div>Pontos: <b>{v.qScore}</b></div>
      </div>

      <div className="absolute left-5 right-5 top-[60px] flex gap-5 items-start">
        {v.hasScn && (
          <div className="w-[330px] flex-none bg-cream bevel-static border-[3px] shadow-[5px_5px_0_#0006]">
            <div className="bg-gradient-to-r from-[#1d3a8a] to-[#4a6fd8] text-white font-silk text-[13px] px-2 py-[3px]">{v.scn.kind}</div>
            <div className="px-[14px] py-[10px] text-[21px] leading-[1.1]">
              <div className="text-stone">De: <b className="text-ink break-all">{v.scn.from}</b></div>
              {v.scn.hasSubj && <div className="mt-[2px] text-[23px] break-all"><b>{v.scn.subject}</b></div>}
              <div className="mt-2 border-t-2 border-dashed border-sand pt-2">
                {v.scn.lines.map((ln, i) => (
                  <div key={i} className="mb-[6px] break-words">{ln.t}</div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col gap-[10px]">
          <div className="bg-paper border-[3px] border-ink shadow-[5px_5px_0_#0007] px-4 py-[10px] text-[27px] leading-[1.05]">{v.qPrompt}</div>
          {v.qOpts.map((o, i) => (
            <button
              type="button"
              key={i}
              onClick={o.go}
              className="text-left flex gap-3 items-center text-[22px] leading-[1.05] px-3 py-[7px] border-2 border-ink cursor-pointer hover:outline hover:outline-[3px] hover:outline-sun"
              style={{ background: o.bg, opacity: o.op }}
            >
              <span className="flex-none w-7 h-7 bg-ink text-sun font-silk text-[14px] flex items-center justify-center">{o.l}</span>
              <span>{o.t}</span>
            </button>
          ))}
        </div>
      </div>

      {v.qAnswered && (
        <div className="absolute left-4 right-4 bottom-[14px] flex gap-3 items-end">
          <div className="w-24 h-[118px] flex-none bg-[#4fc3b8] border-[3px] border-ink flex items-center justify-center font-silk font-bold text-[48px] shadow-[5px_5px_0_#0007]">M</div>
          <div className="flex-1 relative bg-paper border-[3px] border-ink shadow-[5px_5px_0_#0007] pt-5 px-[18px] pb-3 box-border">
            <div className="absolute -top-[17px] left-[14px] border-[3px] border-ink px-3 font-silk text-[14px] leading-[26px]" style={{ background: v.qFbColor }}>
              {v.qFbTitle}
            </div>
            <div className="text-[23px] leading-[1.05] pr-[150px]">{v.qExplain}</div>
            <button type="button" onClick={v.qNext} className="btn-amber absolute right-[14px] bottom-3 font-silk text-[13px] px-[14px] py-2">{v.qNextLabel}</button>
          </div>
        </div>
      )}
    </div>
  );
}
