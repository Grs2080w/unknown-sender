// Barra de tarefas: menu, dica da tarefa atual, escudos (vidas), pontos e relógio
export default function Taskbar({ v }) {
  return (
    <div className="absolute left-0 right-0 bottom-0 h-9 bg-sand border-t-[3px] border-white flex items-center gap-[14px] px-[10px] box-border text-[21px]">
      <div className="font-silk text-[13px] px-[10px] py-[3px] bg-beige bevel">NEXORA OS</div>
      <button type="button" onClick={v.toMenu} className="font-silk text-[13px] px-[10px] py-[3px] bg-badbg bevel [--lo:#8c2a22] cursor-pointer">MENU</button>
      <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{v.hint}</div>
      <div className="flex gap-1 items-center">
        <span className="text-[18px] mr-1">Escudos</span>
        {v.shields.map((sh, i) => (
          <div key={i} className="w-4 h-5 border-2 border-ink rounded-[2px_2px_8px_8px]" style={{ background: sh.c }} />
        ))}
      </div>
      <div>Pontos: <b>{v.score}</b></div>
      <div className="px-[10px] py-[2px] border-2 [border-color:#6b6552_#fff_#fff_#6b6552] bg-beige">{v.clock}</div>
    </div>
  );
}
