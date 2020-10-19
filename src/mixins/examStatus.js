export const examStatus = {
  computed: {
    getStatus (vm) {
      switch (vm.situation) {
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