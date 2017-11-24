export default class Switcher {
  switcher(state, action, consts) {
    return this[action.type] ? this[action.type](state, action) : state;
  }
}
