// Fim do modo interativo
export default function EndScreen({ v }) {
  return (
    <div className="absolute inset-0 bg-abyss flex flex-col items-center justify-center gap-3 z-20 text-center px-[60px]">
      <div className="font-silk text-mint text-[15px] tracking-[3px]">{v.endKicker}</div>
      <div className="font-silk font-bold text-[42px] leading-none" style={{ color: v.endColor }}>{v.endTitle}</div>
      <div className="text-white text-[26px]">
        Pontos: <b>{v.score}</b> &nbsp;|&nbsp; Escudos restantes: <b>{v.lives}</b>
      </div>
      <div className="bg-[#12302e] border-2 border-[#2f6b66] px-[22px] py-3 text-left text-[#d6f3ec] text-[23px] leading-[1.1] max-w-[700px]">
        <div className="font-silk text-[13px] text-amber mb-[6px]">O QUE LEVAR DESTE DIA</div>
        {v.lessons.map((l, i) => (
          <div key={i} className="mb-1">&#9658; {l.t}</div>
        ))}
      </div>
      <div onClick={v.start} className="btn-amber mt-[6px] font-silk text-[18px] px-6 py-[10px]">JOGAR DE NOVO</div>
    </div>
  );
}
