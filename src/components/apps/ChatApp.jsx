import AppWindow from "./AppWindow.jsx";

export default function ChatApp({ v }) {
  return (
    <AppWindow title="CHAT NEXORA" onClose={v.closeApp}>
      {v.noChat && <div className="p-[30px] text-[24px] text-bark">Nenhuma conversa nova.</div>}
      {v.hasChat && (
        <div className="flex-1 flex flex-col min-h-0 bg-cream">
          <div className="px-4 py-2 border-b-2 border-sand text-[24px] flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] border-2 border-ink flex items-center justify-center font-silk text-[14px]" style={{ background: v.chat.c }}>{v.chat.i}</div>
            {v.chat.name}
          </div>
          <div className="flex-1 overflow-auto px-4 py-[14px] flex flex-col gap-2">
            {v.chatMsgs.map((b, i) => (
              <div key={i} className="max-w-[70%] border-2 border-bark px-3 py-[6px] text-[22px] leading-[1.1]" style={{ alignSelf: b.side, background: b.bg }}>{b.t}</div>
            ))}
          </div>
          {v.chatCan && (
            <div className="px-4 py-[10px] border-t-2 border-sand bg-beige flex flex-col gap-2">
              {v.chatChoices.map((c, i) => (
                <div key={i} onClick={c.go} className="text-[20px] px-3 py-[6px] bg-[#f6f2e4] bevel cursor-pointer">{c.t}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </AppWindow>
  );
}
