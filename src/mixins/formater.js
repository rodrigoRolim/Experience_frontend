export const formater = {
  filters: {
    age (dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      const ageDate = age.toString()
      return !isNaN(ageDate) ? ageDate : "";
    },
    sex (value) {

      return [{initial: 'M', value: 'masculino'}, {initial: 'F', value: 'feminino'}]
        .find((sex) => sex.initial === value).value
    },
    date (dateString) {
      const delivery = new Date(dateString).toLocaleDateString("pt-BR")
      return delivery !== "Invalid Date" ? delivery : ""
    },
    id(healthCenter, attendanceId) {
      return healthCenter + '/' + attendanceId
    }
  }
}