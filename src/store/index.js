import Vue from 'vue'
import Vuex from 'vuex'
import 'firebase/firestore';
import { dbMenuAdd, dbOrders, db } from '../firebase'
import firebase from "firebase/compat";
import "firebase/compat/auth";
import "firebase/firestore";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    menuItems: [],
    cart: [],
    orderItems: [],
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUserName: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    updateUser(state, payload) {
      state.user = payload;

    },

    addCheckoutItem: (state) => {

      dbOrders.add({
        orderNumber: 1,
        orderFromUser: state.cart
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
    },

    // Work on adding to database dbOrders []
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
    removeFromCart(state, product) {
      let item = state.cart.find(i => i.id === product.id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          state.cart = state.cart.filter(i => i.id !== product.id)
        }
      }
      updateLocalStorage(state.cart)
    },
    removeItem(state, product) {
      let item = state.cart.find(i => i.id === product.id)
      state.cart.splice(item, 1)
      updateLocalStorage(state.cart)

    },// set details
    setProfileDetails(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUserName = doc.data().userName;
    }, // inititals match
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
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
    setOrderItems: (context) => {
      context.commit('setOrderItems')
    },
    // Setting from db 
    setCheckoutItem: (context) => {
      context.commit('addCheckoutItem')
    }, // Auth here 
    async getCurrentUser({ commit }) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbFinal = await dataBase.get();
      commit("setProfileDetails", dbFinal);
      commit("setProfileInitials")
    },

  },
  getters: {
    getMenuItems: state => state.menuItems,
    getOrderItems: state => state.orderItems,
    user: (state) => state.user,
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
      return state.cart.reduce((a, b) => a + b.quantity, 0);
    },

  },


  modules: {

  }
})

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))

}