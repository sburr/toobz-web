<template>
	<v-img :src="fact.value" :alt="fact.value" :class="imageClass" :min-height="height" :max-height="height" :min-width="width" :max-width="width" contain aspect-ratio="1" :key="key" v-bind="$attrs" />
</template>

<script>
export default {
	name: "FactImage",
	props: {
		fact: { type: Object, required: true },
		thumbnail: { type: Boolean, default: false },
		size: { type: String, default: "normal" },
	},
	computed: {
		key: function() { return `${this.fact.name}-${this.fact.value}` },
		imageClass: function() { return `product-photo ma-2 ${this.thumbnail ? 'd-inline-block' : ''}` },
		dimension: function() {
			switch(this.size.toLowerCase()) {
				case "x-small":
					return 20
				case "small":
					return 40
				case "medium":
				case "normal":
				default:
					return 80
				case "large":
					return 120
				case "x-large":
					return 320
			}
		},
		height: function() { return this.thumbnail ? this.dimension : 2 * this.dimension },
		width: function() { return this.thumbnail ? this.dimension : 2 * this.dimension },
	}
}
</script>

<style scoped>
.product-photo {
	background: white;
	border: 1px solid #056404;
}
</style>