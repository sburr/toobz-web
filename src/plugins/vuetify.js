import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
	theme: {
		dark: true,
		options: {
			customProperties: true,
		},
		themes: {
			dark: {
				primary:   '#03b601',
				secondary: '#056404',
				accent:    '#82b1ff',
				error:     '#ff5252',
				info:      '#2196f3',
				success:   '#4caf50',
				warning:   '#ffc107'
			},
		},
	},
})