module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: () => {
					let _responsiveness = '@import "@/styles/_responsiveness.scss"';
					let _colors = '@import "@/styles/__colors.scss"';
					// let _theme2 = '@import "@/styles/__themes.sass"';
					return _responsiveness + '\n' + _colors + '\n';
				}
			}
		}
	}
}