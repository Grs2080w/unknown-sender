export default function TitleScreen({ v }) {
  return (
    <div className="absolute inset-0 bg-abyss flex flex-col items-center justify-center gap-[18px] z-20 text-center">
      <div className="font-silk text-mint text-[15px] tracking-[3px]">NEXORA LTDA. - PRIMEIRO DIA</div>
      <div className="font-silk font-bold text-amber text-[62px] leading-[.95] [text-shadow:4px_4px_0_#7a4a00]">
        REMETENTE<br />DESCONHECIDO
      </div>
      <div className="text-[#bfe9df] text-[25px] max-w-[560px] leading-[1.1]">
        Emails, ligacoes, mensagens e arquivos. Qualquer tarefa pode esconder um golpe.
      </div>
      <div className="flex gap-5 mt-2">
        <div onClick={v.start} className="btn-amber w-[300px] box-border font-silk text-[18px] px-[18px] py-[14px] leading-[1.2]">
          MODO INTERATIVO
          <div className="font-pixel text-[21px] mt-1">Viva um dia de trabalho</div>
        </div>
        <div onClick={v.startQuiz} className="btn-mint w-[300px] box-border font-silk text-[18px] px-[18px] py-[14px] leading-[1.2]">
          MODO QUIZ
          <div className="font-pixel text-[21px] mt-1">12 perguntas com a Marta</div>
        </div>
      </div>
    </div>
  );
}
