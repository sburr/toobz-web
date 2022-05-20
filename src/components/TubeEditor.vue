<template>
	<v-card flat class="tube-editor pa-4">

		<v-card-title v-if="item" class="primary--text text-md-h3 text-lg-h2 mb-2">
			<v-icon x-large color="primary" class="mr-2">mdi-test-tube</v-icon>
			<span v-if="item.inventoryNbr === '<pending>'">New Tube</span>
			<span v-else>{{ item.inventoryNbr }}</span>
		</v-card-title>

		<v-card-text v-if="item">
			<v-form>
				<v-container class="pa-0 ma-0">

					<v-row dense>
						<v-col cols="12">
							<v-autocomplete dark outlined v-model="item.manufacturerPartNbr" :loading="manufacturerPartNbrLoading" :items="manufacturerPartNbrs" :search-input.sync="manufacturerPartNbrSearch" cache-items hide-no-data label="Manufacturer Part Number" hint="Example: 12AX7A" >
								<template v-slot:append-outer>
									<v-btn dark text outlined style="margin-top: -6px;" :disabled="! item.manufacturerPartNbr" :href="`https://google.com/search?q=${item.manufacturerPartNbr}`" target="_new" >
										<v-icon class="mr-1">mdi-google</v-icon>
										<span v-if="!$vuetify.breakpoint.mobile">Google</span>
									</v-btn>
								</template>
							</v-autocomplete>
						</v-col>
					</v-row>

					<v-row dense fluid>
						<v-col cols="12" lg="4">
							<v-autocomplete dark outlined v-model="item.manufacturer" :loading="manufacturerLoading" :items="manufacturers" :search-input.sync="manufacturerSearch" cache-items hide-no-data label="Manufacturer" hint="example: westinghouse" />
						</v-col>
						<v-col cols="12" lg="4">
							<v-autocomplete dark outlined v-model="item.brandName" :loading="brandNameLoading" :items="brandNames" :search-input.sync="brandNameSearch" cache-items hide-no-data label="Brand" hint="Example: RCA" />
						</v-col>
						<v-col cols="12" lg="4">
							<v-text-field v-model="item.alternatePartNbr" dark label="Alternate Part Number" outlined hint="Example: 3042" />
						</v-col>
					</v-row>

					<v-row dense>
						<v-col cols="12" lg="6">
							<v-text-field v-model="item.productName" dark label="Product Name" outlined hint="Example: 12AX7A Vacuum tube" />
						</v-col>
						<v-col cols="12" lg="6">
							<v-text-field v-model="item.productDescription" dark label="Product Description" outlined hint="Example: Standard 12V vacuum tube" />
						</v-col>
					</v-row>

					<v-row dense class="d-flex flex-row justify-start align-center">
						<v-col cols="6" lg="4">
							<v-radio-group v-model="item.productCondition" row> <!--style="margin-top: -6px;">-->
								<v-radio label="New" value="new"/>
								<v-radio label="Used" value="used"/>
							</v-radio-group>
						</v-col>
						<v-col cols="6" lg="4">
							<v-switch v-model="item.testStatus" :label="`Has ${item.testStatus ? '' : 'not '} been tested`" />
						</v-col>
					</v-row>

				</v-container>

				<v-card-title>Facts Editor</v-card-title>

				<v-btn dark text outlined class="ml-2 mb-4" @click="addFact('Photo', 'Photo of the item')">
					<v-icon class="mr-1">mdi-camera</v-icon>Add Photo
				</v-btn>
				<v-btn dark text outlined class="ml-2 mb-4" @click="addFact('Datasheet', 'Product datasheet link')">
					<v-icon class="mr-1">mdi-file-document-outline</v-icon>Add Datasheet
				</v-btn>
				<v-btn dark text outlined class="ml-2 mb-4" @click="addFact('Note', 'An arbitrary note about the item')">
					<v-icon class="mr-1">mdi-note-edit-outline</v-icon>Add Note
				</v-btn>
				<v-btn dark text outlined class="ml-2 mb-4" @click="addFact('Bin Locator', 'Storage bin number where the item is located')">
					<v-icon class="mr-1">mdi-package-variant</v-icon>Add Bin Locator
				</v-btn>
				<v-btn v-if="item.testStatus" dark text outlined class="ml-2 mb-4" @click="addFact('Test Results', 'Product test results')">
					<v-icon class="mr-1">mdi-test-tube</v-icon>Add Test Results
				</v-btn>
				<v-dialog v-model="factDialog" max-width="400">
					<template v-slot:activator="{ on, attrs }">
						<v-btn dark text outlined class="ml-2 mb-4" v-bind="attrs" v-on="on">
							<v-icon class="mr-1">mdi-plus</v-icon>Add Fact...
						</v-btn>
					</template>
					<v-card dark class="fact-dialog">
						<v-card-title>Add new fact...</v-card-title>
						<v-card-text>
							<v-text-field v-model="factName" dark label="Fact Name" outlined hint="Example: Filament Voltage" />
						</v-card-text>
						<v-divider />
						<v-card-actions>
							<v-spacer />
							<v-btn dark text @click="factDialog = false">Cancel</v-btn>
		  					<v-btn dark color="primary" outlined :disabled="!factName" @click="addNewFact(factName)">OK</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<div class="mt-6">
					<v-text-field v-for="(fact, index) in item.facts" v-model="fact.value" dark outlined :label="fact.name" :hint="fact.description" :key="`${fact.name}--${index}`" >
						<template v-slot:append-outer>
							<div class="d-flex align-center" :style="{marginTop: isPhoto(fact) ? '-18px' : 0}">
								<template v-if="isPhoto(fact)">
									<fact-image :fact="fact" thumbnail size="small" :key="`preview-${fact.id}`" />
									<v-btn icon @click="onShowCamera(fact)"><v-icon>mdi-camera</v-icon></v-btn>
								</template>
								<v-btn icon style="margin-top: -6px;" v-on:click="removeFact(index)">
									<v-icon>mdi-trash-can-outline</v-icon>
								</v-btn>
							</div>
						</template>
					</v-text-field>
				</div>

			</v-form>

			<span class="d-block font-italic" v-if="item.createdOn">Last updated: {{ item.createdOn }}</span>
			<span class="d-block font-italic" v-if="item.lastModified">Last modified: {{ item.lastModified }}</span>
		</v-card-text>

		<v-card-actions>
			<v-container class="pa-0 ma-0">
				<v-row dense>
					<v-col>
						<v-btn v-if="item.inventoryNbr" text color="error" @click="deleteItem"><v-icon left class="mr-1" color="error">mdi-trash-can-outline</v-icon>Delete Item</v-btn>
					</v-col>
					<v-col>
						<v-btn text :disabled="!isValid" @click="viewMaybe"><v-icon class="mr-1">mdi-eye-outline</v-icon>View</v-btn>
					</v-col>
					<v-col>
						<v-btn text class="ml-4" @click="closeMaybe"><v-icon class="mr-1">mdi-home</v-icon>Home</v-btn>
					</v-col>
					<v-col>
						<v-btn dark color="primary" outlined class="ml-4" :disabled="!isValid" @click="save"><v-icon class="mr-1">mdi-content-save-outline</v-icon>Save</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-card-actions>

		<v-dialog v-model="closeDialog" max-width="420">
			<v-card class="fact-dialog">
				<v-card-title>Lose changes?</v-card-title>
				<v-card-text>
					Your changes to <span class="text--primary">{{ item.inventoryNbr }}</span> have not been saved.
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-spacer />
					<v-btn dark text @click="closeDialog=false">Cancel</v-btn>
					<v-btn dark color="error" outlined @click="closeAction"><v-icon class="mr-1">mdi-trash-can</v-icon>Continue<span v-if="!$vuetify.breakpoint.mobile"> and Lose Changes</span></v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<easy-camera v-if="showCamera" v-model="cameraPhoto" @approve="onCameraApprove" @close="onCameraClose" @loading="onCameraLoading" fullscreen auto-detect-mobile :must-approve="false" />

	</v-card>
