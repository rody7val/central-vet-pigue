import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    cart: [],
    total: 0,
    // categories: [],
    search_category: ""
  },
  // actions: {
  //   getCategoriesFromApi (store) {
  //     axios.get("https://web-central-vet.herokuapp.com/api/categories").then(response => {
  //       store.commit("setCategories", response.data.categories)
  //     })
  //   }
  // },
  // getters: {
  //   getCartItems: state => {
  //     return state.cart.map((item, index) => {
  //       item.total_price = "$ "+item.price
  //       console.log(item)
  //       return {item}
  //     })
  //   }
  // },
  mutations: {
    // setCategories (state, categories) {
    //   state.categories = categories
    // },

    // set item to cart
    addItemToCart (state, item) {
    	let pass = true

      state.cart.forEach((i, index) => {
        // if repeat...
        if (i.title == item.title) {
          //set item count
          let countBuffer = Number(i.count) + Number(item.count)
          state.cart[index].count = countBuffer
          pass = false
        }
      })

      if (pass) {
        state.cart = state.cart.concat(item)  //add item
        state.count = state.cart.length  //set count item
      }

      state.total = 0
      state.cart.forEach((item, index) => { //set total price
        state.total += item.price * item.count
      })
    },

    // edit item.count and item.price by id
    editItemById (state, data) {
      console.log(data)
      state.cart.forEach((item, index) => {
        // match item
        if (item.id == data.id) {
          // edit count
          let price = Number(data.count) * Number(data.price)
          item.count = Number(data.count)
          item.total_price = Number(data.price) * Number(data.count)
          return 
        }
      })

      state.total = 0
      state.cart.forEach((item, index) => { //set total price
        state.total += item.price * item.count
      })
    },


    // delet item from cart by id
    deleteItemById (state, id) {
      state.cart = state.cart.filter(item => {
        return item.id != id
      })
      state.count = state.cart.length
    },

    // delete cart from cart
    deleteAllItems (state) {
      state.cart = []
      state.count = state.cart.length
    }
  }
})

export default store
