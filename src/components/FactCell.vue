<template>
	<div class="d-flex flex-row justify-start align-center">
		<template v-if="isHref">
			<a :href="fact.value" class="cell-link" target="_blank">
				<template v-if="isPhoto">
					<v-img :src="fact.value" :height="imageSize" :width="imageSize" contain />
					<span v-if="showHref">{{ fact.value }}</span>
				</template>
				<template v-else-if="isDatasheet">
					<v-icon color="primary" class="mr-1">mdi-file-document-outline</v-icon>
					<span v-if="!showHref">Open Link...</span>
					<span v-if="showHref">{{ fact.value }}</span>
				</template>
				<template v-else>
					<span v-if="showHref">{{ fact.value }}</span>
					<span v-else>
						<v-icon color="primary" v-if="!isDatasheet">mdi-open-in-new</v-icon>
						Open Link...
					</span>
				</template>
			</a>
			<template v-if="!showHref">
				<v-icon class="ml-2" @click.self.prevent="disclose=!disclose">
					{{ disclose ? 'mdi-eye-outline' : 'mdi-eye' }}
				</v-icon>
				<span v-if="disclose" class="ml-2">{{ fact.value }}</span>
			</template>
		</template>
		<span v-else>
			{{ fact.value }}
		</span>
	</div>
</template>

<script>
export default {
	name: "FactCell",
	props: {
		fact: { type: Object, required: true },
		showHref: { type: Boolean, default: false },
		imageSize: { type: Number, default: 40 },
	},
	data: function() {
		return {
			disclose: false
		}
	},
	computed: {
		isDatasheet: function() { return this.fact.name.toLowerCase() === "datasheet" },
		isPhoto: function() { return this.fact.name.toLowerCase() === "photo" },
		isHref: function() { return this.fact.value.startsWith("http") },
	}
}
</script>

<style lang="scss" scoped>
.cell-link {
	text-decoration: none;
	&:hover, &:active {
		text-decoration: none;
	}
}
</style>