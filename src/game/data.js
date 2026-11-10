// Carrega todo o conteúdo do jogo a partir de src/data/*.json
import SP from "../data/characters.json";
import FILES from "../data/files.json";
import INTRO from "../data/dialogue/intro.json";
import QUIZ from "../data/quiz/questions.json";
import TEXT from "../data/texts/game.json";
import CONFIG from "../data/config.json";

// Eventos do dia: um JSON por tarefa, na ordem alfabética do nome do arquivo (01-, 02-, ...)
const eventModules = import.meta.glob("../data/events/*.json", { eager: true, import: "default" });
const EV = Object.keys(eventModules).sort().map((k) => eventModules[k]);

export { SP, EV, FILES, INTRO, QUIZ, TEXT, CONFIG };
