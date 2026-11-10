// Modo Quiz: perguntas vêm de src/data/quiz/questions.json (injetadas como QUIZ).
const QuizLogic = {
  startQuiz() {
    clearInterval(this.ti);
    this.setState({ screen: "quiz", qi: 0, qpick: null, qscore: 0, qres: [], dlg: null });
  },

  qPick(i) {
    const s = this.state;
    if (s.qpick !== null) return;
    const q = this.Q[s.qi], ok = i === q.answer;
    this.setState({ qpick: i, qscore: s.qscore + (ok ? 100 : 0), qres: [...s.qres, { cat: q.cat, ok }] });
  },

  qNext() {
    const s = this.state;
    if (s.qi + 1 >= this.Q.length) this.setState({ screen: "qend" });
    else this.setState({ qi: s.qi + 1, qpick: null });
  },

  // Valores do template para as telas "quiz" e "qend"
  quizVals() {
    const s = this.state;
    if (s.screen !== "quiz" && s.screen !== "qend") {
      return { screenQuiz: false, screenQEnd: false, startQuiz: this.startQuiz, toMenu: this.toMenu };
    }
    const T = TEXT.quiz;
    const Q = this.Q = this.Q && this.Q.length ? this.Q : QUIZ.questions;
    const q = Q[s.qi] || Q[0] || { options: [], cat: "" };
    const picked = s.qpick !== null, ok = picked && s.qpick === q.answer, L = T.letters;

    // acertos por tema
    const cats = {};
    Q.forEach(x => { cats[x.cat] = cats[x.cat] || { n: x.cat, ok: 0, t: 0 }; });
    s.qres.forEach(r => { cats[r.cat].t++; if (r.ok) cats[r.cat].ok++; });

    const nOk = s.qres.filter(r => r.ok).length, pct = Q.length ? nOk / Q.length : 0;
    const rk = T.ranks.find(r => pct >= r.min);
    const scn = q.scenario;

    return {
      screenQuiz: s.screen === "quiz", screenQEnd: s.screen === "qend", startQuiz: this.startQuiz, toMenu: this.toMenu,
      qNum: s.qi + 1, qTotal: Q.length, qCat: q.cat,
      qPct: ((s.qi + (picked ? 1 : 0)) / Math.max(1, Q.length) * 100) + "%", qScore: s.qscore,
      hasScn: !!scn,
      scn: scn ? { kind: scn.kind, from: scn.from, subject: scn.subject, hasSubj: !!scn.subject, lines: scn.lines.map(t => ({ t })) } : { lines: [] },
      qPrompt: q.prompt,
      qOpts: q.options.map((t, i) => ({
        t, l: L[i],
        bg: !picked ? "#f4efdc" : i === q.answer ? "#bfe3c4" : i === s.qpick ? "#f2a9a2" : "#f4efdc",
        op: picked && i !== q.answer && i !== s.qpick ? 0.5 : 1,
        go: () => this.qPick(i),
      })),
      qAnswered: picked,
      qFbTitle: ok ? T.correctTitle : T.wrongTitle.replace("{letter}", L[q.answer]),
      qFbColor: ok ? "#7fe3a0" : "#f2a9a2",
      qExplain: q.explain,
      qNextLabel: s.qi + 1 >= Q.length ? T.resultLabel : T.nextLabel, qNext: this.qNext,
      qEndTitle: rk.title, qEndColor: rk.color, qCorrect: nOk,
      qCats: Object.values(cats).map(c => ({ n: c.n, r: c.ok + "/" + c.t, col: c.ok === c.t ? "#7fe3a0" : c.ok === 0 ? "#ff8a7a" : "#ffb000" })),
    };
  },
};
