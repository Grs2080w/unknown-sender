const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

// Telefone fixo: clique no fone quando estiver tocando para atender
export default function Phone({ v }) {
  const { ringing } = v;
  return (
    <div className="w-[200px] flex flex-col items-center gap-[10px] pb-[6px]">
      <div className="font-silk text-[12px] text-[#c9bf9f] tracking-[2px]">RAMAL 204</div>
      <div className="w-[190px] px-3 pt-[14px] pb-4 box-border bg-[#d8d0b8] rounded-t-[14px] rounded-b-[20px] shadow-[inset_0_0_0_3px_#efe8d2,inset_0_-6px_0_#b9b095,0_10px_24px_#000a] flex flex-col items-center gap-3">
        <div
          onClick={v.answer}
          className={`w-[150px] h-[46px] rounded-[23px] bg-[#2b2722] shadow-[inset_0_4px_0_#4a443b,0_4px_0_#0006] flex items-center justify-between px-[10px] box-border ${ringing ? "cursor-pointer animate-ring" : "cursor-default"}`}
        >
          <div className="w-[34px] h-[30px] rounded-[15px] bg-[#3d372f]" />
          <div className="w-[34px] h-[30px] rounded-[15px] bg-[#3d372f]" />
        </div>
        <div className="grid grid-cols-3 gap-[6px] w-full">
          {KEYS.map((k) => (
            <div key={k} className="h-6 bg-paper border-2 [border-color:#fff_#8a8168_#8a8168_#fff] flex items-center justify-center text-[18px]">{k}</div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[17px] text-bark">
          <div className={`w-3 h-3 rounded-full ${ringing ? "bg-[#e04a3f]" : "bg-stone"}`} />
          {v.phoneLabel}
        </div>
      </div>
    </div>
  );
}
