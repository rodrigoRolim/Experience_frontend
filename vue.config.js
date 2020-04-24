module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/styles/_responsiveness.sass"\n@import "@/styles/_colors.sass"`
			}
		}
	}
}