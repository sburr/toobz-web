<template>
	<v-card v-bind="$attrs">
		<v-card-title class="text-lg-h2 text-md-h3 primary--text" style="white-space: no-wrap;">
			<v-icon :x-large="!$vuetify.breakpoint.mobile" color="primary" class="mr-2">mdi-test-tube</v-icon>
			<span>{{ item.inventoryNbr }}</span>
		</v-card-title>
		<v-card-text class="text--primary">
			<v-container class="pa-0 ma-0">
				<v-row dense>
					<v-col lg="4" sm="6" class="attribute label">Mfr Part Number</v-col>
					<v-col lg="8" sm="6" class="property value primary--text font-weight-bold">{{ item.manufacturerPartNbr }}</v-col>
				</v-row>
				<v-row dense>
					<v-col lg="4" sm="6" class="attribute label">Filament Voltage</v-col>
					<v-col lg="8" sm="6" class="property value">{{ filamentVoltage }}</v-col>
				</v-row>
				<v-row dense>
					<v-col lg="4" sm="6" class="attribute label">Function Code</v-col>
					<v-col lg="8" sm="6" class="property value">{{ functionCode }}</v-col>
				</v-row>
				<v-row dense>
					<v-col lg="4" sm="6" class="attribute label">Element Count</v-col>
					<v-col lg="8" sm="6" class="property value">{{ elementCount }}</v-col>
				</v-row>
				<v-row dense>
					<v-col lg="4" sm="6" class="attribute label">Variant</v-col>
					<v-col lg="8" sm="6" class="attribute value">{{ variant }}</v-col>
				</v-row>
			</v-container>
		</v-card-text>
	</v-card>
</template>

<script>
import InventoryItem from "@/lib/InventoryItem"

export default {
	name: "SummaryCard",
	props: {
		item: { type: Object, required: true }
	},
	data: function() {
		console.log("[SummaryCard] in data constructor", this.item)
		return {
			wrapper: this.isKnown ? new InventoryItem(this.item) : {}
		}
	},
	watch: {
		item: function(newItem) {
			console.log("[SummaryCard] item changed", newItem)
			this.wrapper = this.item ? new InventoryItem(newItem) : {} }
	},
	computed: {
		isKnown: function() { return this.item && this.item.InventoryNbr },
		filamentVoltage: function() { return this.wrapper.filamentVoltage },
		functionCode: function() { return this.wrapper.functionCode },
		elementCount: function() { return this.wrapper.elementCount },
		variant: function() { return this.wrapper.variant },
	},
	created: function() {
		console.log("[SummaryCard] created", this.item)
	}
}
</script>