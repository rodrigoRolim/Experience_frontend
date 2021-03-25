import { DATE_VALIDATOR } from '../../utils/alias'
import { isOption, endLtBegin, beginGtEnd, required, date } from './rules'
import { validator } from './validator'
export const begin = {
  mixins: [validator({ beginGtEnd, endLtBegin, date, required })],
  watch: {
    'params.begin': function (value) {
      if (this.required(value)) {

        this.validate.begin = 'campo obrigatório'
        
      } else if (this.beginGtEnd(value, this.params.end)) {
        
        this.validate.begin = 'data de inicio inválida'
      } else if (this.endLtBegin(this.params.begin, this.params.end)){
        
        this.validate.end = 'data de fim inválida'
      } else if (!this.date(value, DATE_VALIDATOR)) {
        this.validate.begin = 'data inválida'
      } else {
        this.validate.begin = ''
        this.validate.end = ''
      }
    }
  }
}
export const end = {
  mixins: [validator({ beginGtEnd, endLtBegin, date, required })],
  watch: {
    'params.end': function (value) {
      if (this.required(value)) {
        this.validate.end = 'campo obrigatório'

      } else if (this.endLtBegin(this.params.begin, value)) {
        this.validate.end = 'data de fim inválida'
      } else if (this.beginGtEnd(this.params.begin, this.params.end)){
        this.validate.begin = 'início inválido'
      } else if (!this.date(value, DATE_VALIDATOR)){
        this.validate.end = 'data inválida'
      } else {
        this.validate.begin = ''
        this.validate.end = ''
      }
    },
  }
}
export const healthCenter = {
  mixins: [validator({ isOption, required })],
  watch: {
    'params.healthCenter': function (value) {

      if (this.required(value)) {
        this.validate.healthCenter = 'campo obrigatório'
      } else if (this.isOption(value, this.healthCenters)) {
        this.validate.healthCenter = 'opção inválida'
      } else {
        this.validate.healthCenter = ''
      }
    },
  }
}
export const accomodation = {
  mixins: [validator({ isOption, required })],
  watch: {
    'params.accomodation': function (value) {

      if (this.required(value)) {
        this.validate.accomodation = 'campo obrigatório'
      } else if (this.isOption(value, this.accomodations)) {
        this.validate.accomodation = 'opção inválida'
      } else {
        this.validate.accomodation = ''
      }
    },
  }
}
export const situation = {
  mixins: [validator({ isOption, required })],
  watch: {
    'params.situation': function (value) {
      if (this.required(value)) {
        this.validate.situation = 'campo obrigatório'
      } else if (this.isOption(value, this.situations)) {
        this.validate.situation = 'opção inválida'
      } else {
        this.validate.situation = ''
      }
    },
  }
}

export const realizer = {
  mixins: [validator({ required, isOption })],
  watch: {
    'params.realizer': function (value) {

      if (this.required(value)) {
        this.validate.realizer = 'campo obrigatório'
      } else if (this.isOption(value, this.registrants)) {
        this.validate.realizer = 'opção inválida'
      } else {
        this.validate.realizer = ''
      }
    },
  }
}