import PlayScreen from "./screens/PlayScreen.jsx";
import DialogBox from "./DialogBox.jsx";
import TitleScreen from "./screens/TitleScreen.jsx";
import EndScreen from "./screens/EndScreen.jsx";
import QuizScreen from "./screens/QuizScreen.jsx";
import QuizEndScreen from "./screens/QuizEndScreen.jsx";
import Crt from "./Crt.jsx";

// Moldura do monitor (NX-9000) e a tela ativa dentro dele
export default function Monitor({ v }) {
  return (
    <div className="w-[1040px] h-[660px] box-border p-[22px] rounded-[20px] bg-[#d8d0b8] shadow-[inset_0_0_0_3px_#efe8d2,inset_0_-8px_0_#b9b095,0_18px_40px_#000a] relative">
      <div className="relative w-[996px] h-[616px] overflow-hidden rounded-[10px] bg-teal shadow-[inset_0_0_0_4px_#0b2523,0_0_0_4px_#a69e86]">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute right-[30px] bottom-[70px] font-silk font-bold text-[44px] text-white/[.09] tracking-[2px]">NEXORA</div>

        {v.screenPlay && <PlayScreen v={v} />}
        {v.hasDlg && <DialogBox v={v} />}
        {v.screenTitle && <TitleScreen v={v} />}
        {v.screenEnd && <EndScreen v={v} />}
        {v.screenQuiz && <QuizScreen v={v} />}
        {v.screenQEnd && <QuizEndScreen v={v} />}
        <Crt opacity={v.crtOpacity} />
      </div>
      <div className="absolute left-1/2 bottom-1 -translate-x-1/2 font-silk text-[10px] text-[#8a8168] tracking-[2px]">NX-9000</div>
    </div>
  );
}
