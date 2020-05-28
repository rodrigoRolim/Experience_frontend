export const sizer = {
  computed: {
    getSizeInput (vm) {
      return vm.height + 'px ' + vm.width + 'px'
    },
    getSizeIcon (vm) {
      return vm.height + 'px ' + 2*vm.width + 'px'
    }
  }
}