<template>
	<v-app>
		<v-app-bar app dark class="d-print-none">
			<v-toolbar-title>
				<router-link to="/" class="router-link">
					<v-icon>mdi-test-tube</v-icon>
				</router-link>
				Test Toobz
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon href="/about">
				<v-icon>mdi-help-circle-outline</v-icon>
			</v-btn>
		</v-app-bar>

		<v-sheet fluid fill-height>
			<v-main>
				<router-view/>
			</v-main>
		</v-sheet>

		<v-fade-transition>
			<v-overlay v-if="showQuickSearch" absolute :opacity="0.9">
				<div style="max-width: 600px;">
					<v-text-field ref="quickSearch" dark outlined label="Quick Search" v-model="quickSearchText" @keydown="onSearchKeydown" prepend-inner-icon="mdi-magnify" hint="Search by inventory number, manufacturer part number, etc">
						<template v-slot:append>
							<v-btn dark outlined color="primary" @click="onSearch" style="margin-top: -6px;">Search</v-btn>
						</template>
					</v-text-field>
					<v-spacer /><v-btn @click="showQuickSearch=false">Cancel</v-btn>
				</div>
			</v-overlay>
		</v-fade-transition>
	</v-app>
</template>

<script>
import TubeSearch from "@/components/TubeSearch.vue"

export default {
	name: 'App',
	components: { TubeSearch },
	data: function() {
		return {
			showQuickSearch: false,
			quickSearchText: "",
		}
	},
	methods: {
		addNewItem: function() {
			this.$router.push({name: "edit"})
		},
		onSearchKeydown: function(e) {
			if (e.keyCode == 13) {
				this.onSearch()
			}
		},
		onSearch: function() {
			this.showQuickSearch = false
			const searchText = this.quickSearchText
			this.quickSearchText = ""
			this.$router.push({name: "search", params: {searchText: searchText}})
		}
	},
	mounted: function() {
		const self = this
		console.log("[App] mounted")
		console.log("[App] attaching keyboard listener for shortcuts")
		window.addEventListener("keydown", function(e) {
			if (e.composed && e.metaKey && e.altKey && !e.repeat) {
				if (e.code === "KeyN") {
					console.log(e)
					e.preventDefault = true
					self.addNewItem()
				} else if (e.code === "KeyS") {
					e.preventDefault = true
					self.showQuickSearch = true
					// ugly hack because it's not mounted yet
					setTimeout(function() {
						if (self.$refs.quickSearch) {
							self.$refs.quickSearch.focus()
						}
					}, 200)
				}
			} else if (e.code === "Escape") {
				self.showQuickSearch = false
				self.quickSearchText = ""
			}
		})
	}
}
</script>

<style lang="scss">
.v-application {
	font-family: menlo !important;

	&.theme--dark {
		background: #1e1e1e !important;
	}

	label {
		font-family: menlo !important;
	}

	.text-h1.title,
	.text-h2.title,
	.text-h3.title,
	.text-h4.title,
	.text-h5.title,
	.text-h6.title {
		font-family: menlo !important;
	}

	a.router-link,
	a.router-link:hover,
	a.router-link:active,
	a.router-link-exact,
	a.router-link-exact:hover,
	a.router-link-exact:active,
	a.router-link-active,
	a.router-link-active:hover,
	a.router-link-active:active
	a.router-link-exact-active,
	a.router-link-exact-active:hover,
	a.router-link-exact-active:active
	{
		color: #ffffff;
		text-decoration: none;
	}
 }
</style>