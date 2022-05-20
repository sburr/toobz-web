<template>
	<v-sheet flat class="pa-4">
		<tube-editor :item="item" :key="key" @done="navigateHome" @delete="confirmDeleteItem" @view="navigateToView" />
		<v-dialog v-model="confirmDialog" max-width="400">
			<v-card dark>
				<div class="confirm">
					<v-card-title>Delete Item?</v-card-title>
					<v-card-text>
						Are you sure that you wish to delete the <span class="primary--text">{{ item.inventoryNbr }}</span> tube?
						This action cannot be undone.
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn dark @click="confirmDialog=!confirmDialog">Cancel</v-btn>
						<v-btn dark color="error" @click="deleteItem"><v-icon dark  class="mr-1">mdi-trash-can</v-icon>Delete Item</v-btn>
					</v-card-actions>
				</div>
			</v-card>
		</v-dialog>
	</v-sheet>
</template>

<script>
import TubeEditor from "@/components/TubeEditor.vue"

export default {
	name: "EditPage",	
	components: { TubeEditor },
	data: function() {
		return {
			item: {inventoryNbr: "<pending>"},
			confirmDialog: false,
			deletingInventoryNbr: ""
		}
	},
	computed: {
		key: function() {
			console.log("[EditPage] evaluating key", this.$route.params, this.item)
			let key = this.item.inventoryNbr
			console.log("[EditPage] setting key", key)
			return key
		}
	},
	watch: {
 		$route: function(to, from) {
			 console.log("[EditPage] $route changed", to)
			 this.setItemFromInventoryNbr(to.params.inventoryNbr)
		}
    },
	methods: {
		setItemFromInventoryNbr(inventoryNbr) {
			const self = this
			console.log("[EditPage] setItemFromInventoryNbr", inventoryNbr)
			if (inventoryNbr) {
				this.$http.get(this.buildApiUrl(`/toobz/inventory/${inventoryNbr}`)).then(function(results) {
					const item = results.data
					console.log("[EditPage] found existing item", item)
					self.item = item
				}).catch(function(e) {
					console.error(`[EditPage] error retrieving item '${inventoryNbr}' from API`, e)
				})
			} else {
				self.item = {
					inventoryNbr: "<pending>",
					manufacturerPartNbr: "",
					manufacturer: undefined,
					brandName: undefined,
					alternatePartNbr: undefined,
					productName: undefined,
					productDescription: undefined,
					productCondition: undefined,
					testStatus: undefined,
					facts: [ ],
				}
			}
		},
		navigateToView: function() {
			this.$router.push({name: "view", params: {inventoryNbr: this.item.inventoryNbr}}) 
		},
		navigateHome: function() {
			this.$router.push({name: "home"})
		},
		confirmDeleteItem: function(item) {
			console.log("[EditPage] confirming delete item", item)
			this.deletingInventoryNbr = item.inventoryNbr
			this.confirmDialog = !!this.deletingInventoryNbr
		},
		deleteItem: async function(item) {
			console.log("[EditPage] deleting item", item)
			try {
				const results = await this.$http.delete(this.buildApiUrl(`/toobz/inventory/${this.deletingInventoryNbr}`))
				this.deletingInventoryNbr = ""
				this.confirmDialog = false
				console.log("[EditPage] successfully deleted", this.deletingInventoryNbr)
				console.log("[EditPage] navigating home")
				this.$router.push({name: "home"})
			}
			catch (e) {
				console.error("[EditPage] error deleting item", e)  // TODO: display on page somewhere
				this.confirmDialog = false
			}
		}
	},
	created: function() {
		console.log("[EditPage] created")
		this.setItemFromInventoryNbr(this.$route.params.inventoryNbr)
	}
}
</script>

<style lang="scss" scoped>
.confirm {
	background-color: #fe525244;
	border: thick solid var(--v-error-base);
}
</style>