module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/styles/_responsiveness.scss"\n@import "@/styles/_colors.scss"`
			}
		}
	}
}