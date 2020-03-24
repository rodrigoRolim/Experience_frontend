export const sizer = {
  computed: {
    getSizeInput (vm) {
      return vm.width + 'px ' + vm.height + 'px'
    },
    getSizeIcon (vm) {
      return vm.width + 'px ' + 2*vm.height + 'px'
    }
  }
}