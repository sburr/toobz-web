export default class InventoryItem {

	static #idCounter = 0

	#item = {}

	constructor(item = {}) {
		if (typeof item === "string") {
			item = { inventoryNbr: item }  // interpret it as the inventoryNbr
		} else {
			if (!"inventoryNbr" in item) {
				item.inventoryNbr = "<pending>"
			}
		}
		this.#item = item  // store a direct reference
	}

	get inventoryNbr() { return this.#item.inventoryNbr }

	get manufacturerPartNbr() { return this.#item.manufacturerPartNbr }
	set manufacturerPartNbr(value) { this.#item.manufacturerPartNbr = value }

	get alternatePartNbr() { return this.#item.alternatePartNbr }
	set alternatePartNbr(value) { this.#item.alternatePartNbr = value }

	get productName() { return this.#item.productNname }
	set productName(value) { this.#item.productName = value }

	get productDescription() { return this.#item.productDescription }
	set productDescription(value) { this.#item.productDescription = value }

	get manufacturer() { return this.#item.manufacturer }
	set manufacturer(value) { this.#item.manufacturer = value }

	get brandName() { return this.#item.brand }
	set brandName(value) { this.#item.brandName = value }

	get productCondition() { return this.#item.productCondition }
	set productCondition(value) { this.#item.productCondition = value }

	get testStatus() { return this.#item.testStatus }
	set testStatus(value) { this.#item.testStatus = value }

	get facts() { return this.#item.facts || [] }
	set facts(values) { this.#item.facts = values }

	get filamentVoltage() {
		console.log("getting filament voltage", this.manufacturerPartNbr, this.#item )
		const matches = this.manufacturerPartNbr.match(/(^[0-9]+)/)
		return matches && matches.length ? matches[0] : ""
	}
	
	get functionCode() {
		const matches = this.manufacturerPartNbr.match(/([^0-9]+)/g)
		return matches && matches.length ? matches[0] : ""
	}
	
	get elementCount() {
		const matches = this.manufacturerPartNbr.match(/([0-9]+)/g)
		return matches && matches.length ? matches[1] : ""
	}
	
	get variant() {
		const matches = this.manufacturerPartNbr.match(/([^0-9]+)/g)
		return matches && matches.length ? matches[1] : ""
	}
	
	get testFacts() {
		return this.facts.filter(function(fact) { return fact.name.match(/^test/i) })
	}

	get nonPhotoFacts() {
		return this.facts.filter(function(fact) { return fact.name !== "Photo" })
	}
	
	get photos() {
		return this.facts.filter(function(fact) { return fact.name === "Photo" })
	}

	get firstPhoto() {
		return this.photos.length ? this.photos[0] : undefined
	}

	get otherPhotos() {
		return this.photos.length ? this.photos.slice(1) : []
	}
}