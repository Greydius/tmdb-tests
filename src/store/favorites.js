export default {
	namespaced: true,
	state: {
		favorites: []
	},
	getters: {
	},
	mutations: {
		save: (state) => {
			localStorage.setItem('favorites', state.favorites)
		},
		add: (state, id) => {
			state.favorites.push(id)
		},
		remove: (state, id) => {
			state.favorites = state.favorites.filter( movie => movie !== id )
		},
		read: (state) => {
			const favoritesString = localStorage.getItem('favorites')
			if(favoritesString){
				const favorites = favoritesString.split(',');
				state.favorites = favorites
			}
		}
	},
	actions: {
		add: ({commit}, id) => {
			commit('add', id)
			commit('save')
		},
		remove: ({commit}, id) => {
			commit('remove', id)
			commit('save')
		},
	}
}