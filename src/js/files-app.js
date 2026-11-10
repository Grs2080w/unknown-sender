// App de Arquivos: o jogador move arquivos seguros para Documentos e põe os maliciosos em quarentena.
const FilesLogic = {
  fileAct(kind) {
    const s = this.state, f = FILES.find(x => x.n === s.selFile);
    if (!f || s.files[f.n]) return;
    const T = TEXT.files;
    const ok = (f.bad && kind === "quar") || (!f.bad && kind === "move");
    let lives = s.lives, score = s.score, msg;
    if (ok) { score += 40; msg = T.correct + f.fb; }
    else if (f.bad) { lives -= 1; msg = T.malwareKept + f.fb; }
    else { score = Math.max(0, score - 20); msg = T.safeFlagged + f.fb; }

    const files = { ...s.files, [f.n]: kind };
    const all = Object.keys(files).length === FILES.length;
    this.setState({ files, lives, score, fmsg: { ok, t: msg } }, () => {
      if (!all) return;
      this.setState(x => ({ phase: "between", res: { ...x.res, e4: { ok: true, label: "" } } }));
      this.say(
        [{ sp: "marta", t: lives <= 0 ? T.finishDead : T.finishOk }],
        () => lives <= 0 ? this.end(false) : this.next()
      );
    });
  },
};
