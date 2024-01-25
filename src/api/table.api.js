export const getEditableTableData = (pagination) => {
	return new Promise((res) => {
		setTimeout(() => {
			res({
				data: [
					{
						key: 1,
						name: `Edward`,
						age: 32,
						address: `London Park no.1`,
					},
					{
						key: 2,
						name: `Alex`,
						age: 45,
						address: `London Park no.2`,
					},
					{
						key: 3,
						name: `Niko`,
						age: 21,
						address: `London Park no.3`,
					},
					{
						key: 4,
						name: `Josh`,
						age: 18,
						address: `London Park no.4`,
					},
					{
						key: 5,
						name: `Jo`,
						age: 15,
						address: `Minsk Park no.1`,
					},
					{
						key: 6,
						name: `Jaimi`,
						age: 18,
						address: `London Park no.2`,
					},
					{
						key: 7,
						name: `Alexa`,
						age: 24,
						address: `London Park no.6`,
					},
					{
						key: 8,
						name: `Donald`,
						age: 27,
						address: `London Park no.7`,
					},
					{
						key: 9,
						name: `Pavel`,
						age: 17,
						address: `London Park no.9`,
					},
					{
						key: 10,
						name: `Nick`,
						age: 18,
						address: `London Park no.1`,
					},
					{
						key: 11,
						name: `Dasha`,
						age: 25,
						address: `London Park no.2`,
					},
					{
						key: 12,
						name: `Alex`,
						age: 27,
						address: `London Park no.3`,
					},
					{
						key: 13,
						name: `Vic`,
						age: 29,
						address: `London Park no.2`,
					},
					{
						key: 14,
						name: `Natalia`,
						age: 25,
						address: `London Park no.4`,
					},
					{
						key: 15,
						name: `Zack`,
						age: 27,
						address: `London Park no.1`,
					},
					{
						key: 16,
						name: `Jack`,
						age: 31,
						address: `London Park no.4`,
					},
				],
				pagination: { ...pagination, total: 16 },
			});
		}, 1000);
	});
};
