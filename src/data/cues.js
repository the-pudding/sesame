import cueData from "$data/cues.csv";

const clean = cueData.map(d => ({
	...d,
	duration: +d.duration,
	delay: +d.delay,
	start_x: +d.start_x,
	end_x: +d.end_x,
	start_y: +d.start_y,
	end_y: +d.end_y,
	start_r: +d.start_r,
	end_y: +d.end_y,
	z: +d.z,
}));

export default clean;