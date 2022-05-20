<template>
	<v-sheet flat class="pa-4">
		<tube-card :item="item" />
	</v-sheet>
</template>

<script>
import TubeCard from "@/components/TubeCard.vue"

export default {
	name: "ViewPage",
	components: { TubeCard },
	data: function() {
		return {
			item: {},
		}
	},
	watch: {
 		$route: function(to, from) { this.itemFromInventoryNbr(to.params.inventoryNbr) },
    },
	methods: {
		itemFromInventoryNbr(inventoryNbr) {
			const self = this
			if (inventoryNbr) {
				this.$http.get(this.buildApiUrl(`/toobz/inventory/${inventoryNbr}`)).then(function(results) {
					const item = results.data
					console.log("[ViewPage] found existing item from API", item)
					self.item = item
				}).catch(function(e) {
					console.error("[ViewPage] error getting item from API", e)
				})
			} else {
				console.error("[ViewPage] cannot view an empty inventoryNbr") // TODO: put an error on page somewhere
			}
		}
	},
	created: function() {
		this.itemFromInventoryNbr(this.$route.params.inventoryNbr)
	}
}
</script>
