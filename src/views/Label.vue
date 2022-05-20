<template>
	<v-card flat class="pa-4">
		<v-card-text>
			<tube-label :item="item" />
		</v-card-text>
		<v-card-actions class="d-print-none">
			<v-container class="pa-0 ma-0">
				<v-row dense>
					<v-col>
						<v-btn @click="navigateView"><v-icon class="mr-2">mdi-eye-outline</v-icon>View...</v-btn>
					</v-col>
					<v-col>
						<v-btn @click="printLabel"><v-icon class="mr-2">mdi-printer</v-icon>Print</v-btn>
					</v-col>
					<v-col>
						<v-btn outlined @click="navigateHome"><v-icon class="mr-2">mdi-home</v-icon>Done</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-card-actions>
	</v-card>
</template>

<script>
import TubeLabel from "@/components/TubeLabel.vue"

export default {
	name: "LabelPage",
	components: { TubeLabel },
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
					console.log("[LabelPage] found existing item from API", item)
					self.item = item
				}).catch(function(e) {
					console.error("[LabelPage] error getting item from API", e)
				})
			} else {
				console.error("[LabelPage] cannot view an empty inventoryNbr") // TODO: put an error on page somewhere
			}
		},
		printLabel: function() {
			window.print()
		},
		navigateHome: function() {
			this.$router.push({name: "home"})
		},
		navigateView: function() {
			this.$router.push({name: "view", params: {inventoryNbr: this.$route.params.inventoryNbr}})
		}
	},
	created: function() {
		this.itemFromInventoryNbr(this.$route.params.inventoryNbr)
	}
}
</script>
