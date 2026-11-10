// Caixa de diálogo estilo Visual Novel: texto digitado letra a letra, clique para avançar.
const DialogueLogic = {
  // lines: [{sp, t}], cb: chamado ao fim, choices: [{t, go}] opcionais na última fala
  say(lines, cb, choices) {
    clearInterval(this.ti);
    this.cb = cb || null;
    this.setState({ dlg: { lines, i: 0, choices: choices || null }, typed: 0 }, () => this.type());
  },

  type() {
    clearInterval(this.ti);
    const sp = this.props.textSpeed ?? 2;
    this.ti = setInterval(() => {
      const d = this.state.dlg;
      if (!d) { clearInterval(this.ti); return; }
      if (this.state.typed >= d.lines[d.i].t.length) { clearInterval(this.ti); return; }
      this.setState(s => ({ typed: s.typed + sp }));
    }, 22);
  },

  dlgClick() {
    const d = this.state.dlg;
    if (!d) return;
    const len = d.lines[d.i].t.length;
    // 1º clique completa o texto
    if (this.state.typed < len) { clearInterval(this.ti); this.setState({ typed: len }); return; }
    // próxima fala
    if (d.i < d.lines.length - 1) { this.setState({ dlg: { ...d, i: d.i + 1 }, typed: 0 }, () => this.type()); return; }
    // última fala com escolhas: espera o jogador escolher
    if (d.choices) return;
    this.setState({ dlg: null });
    const cb = this.cb;
    this.cb = null;
    cb && cb();
  },
};
