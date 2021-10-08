import Vue from 'vue'
import Vuex from 'vuex'
import 'firebase/firestore';
import { dbMenuAdd ,dbOrders   } from '../firebase'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    menuItems: [],
    cart: [],
    orderItems:[],
  },
  mutations: {
    addCheckoutItem:(card)=>{
      dbOrders.add({
        orderNumber:1, 
        field: card
      })

    },
    setMenuItems: state => {

      let menuItems = []
      dbMenuAdd.onSnapshot((snapshotItems) => {
        menuItems = []

        snapshotItems.forEach((doc) => {
          var menuItemData = doc.data() 
          console.log(doc.data())
          menuItems.push({
            ...menuItemData,
            id: doc.id,
          })
        })
        state.menuItems = menuItems
      })
    }, // Work on adding to database dbOrders []
    setOrderItems: state => {

      let orderItems = []
      dbOrders.onSnapshot((snapshotItems) => {
        orderItems = []

        snapshotItems.forEach((doc) => {
          var orderItemData = doc.data() 
          console.log(doc.data())
          orderItems.push({
            ...orderItemData,
            id: doc.id,
          })
        })
        state.orderItems = orderItems
      })
    }, 


    addToCart(state, menuItem) {
      let item = state.cart.find(i => i.id === menuItem.id)
      if (item) {
        item.quantity++
      } else {
        state.cart.push({ ...menuItem, quantity: 1 })
      }
      updateLocalStorage(state.cart)
    },
    removeFromCart(state,product){
      let item = state.cart.find(i => i.id === product.id)
      if(item){
          if(item.quantity > 1 ){
              item.quantity--
          }else{
              state.cart = state.cart.filter( i => i.id !== product.id)
          }
      }
      updateLocalStorage(state.cart)
  },
  removeItem(state,product){
      let item = state.cart.find(i => i.id === product.id)
      state.cart.splice(item,1)
      updateLocalStorage(state.cart)

  }, 
    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem('cart')
      if (cart) {
        state.cart = JSON.parse(cart)
      }
    }
  },
  actions: {
    setMenuItems: context => {
      context.commit('setMenuItems')
    },
    setOrderItems: context => {
      context.commit('setOrderItems')
    },
    // Setting from db 
    setCheckoutItem:(context) =>{
      context.commit('addCheckoutItem')
    }
  },
  getters: {
    getMenuItems: state => state.menuItems,
    getOrderItems: state => state.OrderItems,
    // add getter for current orders 

    getProductById: (state) => (id) => {
      return state.menuItems.find(menuItem => menuItem.id == id)

    },
    cartObjects: state => {
      return state.cart
    }, // Total in cart
    cartTotal: state => {
      return state.cart.reduce((a, b) => a + (b.price * b.quantity), 0)
    },
    tottal: state => {
      return state.cart.reduce((a,b) => a + b.quantity,0);
  },
  },


  modules: {

  }
})

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))

}