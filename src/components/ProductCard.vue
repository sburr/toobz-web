<template>
	<v-card v-bind="$attrs">
		<v-card-text class="text--primary">
			<v-row dense>
				<v-col cols="12" class="text-h2" style="visibility: hidden;">{{ item.inventoryNbr }}</v-col>
			</v-row>
			<v-row dense>
				<v-col lg="4" sm="6" class="attribute label">Manufacturer</v-col>
				<v-col lg="8" sm="6" class="property value">{{ item.manufacturer }}</v-col>
			</v-row>
			<v-row dense>
				<v-col lg="4" sm="6" class="attribute label">Brand Name</v-col>
				<v-col lg="8" sm="6" class="property value">{{ item.brandName }}</v-col>
			</v-row>
			<v-row dense>
				<v-col lg="4" sm="6" class="attribute label">Alternate Part Nbr</v-col>
				<v-col lg="8" sm="6" class="property value">{{ item.alternatePartNbr }}</v-col>
			</v-row>
			<v-row dense>
				<v-col lg="4" sm="6" class="attribute label">Product Name</v-col>
				<v-col lg="8" sm="6" class="property value">{{ item.productName }}</v-col>
			</v-row>
			<v-row dense>
				<v-col lg="4" sm="6" class="attribute label">Product Description</v-col>
				<v-col lg="8" sm="6" class="attribute value">{{ item.productDescription }}</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		item: { type: Object, required: true }
	}
}
</script>