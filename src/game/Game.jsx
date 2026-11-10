import React from "react";
import { CONFIG } from "./data.js";
import { DialogueLogic } from "./dialogue.js";
import { FlowLogic } from "./flow.js";
import { FilesLogic } from "./files-app.js";
import { QuizLogic } from "./quiz.js";
import { RenderLogic } from "./render.js";
import Monitor from "../components/Monitor.jsx";
import Phone from "../components/Phone.jsx";

const LOGIC_MODULES = [DialogueLogic, FlowLogic, FilesLogic, QuizLogic, RenderLogic];

// Métodos usados diretamente como handlers nos componentes precisam de `this` fixo
const BOUND_HANDLERS = ["dlgClick", "start", "answer", "startQuiz", "toMenu", "qNext"];

// Componente principal: guarda o estado do jogo e junta os módulos de lógica.
// O conteúdo vem de src/data/*.json (ver game/data.js).
export default class Game extends React.Component {
  static defaultProps = CONFIG; // lives, textSpeed, crt

  state = {
    screen: "title", stage: -1, phase: "between", lives: 3, score: 0, app: null, sel: null,
    res: {}, reply: {}, insp: false, dlg: null, typed: 0, toast: null, files: {}, selFile: null, fmsg: null,
    qi: 0, qpick: null, qscore: 0, qres: [],
  };

  constructor(props) {
    super(props);
    BOUND_HANDLERS.forEach((n) => { this[n] = this[n].bind(this); });
  }

  componentWillUnmount() { clearInterval(this.ti); }

  render() {
    const v = this.renderVals();
    return (
      <div className="min-h-screen box-border p-6 flex items-center justify-center font-pixel text-ink bg-[radial-gradient(ellipse_at_50%_30%,#2a241b,#120f0a)]">
        <div className="flex gap-7 items-end">
          <Monitor v={v} />
          <Phone v={v} />
        </div>
      </div>
    );
  }
}

LOGIC_MODULES.forEach((m) => Object.assign(Game.prototype, m));
