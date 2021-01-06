import { 
  MESSAGE_STATUS_111, 
  MESSAGE_STATUS_502, 
  MESSAGE_STATUS_401, 
  MESSAGE_STATUS_404 
} from './alias'
export const httpMessage = ({status, typeMessage= 'default', data = 'recurso', experied = false}) => {
  switch (status) {
    case 111:
      return { type: 'error', message: MESSAGE_STATUS_111 }
    case 404:
      return { type: typeMessage, message: MESSAGE_STATUS_404(data) }
    case 401: 
      return { type: 'error', message: (experied) ? MESSAGE_STATUS_401 : '' }
    case 502:
      return { type: 'error', message: MESSAGE_STATUS_502}
    case 400:
      return { type: 'error', message: 'fluxo de dados mal formados'}
  }
}