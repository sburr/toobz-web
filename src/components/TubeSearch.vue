<template>
	<v-sheet>
		<v-text-field dark outlined label="Search" v-model="searchText" @keydown.stop="onKeydown" prepend-inner-icon="mdi-magnify" :hint="hintText">
			<template v-if="showButton" v-slot:append>
				<v-btn dark outlined color="primary" @click.prevent="onSearch" style="margin-top: -6px;">Search</v-btn>
			</template>
		</v-text-field>
	</v-sheet>
</template>

<script>
export default {
	name: "TubeSearch",
	props: {
		showButton: { type: Boolean, default: false },
		showHint: { type: Boolean, default: false },
	},
	data: function() {
		return {
			searchText: ""
		}
	},
	computed: {
		hintText: function() { return this.showHint ? "Search by manufacturer part number, manufacturer, brand, or product name" : "" }
	},
	methods: {
		onKeydown: function(e) {
			if (e.keyCode == 13) {
				this.onSearch(e)
			}
		},
		onSearch: function(e) {
			console.log("[TubeSearch] onSearch", e, this.searchText)
			this.$emit("search", this.searchText)
		}
	}
}
</script>