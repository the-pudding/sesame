const fs = require("fs");

const CWD = process.cwd();
const SCALE = 8;

const src = `${CWD}/tasks/data`;
const files = fs.readdirSync(src).filter(d => d.includes("json"));

const getTagName = ({ tags, index }) => {
	if (!tags.length) return undefined;
	const match = tags.find(t => index >= t.from && index <= t.to);
	if (match) return match.name;
	return undefined;
};

(() => {
	const result = files.map(file => {
		const id = file.replace(".json", "");
		console.log(id);
		const json = JSON.parse(fs.readFileSync(`${src}/${file}`, "utf8"));

		const size = Math.floor(json.meta.size.h / SCALE);
		const tags = json.meta.frameTags;

		const frames = json.frames.map(({ frame }, index) => ({
			index,
			x: Math.floor(frame.x / SCALE),
			y: Math.floor(frame.y / SCALE),
			name: getTagName({ tags, index })
		}));

		return {
			id,
			size,
			frames,
		};
	});
	fs.writeFileSync(`${CWD}/src/data/sprites.json`, JSON.stringify(result));
})();

