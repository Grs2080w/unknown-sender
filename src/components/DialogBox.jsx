// Caixa de diálogo estilo Visual Novel (retrato + nome + texto digitado + escolhas)
export default function DialogBox({ v }) {
  const { dsp } = v;
  return (
    <div
      role="button"
      tabIndex={0}
      autoFocus
      aria-label="Avançar diálogo"
      onClick={v.dlgClick}
      onKeyDown={(e) => {
        // Enter/Espaço avançam o diálogo (só quando o foco está na caixa, não nas escolhas)
        if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          v.dlgClick();
        }
      }}
      className="absolute left-0 right-0 top-0 bottom-9 bg-[rgba(8,18,22,.5)] flex items-end px-4 pb-[14px] box-border cursor-pointer z-10 outline-none">
      <div className="flex gap-3 items-end w-full">
        <div
          className="w-[128px] h-[150px] flex-none border-[3px] border-ink flex items-center justify-center font-silk font-bold text-[64px] text-ink shadow-[5px_5px_0_#0007]"
          style={{ background: dsp.c }}
        >
          {dsp.i}
        </div>
        <div className="flex-1 relative bg-paper border-[3px] border-ink shadow-[5px_5px_0_#0007] pt-[22px] px-5 pb-[14px] min-h-[110px] box-border">
          <div
            className="absolute -top-[17px] left-[14px] border-[3px] border-ink px-3 font-silk text-[14px] leading-[26px]"
            style={{ background: dsp.c }}
          >
            {dsp.n}
          </div>
          <div className="text-[26px] leading-[1.1] min-h-[84px]">{v.dtext}</div>
          {v.dArrow && <div className="absolute right-4 bottom-2 animate-blink text-[22px]">&#9660;</div>}
          {v.dChoices && (
            <div className="flex flex-col gap-2 mt-[6px]">
              {v.choices.map((c, i) => (
                <button type="button" key={i} onClick={c.go} className="text-left text-[22px] leading-[1.05] px-3 py-[7px] bg-white border-2 border-ink cursor-pointer hover:bg-sun">
                  &#9658; {c.t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
