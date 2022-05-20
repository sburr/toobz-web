<template>
	<v-sheet flat fluid class="pa-4">
		<v-switch v-model="value">
			<template v-slot:label>
				<p>value type: '{{ typeof(value) }}'</p>
				<p>string value: '{{ value }}'</p>
				<p>boolean value: '{{ !!value }}'</p>
			</template>
		</v-switch>
		<v-easy-camera v-if="showCamera" v-model="picture" fullscreen @close="showCamera=false">
		</v-easy-camera>
		<v-img v-if="!showCamera" :src="picture" />
	</v-sheet>
</template>

<script>
import FactsTable from "@/components/FactsTable.vue"
import ProductCard from "@/components/ProductCard.vue"
import SummaryCard from "@/components/SummaryCard.vue"
import TubeCard from "@/components/TubeCard.vue"
import EasyCamera from "easy-vue-camera"

export default {
	name: "TestPage",
	components: { FactsTable, ProductCard, SummaryCard, TubeCard, 'v-easy-camera': EasyCamera },
	data: function() {
		return {
			picture: "",
			showCamera: true,
			value: "",
			item: {
				inventoryNbr: "AK-000003",
				manufacturerPartNbr: "12AX7A",
				manufacturer: "Westinghouse",
				brandName: "RCA",
				alternatePartNbr: "3042",
				productName: "12AX7A Vacuum Tube",
				productDescription: "Standard 12V vacuum tube",
				productCondition: "new",
				testStatus: "pass",
				facts: [
					{ name: "Photo", value: "https://s3.amazonaws.com/tubedepot-com-production/spree/products/also_bought/JJ-6L6GC-2.jpg?1381946249" },
					{ name: "Photo", value: "https://s3.amazonaws.com/tubedepot-com-production/spree/products/also_bought/JJ-6L6GC-2.jpg?1381946249" },
					{ name: "Bin Locator", value: "abc-123" },
					{ name: "Test Results", value: "with flying colors" },
					{ name: "Other", value: "http://example.com/foo" },
				]
			},
			db: null,
		}
	},
}
</script>