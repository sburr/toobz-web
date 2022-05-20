import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/search/:searchText',
		name: 'search',
		component: Home
	},
	{
		path: '/edit/:inventoryNbr?',
		name: 'edit',
		component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue')
	},
	{
		path: '/view/:inventoryNbr',
		name: 'view',
		component: () => import(/* webpackChunkName: "view" */ '../views/View.vue')
	},
	{
		path: '/label/:inventoryNbr',
		name: 'label',
		component: () => import(/* webpackChunkName: "label" */ '../views/Label.vue')
	},
	{
		path: '/test',
		name: 'test',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
