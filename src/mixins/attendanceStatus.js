export const attendanceStatus = {
  computed: {
    getStatus (vm) {
      switch (vm.status) {
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
        case 'SE':
          return 'no-exams'
      }
    }
  }
}