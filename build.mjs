// Monta o index.html a partir de src/.   Uso: node build.mjs
// O runtime (support.js) lê um único index.html com <x-dc> (template) + <script data-dc-script> (lógica),
// por isso o código-fonte fica separado em src/ e este script junta tudo.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, "src");
const read = (...p) => fs.readFileSync(path.join(SRC, ...p), "utf8");
const json = (...p) => JSON.parse(read(...p));
const jsonDir = (dir) =>
  fs.readdirSync(path.join(SRC, dir)).filter((f) => f.endsWith(".json")).sort().map((f) => json(dir, f));

// --- HTML: resolve <!-- @include caminho.html --> (relativo a src/template) ---
function include(file, stack = []) {
  if (stack.includes(file)) throw new Error("include circular: " + [...stack, file].join(" -> "));
  return read("template", file)
    .replace(/^[ \t]*<!--\s*@include\s+(\S+)\s*-->[ \t]*\r?\n?/gm, (_, f) => include(f, [...stack, file]))
    .replace(/\n+$/, "\n");
}

// --- JS: dados (JSON) viram constantes, depois os módulos de lógica ---
const data = {
  SP: json("data", "characters.json"),
  EV: jsonDir("data/events"),
  FILES: json("data", "files.json"),
  INTRO: json("data", "dialogue", "intro.json"),
  QUIZ: json("data", "quiz", "questions.json"),
  TEXT: json("data", "texts", "game.json"),
};
const dataJs = Object.entries(data).map(([k, v]) => `const ${k} = ${JSON.stringify(v)};`).join("\n");
const JS_ORDER = ["dialogue", "flow", "files-app", "quiz", "render", "component"];
const logicJs = JS_ORDER.map((f) => read("js", f + ".js")).join("\n");

const props = JSON.stringify(json("data", "props.json")).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const html = `<!DOCTYPE html>
<!-- GERADO por build.mjs a partir de src/ — não edite à mão. Rode: node build.mjs -->
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
${include("head.html")}<style>
${read("styles", "main.css")}</style>
</helmet>
${include("layout.html")}</x-dc>
<script type="text/x-dc" data-dc-script data-props="${props}">
${dataJs}
${logicJs}</script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "index.html"), html);
console.log("index.html gerado (" + html.length + " bytes)");
