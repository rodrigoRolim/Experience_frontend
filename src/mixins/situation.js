export const situation = {
  computed: {
    getSituation (vm) {
      switch (vm.situation) {
        case 'PF':
          return 'partial-finished'
        case 'TF':
          return 'finished'
        case 'EA':
          return 'in-progress'
        case 'N':
          return 'unrealized'
        case 'EP':
          return 'pendency'
      }
      return 'none'
    }
  }
}