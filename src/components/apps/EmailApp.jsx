import AppWindow from "./AppWindow.jsx";

export default function EmailApp({ v }) {
  const { se } = v;
  return (
    <AppWindow title="EMAIL - Caixa de entrada" onClose={v.closeApp}>
      <div className="flex-1 flex min-h-0">
        {/* lista de emails */}
        <div className="w-[260px] border-r-[3px] border-stone overflow-auto bg-[#f6f2e4]">
          {v.noEmails && <div className="p-4 text-[20px] text-[#5b5646]">Caixa vazia.</div>}
          {v.emails.map((m, i) => (
            <button type="button" key={i} onClick={m.pick} className="block w-full text-left px-[10px] py-2 border-b-2 border-sand cursor-pointer" style={{ background: m.bg }}>
              <span className="text-[20px] font-bold flex justify-between gap-[6px]">
                <span>{m.from}</span>
                <span className="font-silk text-[11px] px-1 py-[2px] text-ink self-start" style={{ background: m.tagBg }}>{m.tag}</span>
              </span>
              <span className="block text-[19px] text-bark">{m.subject}</span>
              <span className="block text-[16px] text-stone">{m.time}</span>
            </button>
          ))}
        </div>

        {/* leitura */}
        <div className="flex-1 flex flex-col min-w-0 bg-cream">
          {v.hasSel && (
            <div className="flex flex-col h-full min-h-0">
              <div className="px-4 py-[10px] border-b-2 border-sand">
                <div className="text-[26px] leading-none">{se.subject}</div>
                <div className="text-[20px] text-bark mt-1">De: <b>{se.from}</b> &nbsp; Para: voce</div>
              </div>
              <div className="flex-1 overflow-auto px-4 py-3 text-[21px] leading-[1.15]">
                {se.body.map((p, i) => <p key={i} className="m-0 mb-[10px]">{p.t}</p>)}
                {se.hasLink && (
                  <div className="my-[6px] mb-[10px]">
                    <span className="inline-block bg-link text-white px-[14px] py-[5px] bevel-static border-2 [--hi:#7fa0ee] [--lo:#0e2a6b]">{se.linkLabel}</span>
                  </div>
                )}
                {se.hasAttach && (
                  <div className="inline-flex gap-2 items-center border-2 border-dashed border-stone px-[10px] py-1 bg-[#f1ecd8]">Anexo: {se.attach}</div>
                )}
                {v.insp && (
                  <div className="mt-3 bg-[#fff3c4] border-2 border-[#b8860b] px-3 py-2 text-[19px] leading-[1.1]">
                    <div className="font-silk text-[12px] mb-1">INSPECAO</div>
                    <div>Endereco real do remetente: <b>{se.addr}</b></div>
                    {se.hasLink && <div>O link leva para: <b>{se.url}</b></div>}
                    {se.hasAttach && <div>Tipo real do anexo: <b>{se.attachType}</b></div>}
                  </div>
                )}
              </div>
              <div className="px-4 py-[10px] border-t-2 border-sand flex gap-[10px] flex-wrap items-center bg-beige">
                {v.canAct && (
                  <div className="flex gap-[10px] flex-wrap">
                    <button type="button" onClick={v.toggleInsp} className="text-[20px] px-[14px] py-[6px] bg-sun bevel [--lo:#8a6d00] cursor-pointer">Inspecionar mensagem</button>
                    <button type="button" onClick={v.doAct} className="text-[20px] px-[14px] py-[6px] bg-beige bevel cursor-pointer">{se.act}</button>
                    <button type="button" onClick={v.doReport} className="text-[20px] px-[14px] py-[6px] bg-badbg bevel [--lo:#8c2a22] cursor-pointer">Denunciar como phishing</button>
                  </div>
                )}
                {v.resolvedSel && <div className="text-[20px] text-bark">Status: <b>{v.selResult}</b></div>}
              </div>
            </div>
          )}
          {v.noSel && <div className="p-[30px] text-[22px] text-stone">Selecione um email.</div>}
        </div>
      </div>
    </AppWindow>
  );
}
