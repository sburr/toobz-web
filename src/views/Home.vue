<template>
	<v-sheet flat class="pa-4">
		<v-card flat>
			<v-card-title>Manage tube inventory</v-card-title>
			<v-card-text>
				<tube-search show-button show-hint @search="onSearch" />
				<tube-list :items="searchResults" @delete="deleteItemMaybe"/>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn dark outlined color="primary" @click="navigateEdit"><v-icon class="mr-2">mdi-plus</v-icon>Add tube...</v-btn>
			</v-card-actions>
		</v-card>
		<v-dialog v-model="confirmDialog" max-width="400">
			<v-card dark>
				<div class="confirm">
					<v-card-title>Delete Item?</v-card-title>
					<v-card-text>
						Are you sure that you wish to delete the <span class="primary--text">{{ deletingInventoryNbr }}</span> tube?
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
import TubeList from "@/components/TubeList.vue"
import TubeSearch from "@/components/TubeSearch.vue"

export default {
	name: "HomePage",
	components: { TubeList, TubeSearch },
	data: function() {
		return {
			searchResults: [],
			deletingInventoryNbr: "",
			confirmDialog: false
		}
	},
	watch: {
		"$route": function(to, from) {
			if (to.params.searchText) {
				this.onSearch(to.params.searchText)
			}
		}
	},
	methods: {
		onSearch: function(searchText) {
			console.log("[HomePage] searching with", searchText)
			const self = this
			if (searchText) {
				if (searchText.startsWith("AK-")) {
					console.log("[HomePage] assuming inventoryNbr lookup")
					this.$http.get(this.buildApiUrl(`/toobz/inventory/${searchText}`)).then(function(response) {
						const item = response.data
						console.log("[Home] response from inventory API", item)
						if (item.inventoryNbr) {
							console.log("[HomePage] routing to view page", item.inventoryNbr)
							self.$router.push({name: "view", params: {inventoryNbr: item.inventoryNbr}})
						}
					}).catch(function(e) {
						console.log("[HomePage] error from inventory API", e)
					})
				} else {
					let url = this.buildApiUrl(`/toobz/search/${searchText}`)
					this.$http.get(this.buildApiUrl(`/toobz/search/${searchText}`)).then(function(response) {
						const items = response.data
						console.log("[HomePage] response from search API", items)
						self.searchResults = items
					}).catch(function(e) {
						console.log("[HomePage] error from search API", e)
					})
				}
			}
		},
		deleteItemMaybe: function(item) {
			this.deletingInventoryNbr = item.inventoryNbr
			this.confirmDialog = true
		},
		deleteItem: async function() {
			console.log("[HomePage] deleting item", this.deletingInventoryNbr)
			try {
				const self = this
				const results = await this.$http.delete(this.buildApiUrl(`/toobz/inventory/${this.deletingInventoryNbr}`))
				const index = this.searchResults.findIndex(function(item) { return item.inventoryNbr == self.deletingInventoryNbr })
				this.deletingInventoryNbr = ""
				this.confirmDialog = false
				this.searchResults.splice(index, 1)
				console.log("[HomePage] successfully deleted", this.deletingInventoryNbr)
			}
			catch (e) {
				console.error("[HomePage] error deleting item", e)  // TODO: display on page somewhere
				this.confirmDialog = false
			}
		},
		navigateEdit: function() {
			this.$router.push({name: "edit"})
		},
	},
	mounted: function() {
		if (this.$route.params.searchText) {
			this.onSearch(this.$route.params.searchText)
		}
	}
}
</script>

<style lang="scss" scoped>
.confirm {
	background-color: #fe525244;
	border: thick solid var(--v-error-base);
}
</style>