module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: () => {
					let _responsiveness = '@import "@/styles/_responsiveness.scss"';
					let _colors = '@import "@/styles/_colors.scss"';
					return _responsiveness + '\n' + _colors;
				}
			}
		}
	}
}