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
        case 'NR':
          return 'unrealized'
        case 'EP':
          return 'pendency'
        case 'N': 
          return 'unrealized'
      }
    }
  }
}