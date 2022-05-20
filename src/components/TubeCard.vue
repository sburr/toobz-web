<template>
	<v-card flat v-bind="$attrs">
		<v-card-text class="text--primary">
			<v-container class="pa-0 ma-0">
				<v-row>
					<v-col sm="12" md="12" lg="6">
						<summary-card :item="item" class="tube-summary" />
					</v-col>
					<v-col sm="12" md="12" lg="6">
						<product-card :item="item" flat />
					</v-col>
				</v-row>
			</v-container>

			<v-card-title>Condition Information</v-card-title>
			<condition-label :item="item" class="ma-4"/>
			<v-card-title>Testing Information</v-card-title>
			<test-status-label :item="item" class="ma-4"/>
			<template v-if="item.testStatus">
				<v-card-subtitle>Test-related Facts</v-card-subtitle>
				<facts-table :item="item" :include="[/^test/i,]" no-data-text="No test-related facts for this item" class="pa-4 facts-table" />
			</template>
			<v-card-title>Additional Facts</v-card-title>
			<facts-table :item="item" ignore-photos class="pa-4 facts-table" />
			<template v-if="productPhotos.length">
				<v-card-title>Product Photos</v-card-title>
				<fact-image v-for="photo in productPhotos" :fact="photo" thumbnail :key="`photo-${photo.id}`" />
			</template>
			<v-card-title>Inventory Links</v-card-title>
			<div class="d-flex flex-row justify-start align-center">
				<qr-code :text="permalink" :size="80" class="d-block ma-2" />
				<div v-if="!$vuetify.breakpoint.mobile" class="ml-4">
					{{ permalink }}
					<v-icon small @click="toClipboard(permalink)">mdi-content-copy</v-icon>
				</div>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-container class="pa-0 ma-0">
				<v-row dense>
					<v-col>
						<v-btn @click="navigateEdit"><v-icon class="mr-2">mdi-pencil</v-icon>Edit...</v-btn>
					</v-col>
					<v-col>
						<v-btn @click="printLabel"><v-icon class="mr-2">mdi-printer</v-icon>Print</v-btn>
					</v-col>
					<v-col>
						<v-btn @click="navigateLabel"><v-icon class="mr-2">mdi-tag</v-icon>Label...</v-btn>
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
import ConditionLabel from "@/components/ConditionLabel.vue"
import QrCode from "vue-qr"
import FactsTable from "@/components/FactsTable.vue"
import ProductCard from "@/components/ProductCard.vue"
import FactImage from "@/components/FactImage.vue"
import SummaryCard from "@/components/SummaryCard.vue"
import TestStatusLabel from "@/components/TestStatusLabel.vue"

export default {
	name: "TubeCard",
	components: { ConditionLabel, FactsTable, ProductCard, FactImage, QrCode, SummaryCard, TestStatusLabel },
	props: {
		item: { type: Object, required: true }
	},
	computed: {
		productPhotos: function() {
			const facts = (this.item.facts || []).map(function(fact, index) {
				fact.key = `fact-${index}` 
				return fact
			})
			return facts.filter(function(fact) { return fact.name.toLowerCase() === "photo" })
		},
		productPhoto: function() { return this.productPhotos.length ? this.productPhotos[0] : undefined },
		otherPhotos: function() { return this.productPhotos.length ? this.productPhotos.slice(1) : [] },
		otherFacts: function() { return this.item.facts.filter(function(fact) { return fact.name.toLowerCase() !== "photo" }) },
		permalink: function() { return window.location.href },
	},
	methods: {
		navigateEdit: function() { this.$router.push({name: "edit", params: {inventoryNbr: this.item.inventoryNbr}}) },
		navigateHome: function() { this.$router.push({name: "home"}) },
		navigateLabel: function() { this.$router.push({name: "label", params: {inventoryNbr: this.item.inventoryNbr}}) },
		printLabel: function() { window.print() },
		toClipboard: function(text) {
			navigator.clipboard.writeText(text).then(function() {
				console.log("[TubeCard] copied to clipboard!", text)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.tube-summary {
	border: thin solid rgba(255, 255, 255, 0.12);
}
.facts-table {
	border: thin solid rgba(255, 255, 255, 0.12);
	max-width: 1000px;
}
.photo-link {
	text-decoration: none;
	&:hover, &:active {
		text-decoration: none;
	}
}
</style>
