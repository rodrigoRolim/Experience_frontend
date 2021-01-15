export const pagination = {
  methods: {
    loadAttendancesByScroll () {
      window.addEventListener('scroll', this.getMoreAttendances)
    },
    destroyAttendancesByScroll () {
      window.removeEventListener('scroll', this.getMoreAttendances)
    },
    paramsQuery () {
      let queries = {}
      if (this.params.realizer.id) queries['postocadastro'] = this.params.realizer.id
      if (this.params.healthCenter.id) queries['postorealizante'] = this.params.healthCenter.id
      if (this.params.accomodation.id) queries['acomodacao'] = this.params.accomodation.id
      if (this.params.situation.id) queries['situacao'] = this.params.situation.id
      if (this.params.name) queries['nome'] = this.params.name
      queries['limit'] = this.params.limit
      queries['page'] = this.params.page
      
      return queries
    },
    getMoreAttendances (params) {

      if (this.hasMoreAttendances) {
        let healthCenter = this.healthCenterLogged || this.userId
        let urlName = GET_ATTENDANCES(healthCenter,
            this.params.begin.split(" - ").join("-"),
            this.params.end.split(" - ").join("-"),
            this.getTypeUser(this.userTypeAuthed))
        this.nextPage()
        let headers = {'X-Paginate': true}
        this.requestMoreAttendances({ url: urlName, params, headers })
          .then(this.repositionScrollBar(0))
          .catch(this.repositionScrollBar(0))
      } 
    },
    repositionScrollBar(pos) {
      document.documentElement.scrollTop = pos
    },
    ...mapActions(NAMESPACED_ATTENDANCE, {
      requestMoreAttendances: PUSH_ATTENDANCES_STORE
    }),
    ...mapMutations(NAMESPACED_ATTENDANCE, {
      nextPage: NEXT_PAGE,
      pushing: LOAD_PUSH
    })
  }
}