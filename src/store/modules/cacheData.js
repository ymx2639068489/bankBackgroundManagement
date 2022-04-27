
const state = {
  productPage: 0,
  adminPage: 0,
  currentActive: {}
}

const mutations = {
  SET_PRODUCT_PAGE: (state, page) => {
    state.productPage = page
  },
  SET_ADMIN_PAGE: (state, page) => {
    state.adminPage = page
  },
  SET_CURRENT_ACTIVE: (state, currentActive) => {
    state.currentActive = currentActive
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
