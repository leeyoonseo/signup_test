export const state = () => ({
  user: {
    name: '',
    email: '',
    rePassword: '',
    password: '',
    phone: '',
    address: '',
    detailAddress: '',
    cardNumber: '',
    tempCardNum1: '',
    tempCardNum2: '',
    tempCardNum3: '',
    tempCardNum4: '',
  },
});

export const getters = {
  user: state => state.user,
};

export const mutations = {
  setUser(state, payload) {
    state.user = {
      ...state.user,
      ...payload,
    }
  }
};

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  }
}
