import { 
  MESSAGE_STATUS_111, 
  MESSAGE_STATUS_502, 
  MESSAGE_STATUS_401, 
  MESSAGE_STATUS_404,
  MESSAGE_STATUS_400,
  MESSAGE_STATUS_403,
  MESSAGE_STATUS_498
} from './alias'
export const httpMessage = ({status, typeMessage= 'default', data = 'recurso' }) => {

  switch (status) {
    case 111:
      return { type: 'error', content: MESSAGE_STATUS_111 }
    case 404:
      return { type: typeMessage, content: MESSAGE_STATUS_404(data) }
    case 401: 
      return { type: 'error', content: MESSAGE_STATUS_401 }
    case 502:
      return { type: 'error', content: MESSAGE_STATUS_502 }
    case 400:
      return { type: 'error', content: MESSAGE_STATUS_400 }
    case 500: 
      return { type: 'error', content: 'error no servidor' }
    case 403:
      return { type: 'error', content: MESSAGE_STATUS_403 }
    case 408:
      return { type: 'error', content: MESSAGE_STATUS_498 }
  }
}