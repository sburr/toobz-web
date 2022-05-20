<template>
	<v-data-table
		dark
		:items="facts"
		:headers="headers"
		hide-default-footer
		dense
		item-key="key"
		:no-data-text="$attrs['no-data-text'] || 'No additional facts for this item'"
		:style="{ width: styleWidth }"
		v-bind="$attrs"
	>
		<template v-slot:item.value="{ item, value }">
			<fact-cell :fact="item" />
		</template>
	</v-data-table>
</template>

<script>
import FactCell from "@/components/FactCell.vue"

export default {
	name: "FactsTable",
	components: { FactCell },
	props: {
		item: { type: Object, required: true },
		ignorePhotos: { type: Boolean, default: false },
		include: { type: Array, default: function() { return [] } },
		width: { type: String, default: "100%" },
	},
	data: function() {
		return {
			headers: [
				{ text: "Name", value: "name", align: "left", sortable: true, filterable: true, groupable: true, class: "col-header", width: "200" },
				{ text: "Value", value: "value", align: "left", sortable: true, filterable: true, groupable: true, class: "col-header" }
			]
		}
	},
	computed: {
		facts: function() {
			if (!this.item.facts) { return [] }
			const self = this
			const facts = this.item.facts.map(function(fact, index) {
				fact.key = `fact-${index}`
				return fact
			})
			return facts.filter(function(fact) {
				if (self.include.length) {
					//if (self.include.includes(fact.name)) {
					if (self.includeFact(fact)) {
						return (self.ignorePhotos && fact.name === "Photo") ? false : true
					} else {
						return false
					}
				} else {
					return (self.ignorePhotos && fact.name === "Photo") ? false : true
				}
			})
		},
		styleWidth: function() {
			const s = this.width.trim()
			return (s.match(/[^0-9\.]/)) ? s : s + 'px'
		}
	},
	methods: {
		includeFact(fact) {
			if (this.include.length < 1) { return true }

			const stringRules = this.include.filter(function(rule) { return typeof(rule) === "string" })
			let stringAllow = false
			if (stringRules.length) {
				stringAllow = stringRules.includes(fact.name) 
			}

			const regexRules = this.include.filter(function(rule) { return typeof(rule) !== "string" })
			let regexAllow = regexRules.length ? false : true
			if (regexRules.length) {
				regexRules.forEach(function(regex) {
					regexAllow ||= fact.name.match(regex)
				})
			}

			return stringAllow || regexAllow
		},
	}
}
</script>