<template>
	<div class="d-inline-block pa-2" :style="statusStyle">
		<v-icon :color="iconColor">{{ icon }}</v-icon>
		{{ conditionText }}
	</div>
</template>

<script>
export default {
	name: "ConditionLabel",
	props: {
		item: { type: Object, required: true },
	},
	computed: { 
		conditionText: function() {
			return this.item.productCondition ? this.item.productCondition : "Unknown"
		},
		isKnown: function() {
			return this.item.productCondition !== undefined && this.item.productCondition.length
		},
		isNew: function() {
			const cond = (this.item.productCondition || "").toLowerCase()
			return cond === "new"
		},
		icon: function() {
			if (this.isKnown) {
				return this.isNew ? "mdi-star-four-points-outline" : "mdi-recycle-variant"
			} else {
				return "mdi-help-circle-outline"
			}
		},
		iconColor: function() {
			return "white"
		},
		statusStyle: function() {
			const color = "white"
			return {
				color,
				border: `thin dashed ${color}`,
				borderRadius: "5px",
			}
		}
	}
}
</script>

<style lang="scss" scoped>
</style>