# unknown-sender

Jogo educativo de cibersegurança (PT-BR) para 11–14 anos. React + Vite + Tailwind CSS.

## Rodar

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/
npm run preview  # serve o dist/
```

Requer Node 18+ (Vite 5 / Tailwind 3.4).

## Estrutura

```
index.html             entrada do Vite
tailwind.config.js     cores, fontes e animações do tema retrô
src/
  main.jsx             monta o <Game />
  index.css            Tailwind + classes .bevel / .btn-amber / .btn-mint
  data/                TODO o conteúdo do jogo, em JSON
    config.json          vidas, velocidade do texto, efeito CRT
    characters.json      personagens (nome, cor, inicial)
    dialogue/intro.json  diálogo de abertura
    events/              um arquivo por tarefa do dia (emails, telefone, chat, cena)
                         textos, respostas certas/erradas e feedback da Marta
    files.json           arquivos da pasta Downloads
    quiz/questions.json  perguntas, alternativas, resposta e explicação
    texts/game.json      textos de interface, ranks, lições finais
  game/                lógica (sem JSX), um módulo por área
    data.js              carrega os JSONs
    Game.jsx             componente principal (estado + junta os módulos)
    dialogue.js          caixa de diálogo
    flow.js              fluxo do jogo e respostas
    files-app.js         app de arquivos
    quiz.js              modo quiz
    render.js            valores usados pelos componentes
  components/          interface
    Monitor, Phone, DialogBox, Taskbar, Toast, DesktopIcons, Crt
    screens/             Play, Title, End, Quiz, QuizEnd
    apps/                AppWindow, EmailApp, FilesApp, ChatApp
```

## Como alterar

- Novo evento/pergunta/texto: edite ou adicione um JSON em `src/data/`. Os eventos rodam em ordem alfabética do nome do arquivo (por isso `01-`, `02-`...).
- Visual: componentes em `src/components/` com classes Tailwind; cores e fontes em `tailwind.config.js`.
- O Preflight do Tailwind está desligado de propósito para manter o visual original.
