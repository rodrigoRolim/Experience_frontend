import { 
  MESSAGE_STATUS_111, 
  MESSAGE_STATUS_502, 
  MESSAGE_STATUS_403, 
  MESSAGE_STATUS_401, 
  MESSAGE_STATUS_404 
} from '../../utils/alias'
export const messages = {
  methods: {
    message (status, data = 'recurso') {
      switch (status) {
        case 111:
          return { type: 'error', message: MESSAGE_STATUS_111 }
        case 403: 
          return { type: 'error', message: MESSAGE_STATUS_403 }
        case 404:
          return { type: 'error', message: MESSAGE_STATUS_404(data) }
        case 401: 
          return { type: 'error', message: MESSAGE_STATUS_401 }
        case 502:
          return { type: 'error', message: MESSAGE_STATUS_502}
      }
    }
  }
}