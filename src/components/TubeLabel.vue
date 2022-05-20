<template>
	<v-card flat class="d-flex flex-row justify-start align-center pa-4" v-bind="$attrs">
		<summary-card :item="item" class="tube-summary" width="400"/>
		<qr-code :text="permalink" :size="240" class="d-block ml-8" />
	</v-card>
</template>

<script>
import QrCode from "vue-qr"
import SummaryCard from "@/components/SummaryCard.vue"

export default {
	name: "TubeLabel",
	components: { QrCode, SummaryCard },
	props: {
		item: { type: Object, required: true }
	},
	computed: {
		permalink: function() { return window.location.href },
	}
}
</script>

<style lang="scss" scoped>
.tube-summary {
	border: thin solid rgba(255, 255, 255, 0.12);
}
</style>