// basically original:
{
	/* ignore this line: */ const lines: string[] = [];
	/* ignore this line: */ const entries: {testVal: number, numbers: number[];}[] = [];

	lines.forEach((val) => {
		const split = val.trim().split(":");
		entries.push({testVal: parseInt(split[0]!), numbers: split[1]!.slice(1, split[1]!.length).split(" ").map(x => parseFloat(x))});
	});
}

// next "improvement":
{
	/* ignore this line: */ const lines: string[] = [];
	/* ignore this line: */ const entries: {testVal: number, numbers: number[];}[] = [];

	lines.map(val => val.trim().split(":"))
		.forEach(split => {
			entries.push({testVal: parseInt(split[0]!), numbers: split[1]!.slice(1, split[1]!.length).split(" ").map(x => parseFloat(x))});
		});
}

// next "improvement":
{
	/* ignore this line: */ const lines: string[] = [];
	/* ignore this line: */ const entries: {testVal: number, numbers: number[];}[] = [];

	lines.map(val => val.trim().split(":"))
		.forEach(([left, right]) => {
			entries.push({testVal: parseInt(left!), numbers: right!.slice(1, right!.length).split(" ").map(x => parseFloat(x))});
		});
}

// next "improvement":
{
	/* ignore this line: */ const lines: string[] = [];

	const entries = lines.map(val => val.trim().split(":"))
		.map(([left, right]) => {
			return ({testVal: parseInt(left!), numbers: right!.slice(1, right!.length).split(" ").map(x => parseFloat(x))});
		});
}

// final "improvement":
{
	/* ignore this line: */ const lines: string[] = [];

	const entries = lines.map(val => val.trim().split(":"))
		.map(([left, right]) => ({
			testVal: parseInt(left!),
			numbers: right!.slice(1, right!.length).split(" ").map(x => parseFloat(x))
		}));
}