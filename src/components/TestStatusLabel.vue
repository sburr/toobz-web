<template>
	<div class="d-inline-block pa-2" :style="statusStyle">
		<v-icon :color="iconColor">{{ icon }}</v-icon>
		{{ statusText }}
	</div>
</template>

<script>
export default {
	name: "TestStatusLabel",
	props: {
		item: { type: Object, required: true },
		useColor: { type: Boolean, default: true },
	},
	computed: { 
		isTested: function() {
			return !!this.item.statusText
		},
		statusText: function() {
			return this.isTested ? this.item.testStatus : "Unknown"
		},
		icon: function() {
			if (this.isTested) {
				return this.passed ? "mdi-check-circle-outline" : "mdi-close-circle-outline"
			} else {
				return "mdi-alert-circle-outline"
			}
		},
		passed: function() {
			return (this.item.testStatus || "").toLowerCase() === "pass"
		},
		iconColor: function() {
			if (this.useColor) {
				return this.isTested ? ( this.passed ? "success" : "error" ) : "warning"
			} else {
				return "white"
			}
		},
		statusStyle: function() {
			const color = this.isTested ? ( this.passed ? "var(--v-success-base)" : "var(--v-error-base)" ) : "var(--v-warning-base)"
			return { color, border: `thin dashed ${color}`, borderRadius: "5px" }
		}
	}
}
</script>

<style lang="scss" scoped>
</style>