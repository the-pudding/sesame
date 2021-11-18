const fs = require("fs");

const CWD = process.cwd();

const src = `${CWD}/tasks/data`;
const files = fs.readdirSync(src).filter(d => d.includes("json"));

const json = JSON.parse(fs.readFileSync(`${src}/${files[0]}`, "utf8"));

const size = json.meta.size.h;
const tags = json.meta.frameTags;

const frames = json.frames.map(({ frame }, index) => ({
	id: files[0].replace(".json", ""),
	size,
	index,
	x: frame.x,
	y: frame.y,
	name: tags.find(t => index >= t.from && index <= t.to).name
}));

fs.writeFileSync(`${CWD}/src/data/sprites.json`, JSON.stringify(frames));