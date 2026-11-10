// Resultado do modo quiz
export default function QuizEndScreen({ v }) {
  return (
    <div className="absolute inset-0 bg-abyss flex flex-col items-center justify-center gap-3 z-20 text-center px-[60px]">
      <div className="font-silk text-mint text-[15px] tracking-[3px]">QUIZ FINALIZADO</div>
      <div className="font-silk font-bold text-[40px] leading-none" style={{ color: v.qEndColor }}>{v.qEndTitle}</div>
      <div className="text-white text-[26px]">
        Acertos: <b>{v.qCorrect}/{v.qTotal}</b> &nbsp;|&nbsp; Pontos: <b>{v.qScore}</b>
      </div>
      <div className="bg-[#12302e] border-2 border-[#2f6b66] px-[22px] py-3 text-left text-[#d6f3ec] text-[23px] leading-[1.1] min-w-[420px]">
        <div className="font-silk text-[13px] text-amber mb-[6px]">ACERTOS POR TEMA</div>
        {v.qCats.map((c, i) => (
          <div key={i} className="flex justify-between gap-[30px] mb-[3px]">
            <span>{c.n}</span>
            <b style={{ color: c.col }}>{c.r}</b>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-[6px]">
        <button type="button" onClick={v.startQuiz} className="btn-amber font-silk text-[16px] px-[22px] py-[10px]">REFAZER QUIZ</button>
        <button type="button" onClick={v.toMenu} className="btn-mint font-silk text-[16px] px-[22px] py-[10px]">MENU</button>
      </div>
    </div>
  );
}
