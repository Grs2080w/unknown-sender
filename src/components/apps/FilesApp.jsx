import AppWindow from "./AppWindow.jsx";

export default function FilesApp({ v }) {
  return (
    <AppWindow title="ARQUIVOS - C:\Downloads" onClose={v.closeApp}>
      {v.filesIdle && <div className="p-[30px] text-[24px] text-bark">{v.filesIdleMsg}</div>}
      {v.filesActive && (
        <div className="flex-1 flex min-h-0">
          {/* lista de arquivos */}
          <div className="flex-1 overflow-auto bg-cream p-2 flex flex-col gap-[6px]">
            {v.files.map((f, i) => (
              <button
                type="button"
                key={i}
                onClick={f.pick}
                className="w-full text-left flex items-center gap-3 px-[10px] py-[6px] border-2 cursor-pointer"
                style={{ borderColor: f.bd, background: f.bg, opacity: f.op }}
              >
                <span className="w-[34px] h-10 bg-white border-2 border-bark font-silk text-[10px] flex items-end justify-center pb-[2px]">{f.ext}</span>
                <span className="flex-1 text-[23px]">{f.n}</span>
                <span className="text-[19px] text-stone">{f.kb}</span>
                <span className="text-[17px] min-w-[96px] text-right font-bold">{f.status}</span>
              </button>
            ))}
          </div>

          {/* detalhes */}
          <div className="w-[300px] border-l-[3px] border-stone px-[14px] py-3 flex flex-col gap-2 bg-beige text-[20px] leading-[1.1]">
            {v.hasFile && (
              <div className="flex flex-col gap-2">
                <div className="font-silk text-[12px]">DETALHES</div>
                <div className="text-[23px] break-all">{v.sf.n}</div>
                <div>Tipo: <b>{v.sf.type}</b></div>
                <div>Origem: <b>{v.sf.orig}</b></div>
                {v.fileOpen && (
                  <div className="flex flex-col gap-2 mt-[6px]">
                    <button type="button" onClick={v.fMove} className="px-[10px] py-[7px] bg-okbg bevel [--lo:#2c6a37] cursor-pointer text-center">Mover para Documentos</button>
                    <button type="button" onClick={v.fQuar} className="px-[10px] py-[7px] bg-badbg bevel [--lo:#8c2a22] cursor-pointer text-center">Enviar para Quarentena</button>
                  </div>
                )}
              </div>
            )}
            {v.noFile && <div className="text-stone">Clique em um arquivo para ver os detalhes.</div>}
            {v.hasFmsg && (
              <div className="mt-auto px-[10px] py-2 border-2 border-bark" style={{ background: v.fmsgBg }}>{v.fmsg}</div>
            )}
          </div>
        </div>
      )}
    </AppWindow>
  );
}
