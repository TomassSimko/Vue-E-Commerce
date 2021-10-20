import 'firebase/firestore';
import { dbMenuAdd,  } from '../firebase'
import "firebase/firestore";

// initial state
const state = () => ({
    menuItems: [],
})

// getters
const getters = {
    getMenuItems: state => state.menuItems,
}

// actions
const actions = {
    setMenuItems: context => {
        context.commit('setMenuItems')
  
      },
}

// mutations
const mutations = {
    setMenuItems: state => {

        let menuItems = []
        dbMenuAdd.onSnapshot((snapshotItems) => {
          menuItems = []
  
          snapshotItems.forEach((doc) => {
            var menuItemData = doc.data()
            /*  console.log(doc.data()) */
            menuItems.push({
              ...menuItemData,
              id: doc.id,
            })
          })
          /*  state.productLoaded = true */
          state.menuItems = menuItems
          console.log(state.menuItems)
        })
      },
  }

  

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}