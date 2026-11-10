// Efeito de monitor antigo (linhas de varredura + vinheta)
export default function Crt({ opacity }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-30 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,.18)_0_1px,transparent_1px_3px),radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,.45))]"
      style={{ opacity }}
    />
  );
}
