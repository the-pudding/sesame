const fs = require("fs");

const CWD = process.cwd();
const SCALE = 8;
const PAD = 1;

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

		const rawSize = json.frames[0].frame.w;
		const size = Math.floor(rawSize / SCALE);
		console.log({ size });
		const cols = json.meta.size.w / rawSize;
		const rows = json.meta.size.h / rawSize;
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
			rows,
			cols,
			frames,
		};
	});
	fs.writeFileSync(`${CWD}/src/data/sprites.json`, JSON.stringify(result));
})();

