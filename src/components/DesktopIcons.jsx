export default function DesktopIcons({ v }) {
  return (
    <div className="absolute left-4 top-4 flex flex-col gap-[14px]">
      {v.icons.map((ic, i) => (
        <div key={i} onClick={ic.go} className="w-[84px] flex flex-col items-center gap-1 cursor-pointer relative">
          <div
            className="bevel-static border-[3px] w-14 h-14 flex items-center justify-center font-silk text-[26px] font-bold text-ink"
            style={{ background: ic.bg }}
          >
            {ic.glyph}
          </div>
          <div className="text-white text-[20px] [text-shadow:1px_1px_0_#0b2523]">{ic.label}</div>
          {ic.badge && (
            <div className="absolute -top-[6px] right-[6px] w-[22px] h-[22px] rounded-full bg-[#e04a3f] border-2 border-white text-white text-[16px] leading-[19px] text-center animate-pop">!</div>
          )}
        </div>
      ))}
    </div>
  );
}
