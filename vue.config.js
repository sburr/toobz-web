const fs = require("fs")

module.exports = {
	transpileDependencies: [
		'vuetify',
	],
	devServer: {
		https: {
			cert: fs.readFileSync("./sslcert/example.com+5.pem"),
			key: fs.readFileSync("./sslcert/example.com+5-key.pem")
		},
		port: 4433
	}
}
