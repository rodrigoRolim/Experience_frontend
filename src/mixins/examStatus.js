export const examStatus = {
  computed: {
    getStatus (vm) {
      switch (vm.status) {
        case 'PENDENCIA':
          return 'pendencies'
        case 'FINALIZADO':
          return 'finished'
        case 'AGUARDANDO':
          return 'waiting'
        case 'ANDAMENTO':
          return 'in-progress'
        case 'NAO':
          return 'no-realized-yet'
      }
    }
  }
}