# unknown-sender

Jogo educativo de cibersegurança (PT-BR) para 11–14 anos.

## Estrutura

```
build.mjs            monta o index.html a partir de src/   (node build.mjs)
index.html           GERADO — é o que o navegador abre (não edite à mão)
support.js           runtime do template (gerado, não editar)
src/
  template/          HTML dividido em partes (<!-- @include arquivo.html -->)
    layout.html        moldura: monitor + telefone
    head.html          fontes
    screens/           play, title, end, quiz, quiz-end
    apps/              email, files, chat
    components/        desktop-icons, taskbar, toast, dialog-box, crt, phone
  styles/main.css    animações globais
  data/              TODO o conteúdo do jogo, em JSON
    characters.json    personagens (nome, cor, inicial)
    dialogue/intro.json  diálogo de abertura
    events/            um arquivo por tarefa do dia (emails, telefone, chat, cena)
                       -> textos, respostas, certo/errado e feedback da Marta
    files.json         arquivos da pasta Downloads
    quiz/questions.json  perguntas, alternativas, resposta e explicação
    texts/game.json    textos de interface, ranks, lições finais
    props.json         opções editáveis (vidas, velocidade do texto, CRT)
  js/                lógica, um módulo por área
    dialogue.js        caixa de diálogo
    flow.js            fluxo do jogo e respostas
    files-app.js       app de arquivos
    quiz.js            modo quiz
    render.js          valores do template
    component.js       classe principal
```

## Como alterar

- Novo evento/pergunta/texto: edite ou adicione um JSON em `src/data/` (os eventos rodam em ordem alfabética do nome do arquivo, por isso o prefixo `01-`, `02-`...).
- Depois rode `node build.mjs` e abra o `index.html`.
