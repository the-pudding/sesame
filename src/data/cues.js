import cueData from "$data/cues.csv";

const clean = cueData.map(d => ({
	...d,
	duration: +d.duration,
	delay: +d.delay,
	startX: +d.startX,
	endX: +d.endX,
	startY: +d.startY,
	endY: +d.endY,
	startR: +d.startR,
	endR: +d.endR,
	z: +d.z,
}));

export default clean;