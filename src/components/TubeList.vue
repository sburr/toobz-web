<template>
	<v-sheet flat>
		<v-data-table :headers="headers" :items="items" @dblclick:row="handleRow" >
			<template v-slot:item.actions="{ item }">
				<div class="actions">
					<v-icon small class="mr-2" @click="viewItem(item)">mdi-eye</v-icon>
					<v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
					<v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
				</div>
			</template>
		</v-data-table>
	</v-sheet>
</template>

<script>
export default {
	name: "TubeList",
	props: {
		items: { type: Array, required: true }
	},

	data: function() {
		return {
			headers: [
				{ text: "Inventory Nbr", align: "start", sortable: true, value: "inventoryNbr" },
				{ text: "Mfr Part Nbr", align: "start", sortable: true, value: "manufacturerPartNbr" },
				{ text: "Mfr", align: "start", sortable: true, value: "manufacturer" },
				{ text: "Brand", align: "start", sortable: true, value: "brandName" },
				{ text: "Alt Part Nbr", align: "start", sortable: true, value: "alternatePartNbr" },
				{ text: "Product Name", align: "start", sortable: true, value: "productName", },
				{ text: "Condition", align: "start", sortable: true, value: "productCondition", },
				{ text: "Tested", align: "start", sortable: true, value: "testStatus", },
				{ text: "", align: "start", sortable: false, value: "actions" }
			],
		}
	},

	methods: {
		handleRow: function(event, rowInfo) {
			console.log("handleRow", arguments)
			this.viewItem(rowInfo.item)
		},
		viewItem: function(item) {
			console.log("viewItem", item)
			this.$router.push({name: "view", params: {inventoryNbr: item.inventoryNbr}})
		},
		editItem: function(item) {
			console.log("editItem", item)
			this.$router.push({name: "edit", params: {inventoryNbr: item.inventoryNbr}})
		},
		deleteItem: function(item) {
			this.$emit("delete", item)
		}
	}
}
</script>

<style lang="scss" scoped>
.actions {
	white-space: nowrap;
}
</style>