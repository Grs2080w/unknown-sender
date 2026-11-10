export default function Toast({ text }) {
  return (
    <div className="absolute top-[14px] right-[14px] bg-sun border-[3px] border-ink px-[14px] py-2 text-[22px] shadow-[4px_4px_0_#0006] animate-pop-fast z-[5]">
      {text}
    </div>
  );
}
