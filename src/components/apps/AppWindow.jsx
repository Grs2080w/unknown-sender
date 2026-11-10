// Janela de aplicativo da área de trabalho (barra de título azul + botão X)
export default function AppWindow({ title, onClose, children }) {
  return (
    <div className="absolute left-[118px] top-[14px] right-[14px] bottom-[50px] bg-beige bevel-static border-[3px] flex flex-col shadow-[6px_6px_0_#0006]">
      <div className="bg-gradient-to-r from-[#1d3a8a] to-[#4a6fd8] text-white flex justify-between items-center px-2 py-[3px] font-silk text-[14px]">
        <span>{title}</span>
        <span onClick={onClose} className="cursor-pointer bg-beige text-ink px-2 bevel">X</span>
      </div>
      {children}
    </div>
  );
}
