// Valores usados pelo template (os {{ ... }} do HTML), divididos por área da tela.
const RenderLogic = {
  // Valores derivados compartilhados entre as áreas
  derive() {
    const s = this.state, P = this.props;
    const ev = EV[s.stage], act = !!ev && s.phase === "active";
    const chatEv = EV.slice(0, Math.max(0, s.stage + 1)).reverse().find(e => e.type === "chat");
    const chatCan = !!chatEv && act && ev.id === chatEv.id;
    const ringing = !!ev && ev.type === "phone" && s.phase === "active";
    return { s, P, ev, act, chatEv, chatCan, ringing };
  },

  renderVals() {
    const c = this.derive();
    return {
      ...this.quizVals(),
      ...this.screenVals(c),
      ...this.desktopVals(c),
      ...this.emailVals(c),
      ...this.filesVals(c),
      ...this.chatVals(c),
      ...this.hudVals(c),
      ...this.dialogVals(c),
      ...this.phoneVals(c),
    };
  },

  // Qual tela está ativa + tela final do modo interativo
  screenVals({ s }) {
    const M = this.maxL(), R = TEXT.ranks;
    const rank = s.lives <= 0 ? R.dead : s.lives >= M ? R.perfect : s.lives > 1 ? R.good : R.close;
    return {
      screenTitle: s.screen === "title", screenPlay: s.screen === "play", screenEnd: s.screen === "end",
      start: this.start,
      endKicker: R.kicker, endTitle: rank.title, endColor: rank.color,
      lessons: TEXT.lessons.map(t => ({ t })),
    };
  },

  // Ícones da área de trabalho e abertura/fechamento de apps
  desktopVals({ s, ev, act, chatEv, chatCan }) {
    const mkIc = (k, label, glyph, bg, badge) => ({ label, glyph, bg, badge, go: () => this.openApp(k) });
    return {
      icons: [
        mkIc("email", "Email", "@", "#9fc4f5", !!ev && ev.type === "email" && act),
        mkIc("files", "Arquivos", "[]", "#f5d98a", !!ev && ev.type === "files" && act),
        mkIc("chat", "Chat", "...", "#b9e6b0", !!chatEv && chatCan),
      ],
      showEmail: s.app === "email", showFiles: s.app === "files", showChat: s.app === "chat",
      closeApp: () => this.setState({ app: null }),
    };
  },

  emailVals({ s, ev, act }) {
    const T = TEXT.email;
    const emails = EV.filter((e, i) => e.type === "email" && i <= s.stage).map(e => {
      const r = s.res[e.id];
      return {
        from: e.from, subject: e.subject, time: e.time,
        tag: r ? r.label.toUpperCase() : "NOVO",
        tagBg: r ? (r.ok ? "#bfe3c4" : "#f2a9a2") : "#ffd34d",
        bg: s.sel === e.id ? "#cfe0f5" : "transparent",
        pick: () => this.setState({ sel: e.id, insp: false }),
      };
    }).reverse();
    const se0 = EV.find(e => e.id === s.sel && e.type === "email");
    const se = se0 ? { ...se0, body: se0.body.map(t => ({ t })), hasLink: !!se0.url, hasAttach: !!se0.attach, linkLabel: se0.linkLabel } : {};
    const canAct = !!se0 && act && ev.id === se0.id, rs = se0 && s.res[se0.id];
    return {
      emails, noEmails: emails.length === 0, se, hasSel: !!se0, noSel: !se0, canAct,
      resolvedSel: !!se0 && !canAct,
      selResult: rs ? (rs.ok ? T.resultOk : T.resultBad) + " (" + rs.label + ")" : T.resultPending,
      insp: s.insp, toggleInsp: () => this.setState({ insp: !s.insp }),
      doAct: () => this.resolve(se0.legit, !se0.legit, se0.legit ? se0.good : se0.bad, se0.id, T.labelActed),
      doReport: () => this.resolve(!se0.legit, false, se0.legit ? se0.bad : se0.good, se0.id, T.labelReported),
    };
  },

  filesVals({ s, ev }) {
    const T = TEXT.files;
    const sf0 = FILES.find(f => f.n === s.selFile);
    const filesActive = !!ev && ev.type === "files" && (s.phase === "active" || Object.keys(s.files).length > 0);
    const fileOpen = !!sf0 && !s.files[sf0.n];
    return {
      filesActive, filesIdle: !filesActive, filesIdleMsg: s.res.e4 ? T.idleDone : T.idleNone,
      files: FILES.map(f => {
        const st = s.files[f.n];
        return {
          n: f.n, ext: f.ext, kb: f.kb,
          status: st ? (st === "move" ? T.statusMoved : T.statusQuarantine) : "",
          op: st ? 0.55 : 1,
          bd: s.selFile === f.n ? "#1d4fb8" : "#cfc7ae",
          bg: s.selFile === f.n ? "#dbe8fa" : "#fffdf5",
          pick: () => this.setState({ selFile: f.n }),
        };
      }),
      hasFile: !!sf0, noFile: !sf0, sf: sf0 || {}, fileOpen,
      fMove: () => this.fileAct("move"), fQuar: () => this.fileAct("quar"),
      hasFmsg: !!s.fmsg, fmsg: s.fmsg ? s.fmsg.t : "", fmsgBg: s.fmsg && s.fmsg.ok ? "#bfe3c4" : "#f2a9a2",
    };
  },

  chatVals({ s, chatEv, chatCan }) {
    let chatMsgs = [];
    if (chatEv) {
      chatMsgs = chatEv.msgs.map(t => ({ t, side: "flex-start", bg: "#e8e2cf" }));
      if (s.reply[chatEv.id]) chatMsgs.push({ t: s.reply[chatEv.id], side: "flex-end", bg: "#bfe3c4" });
    }
    return {
      hasChat: !!chatEv, noChat: !chatEv, chat: chatEv || {}, chatMsgs, chatCan,
      chatChoices: chatEv ? chatEv.ch.map((c, i) => ({ t: c.t, go: () => this.chatPick(i) })) : [],
    };
  },

  // Barra de tarefas (dica, escudos, pontos, relógio), toast e efeito CRT
  hudVals({ s, P, ev, act }) {
    const M = this.maxL();
    return {
      crtOpacity: P.crt === false ? 0 : 1,
      hasToast: !!s.toast, toast: s.toast,
      hint: ev && act ? ev.hint : (s.stage < 0 ? TEXT.hints.preparing : TEXT.hints.waiting),
      shields: Array.from({ length: M }, (_, i) => ({ c: i < s.lives ? "#3fae5a" : "#8a8168" })),
      score: s.score, lives: s.lives, clock: ev ? ev.time : TEXT.clockStart,
    };
  },

  // Caixa de diálogo (personagem, texto digitado, setinha, escolhas)
  dialogVals({ s }) {
    const d = s.dlg, dl = d && d.lines[d.i], dd = d && s.typed >= dl.t.length;
    const showCh = !!d && !!d.choices && d.i === d.lines.length - 1 && dd;
    return {
      hasDlg: !!d, dlgClick: this.dlgClick,
      dsp: dl ? SP[dl.sp] : { n: "", c: "#fff", i: "" },
      dtext: dl ? dl.t.slice(0, s.typed) : "",
      dArrow: !!d && dd && !showCh, dChoices: showCh,
      choices: showCh ? d.choices.map(c => ({ t: c.t, go: () => { this.setState({ dlg: null }); c.go(); } })) : [],
    };
  },

  // Telefone fixo ao lado do monitor
  phoneVals({ ringing }) {
    const handset = React.createElement("div",
      {
        onClick: this.answer,
        style: {
          width: 150, height: 46, borderRadius: 23, background: "#2b2722",
          boxShadow: "inset 0 4px 0 #4a443b, 0 4px 0 #0006",
          cursor: ringing ? "pointer" : "default", animation: ringing ? "ring .5s infinite" : "none",
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", boxSizing: "border-box",
        },
      },
      React.createElement("div", { style: { width: 34, height: 30, borderRadius: 15, background: "#3d372f" } }),
      React.createElement("div", { style: { width: 34, height: 30, borderRadius: 15, background: "#3d372f" } })
    );
    return {
      phoneHandset: handset,
      ledColor: ringing ? "#e04a3f" : "#6b6552",
      phoneLabel: ringing ? TEXT.phone.ringing : TEXT.phone.idle,
      keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(k => ({ k })),
    };
  },
};
