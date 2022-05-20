<template>
	<v-sheet flat class="pa-4 d-flex flex-column align-center">
		<div class="my-12" style="max-width: 400px;">
			<div class="text-h4 centered">Global Shortcuts</div>
			<v-simple-table dark>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left">Shortcut</th>
							<th class="text-left">Description</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in items" :key="`key-${index}`">
							<td class="text-left">
								<v-icon v-for="key in item.keys" :key="key">{{ key }}</v-icon>
							</td>
							<td class="text-left">{{ item.description }}</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</div>
		<p>Made with <v-icon>mdi-heart-outline</v-icon></p>
		<p>for Aaron</p>
		<p>by <v-icon>mdi-github</v-icon>sburr</p>
	</v-sheet>
</template>

<script>
export default {
	name: "AboutPage",
	data: function() {
		return {
			items: [
				{ keys: ["mdi-apple-keyboard-command", "mdi-apple-keyboard-option", "mdi-alpha-n-box-outline"], description: "Add a new tube"},
				{ keys: ["mdi-apple-keyboard-command", "mdi-apple-keyboard-option", "mdi-alpha-s-box-outline"], description: "Quick search for a tube"},
			]
		}
	}
}
</script>

<style scoped>
.centered {
	text-align: center;
}
</style>
