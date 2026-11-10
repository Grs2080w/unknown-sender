// Componente principal: junta o estado inicial e os módulos de lógica.
// (SP, EV, FILES, INTRO, QUIZ e TEXT são gerados a partir de src/data/*.json pelo build.mjs)
const LOGIC_MODULES = [DialogueLogic, FlowLogic, FilesLogic, QuizLogic, RenderLogic];

// Métodos usados diretamente como handlers no template precisam de `this` fixo
const BOUND_HANDLERS = ["dlgClick", "start", "answer", "startQuiz", "toMenu", "qNext"];

class Component extends DCLogic {
  state = {
    screen: "title", stage: -1, phase: "between", lives: 3, score: 0, app: null, sel: null,
    res: {}, reply: {}, insp: false, dlg: null, typed: 0, toast: null, files: {}, selFile: null, fmsg: null,
    qi: 0, qpick: null, qscore: 0, qres: [],
  };

  constructor(...args) {
    super(...args);
    BOUND_HANDLERS.forEach(n => { this[n] = this[n].bind(this); });
  }

  componentWillUnmount() { clearInterval(this.ti); }
}

LOGIC_MODULES.forEach(m => Object.assign(Component.prototype, m));