</template>

<script>
import FactImage from "@/components/FactImage.vue"
import EasyCamera from "easy-vue-camera"

export default {
	name: "TubeEditor",
	components: { EasyCamera, FactImage },
	props: {
		item: { type: Object },
	},
	data: function() {
		return {
			factIdCounter: 0,
			factDialog: false,
			factName: "",
			manufacturerPartNbrs: [],
			manufacturerPartNbrSearch: null,
			manufacturerPartNbrLoading: false,
			manufacturers: [],
			manufacturerSearch: null,
			manufacturerLoading: false,
			brandNames: [],
			brandNameSearch: null,
			brandNameLoading: false,
			requiredFields: [ "manufacturerPartNbr" ],
			isDirty: false,
			closeDialog: false,
			closeAction: null,
			addedTestFacts: false,
			showCamera: false,
			cameraPhoto: "",
			cameraFact: {},
		}
	},
	watch: {
		item: {
			handler: function(newValue) {
				console.log("[TubeEditor] item changed - marking dirty")
				console.log("[TubeEditor] current facts", this.item.facts)
				this.isDirty = newValue && true  // should be false if the item is still empty
			},
			deep: true
		},
		"item.testStatus": function(newValue) {
			if (newValue && this.item.inventoryNbr === "<pending>" && !this.addedTestFacts) {
				this.addFact("Test Date", "When the product was tested", (new Date()).toISOString())
				this.addFact("Test Results", "Product test results")
				this.addedTestFacts = true
			}
		},
		manufacturerPartNbrSearch: function(val) {
			return val && val != this.item.manufacturerPartNbr && this.fetchManufacturerPartNbrs(val)
		},
		manufacturerSearch: function(val) {
			return val && val != this.item.manufacturer && this.fetchManufacturers(val)
		},
		brandNameSearch: function(val) {
			return val && val != this.item.brandName && this.fetchBrandNames(val)
		}
	},
	computed: {
		isValid: function() {
			const self = this
			let isValid = true
			this.requiredFields.forEach(function(key) {
				isValid &&= self.item[key]
			})
			return isValid
		}
	},
	methods: {
		onShowCamera: function(fact) {
			console.log("[TubeEditor] show camera for fact", fact.id)
			this.cameraFact = fact
			this.cameraPhoto = ""
			this.showCamera = true
		},
		onCameraLoading: function(e) {
			const fact = this.cameraFact
			console.log("[TubeEditor] camera loading", e, fact.id)
		},
		onCameraClose: function() {
			const fact = this.cameraFact
			console.log("[TubeEditor] camera close", fact.id)
			console.log("[TubeEditor] cameraFact", fact)
			console.log("[TubeEditor] hiding")
			if (this.cameraPhoto) {
				console.log("[TubeEditor] original fact value", fact.value ? fact.value.substring(0, 20) : fact.value)
				fact.value = this.cameraPhoto
				console.log("[TubeEditor] new fact value", fact.value.substring(0,20))
			}
			this.cameraPhoto = ""
			this.showCamera = false
		},
		onCameraApprove: function() {
			const fact = this.cameraFact
			console.log("[TubeEditor] camera approve", fact.id)
		},
		isPhoto: function(fact) {
			return fact.name.toLowerCase() === "photo"
		},
		addFact: function(name, desc, value) {
			// value and desc are optional
			this.item.facts.push({ id: `new-${this.factIdCounter++}`, name, value, description: desc ? desc : name })
		},
		addNewFact: function(name) {
			this.addFact(name)
			this.factDialog = false
		},
		removeFact: function(index) { this.item.facts.splice(index, 1) },
		fetchManufacturerPartNbrs: async function(prefix) {
			console.log("[TubeEditor] fetching manufacturer part numbers list...")
			this.manufacturerPartNbrLoading = true
			try {
				const results = await this.$http.get(this.buildApiUrl("/partnumbers"))
				console.log("[TubeEditor] fetched manufacturer part numbers list", results.data)
				this.manufacturerPartNbrs = (results.data || []).filter(function(nbr) {
					return (nbr || "").toLowerCase().indexOf((prefix || "").toLowerCase()) > -1
				})
				this.manufacturerPartNbrLoading = false
			} catch(e) {
				console.error("[TubeEditor] Error fetching manufacturer part numbers", e)
				this.manufacturerPartNbrLoading = false
			}
		},
		fetchManufacturers: async function(prefix) {
			console.log("[TubeEditor] fetching manufacturers list...")
			this.manufacturersLoading = true
			try {
				const results = await this.$http.get(this.buildApiUrl("/manufacturers"))
				console.log("[TubeEditor] fetched manufacturers list", results.data)
				this.manufacturers = (results.data || []).filter(function(mfr) {
					return (mfr || "").toLowerCase().indexOf((prefix || "").toLowerCase()) > -1
				})
				this.manufacturersLoading = false
			} catch(e) {
				console.error("[TubeEditor] Error fetching manufacturers", e)
				this.manufacturersLoading = false
			}
		},
		fetchBrandNames: async function(prefix) {
			console.log("[TubeEditor] fetching brand names list...")
			this.brandNameLoading = true
			try {
				const results = await this.$http.get(this.buildApiUrl("/brands"))
				console.log("[TubeEditor] fetched brand names list", results.data)
				this.brandNames = (results.data || []).filter(function(name) {
					return (name || "").toLowerCase().indexOf((prefix || "").toLowerCase()) > -1
				})
				this.brandNameLoading = false
			} catch(e) {
				console.error("[TubeEditor] Error fetching brand names", e)
				this.brandNameLoading = false
			}
		},
		closeMaybe: function() {
			if (this.isDirty) {
				this.closeAction = this.close
				this.closeDialog = true
			} else {
				this.close()
			}
		},
		close: function() {
			this.closeDialog = false
			this.$emit("done")
		},
		viewMaybe: function() {
			if (this.isDirty) {
				this.closeAction = this.view
				this.closeDialog = true
			} else {
				this.view()
			}
		},
		view: function() {
			this.closeDialog = false
			this.$emit("view")
		},
		deleteItem: function() {
			this.$emit("delete", this.item)
		},
		save: async function() {
			console.log("[TubeEditor] saving item", this.item)
			try {
				let results, item
				if (this.item.inventoryNbr === "<pending>") {
					console.log("[TubeEditor] creating via post API", this.item)
					results = await this.$http.post(this.buildApiUrl("/toobz"), this.item)
					console.log("[TubeEditor] successfully created", results.data)
					Object.assign(this.item, results.data)
				} else {
					console.log("[TubeEditor] updating via put API", this.item)
					results = await this.$http.put(this.buildApiUrl(`/toobz/inventory/${this.item.inventoryNbr}`), this.item)
					console.log("[TubeEditor] successfully saved", results.data)
					Object.assign(this.item, results.data)
				}
				this.isDirty = false
				this.$emit("save", this.item)
			} catch(e) {
				console.error("[TubeEditor] Error saving item", e)
			}

		},
	},
	created: function() {
		console.log("[TubeEditor] on created", this.item)
		this.fetchManufacturerPartNbrs()
		this.fetchManufacturers()
		this.fetchBrandNames()
	}
}
</script>

<style scoped>
/deep/ .v-input__append-outer {
	align-items: center;
}
/*
/deep/ .fullscreen-camera .camera-stack .camera-stack-controls .camera-stack-controls-wrapper {
	width: 40px !important;
}
*/

.fact-dialog {
	border: thick solid #ffffff99;
}
</style>