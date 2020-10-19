export const attendanceStatus = {
  computed: {
    getStatus (vm) {
      switch (vm.situation) {
        case 'EP':
          return 'pendency'
        case 'TF':
          return 'finished'
        case 'PF':
          return 'partial-finished'
        case 'EA':
          return 'in-progress'
        case 'NR':
          return 'no-realized'
      }
    }
  }
}