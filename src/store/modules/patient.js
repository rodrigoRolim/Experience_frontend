import { requestResource } from '../../services/api'
import { GET_NAME_PATIENT, GET_GENDER_PATIENT, GET_AGE_PATIENT } from '../../utils/alias'
const state = () => ({
  name: '',
  birthday: '',
  gender: '',
  deliveryDate: '',
  doctorRequester: ''
})

const getters = {
  name: state => state.name.toUpperCase(),
  gender: state => [{initial: 'M', value: 'masculino'}, {initial: 'F', value: 'feminino'}]
    .find(item => item.initial === state.gender)?.value,
  age: state => getAgeByBithday(state.birthday)
}

const actions = {
  [GET_NAME_PATIENT]: ({ commit }, { url }) => {
    
    return new Promise((resolve, reject) => {
     
      requestResource({ url, method: 'GET'})
        .then((resp) => {
          
          let { nome_cliente, sexo, data_nasc } = resp.data
          commit(GET_NAME_PATIENT, nome_cliente)
          commit(GET_GENDER_PATIENT, sexo)
          commit(GET_AGE_PATIENT, data_nasc)
          resolve(resp)
        })
        .catch((err) => {
          
          reject(err)
        })
    })
  }
}

const mutations = {
  [GET_NAME_PATIENT]: (state, name ) => {
    state.name = name
  },
  [GET_GENDER_PATIENT]: (state, gender) => {
    state.gender = gender
  },
  [GET_AGE_PATIENT]: (state, birthday) => {
    state.birthday = birthday
  }
}
function getAgeByBithday (dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}