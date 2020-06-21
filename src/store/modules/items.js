// can have several parameters
const orderBy = ['name']
const Items = {
  firestorePath: 'items',
  firestoreRefType: 'collection', // or 'doc'
  moduleName: 'items',
  statePropName: 'data',
  namespaced: true, // automatically added
  sync: {
    preventInitialDocInsertion: true,
  },
  // getters: {
  //   filterItemsByCategory: (state, getters) => {
  //     return Object.keys(state.users.data).forEach((item, key) => {
  //     	if (item.category.name === state.search_category ) {
  //     		delete state.users.data[key]
  //     	};
  //     }) // your sort function
  //   },
  //   all: (state, getters) => {
  //   	return state.items.data
  //   }
  // }
}

export default Items