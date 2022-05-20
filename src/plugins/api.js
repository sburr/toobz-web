export default {
	install: function(Vue, options={}) {
		console.log("[Api] installing ApiPlugin with options", options)
		if (!options.apiBase) {
			throw new Error("Please configure the apiBase in config.js to the location where the toobz-api can be accessed")
		}
		Vue.prototype.buildApiUrl = function(path) {
			let base = options.apiBase
			if (!base.endsWith("/")) { base = base + "/" }
			if (path.startsWith("/")) { path = path.slice(1) }
			return `${base}${path}`
		}
	}
}