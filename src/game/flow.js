import { EV, INTRO } from "./data.js";
// Fluxo do modo interativo: início, avanço de eventos, resolução de respostas, fim de jogo.
export const FlowLogic = {
  maxL() { return this.props.lives ?? 3; },

  start() {
    clearInterval(this.ti);
    this.setState({
      screen: "play", stage: -1, phase: "between", lives: this.maxL(), score: 0,
      app: null, sel: null, res: {}, reply: {}, insp: false, files: {}, selFile: null, fmsg: null, toast: null,
    }, () => this.say(INTRO, () => this.next()));
  },

  // Agenda o próximo evento da lista EV (ou encerra se acabaram)
  next() {
    const s = this.state.stage + 1;
    if (s >= EV.length) { this.end(true); return; }
    setTimeout(() => {
      if (this.state.screen !== "play") return;
      const ev = EV[s];
      this.setState({
        stage: s, phase: "active", toast: ev.hint, insp: false,
        sel: ev.type === "email" ? ev.id : this.state.sel,
      }, () => {
        setTimeout(() => this.setState({ toast: null }), 5000);
        if (ev.type === "scene") this.scene();
      });
    }, 1600);
  },

  end(win) {
    clearInterval(this.ti);
    this.setState({ screen: "end", app: null, dlg: null, toast: null });
  },

  // Aplica pontos/escudos e mostra o feedback da Marta antes do próximo evento
  resolve(ok, hurt, fb, id, label) {
    const lives = this.state.lives - (!ok && hurt ? 1 : 0);
    const score = Math.max(0, this.state.score + (ok ? 100 : -50));
    this.setState(s => ({ lives, score, phase: "between", res: { ...s.res, [id]: { ok, label } } }));
    this.say(fb.map(t => ({ sp: "marta", t })), () => lives <= 0 ? this.end(false) : this.next());
  },

  // Evento de cena (Bia chega à mesa) — diálogo com escolhas
  scene() {
    const ev = EV[this.state.stage];
    this.say(
      ev.lines.map(t => ({ sp: "bia", t })),
      null,
      ev.ch.map(c => ({ t: c.t, go: () => this.resolve(c.ok, !c.ok, c.fb, ev.id, "") }))
    );
  },

  // Atender o telefone fixo
  answer() {
    const ev = EV[this.state.stage];
    if (!ev || ev.type !== "phone" || this.state.phase !== "active") return;
    this.setState({ phase: "call", toast: null });
    this.say(
      ev.lines.map(t => ({ sp: "ti", t })),
      null,
      ev.ch.map(c => ({ t: c.t, go: () => this.resolve(c.ok, !c.ok, c.fb, ev.id, "") }))
    );
  },

  openApp(a) { this.setState({ app: a, toast: null }); },

  chatPick(i) {
    const ev = EV[this.state.stage], c = ev.ch[i];
    this.setState(s => ({ reply: { ...s.reply, [ev.id]: c.reply } }));
    this.resolve(c.ok, c.hurt, c.fb, ev.id, "");
  },

  toMenu() { clearInterval(this.ti); this.setState({ screen: "title", dlg: null }); },
};
