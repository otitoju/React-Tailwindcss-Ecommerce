// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import todo from '@src/views/apps/todo/store'
import chat from '@src/views/apps/chat/store'
import users from '@src/views/apps/user/store'
import invoice from '@src/views/apps/invoice/store'
import calendar from '@src/views/apps/calendar/store'
import dataTables from '@src/views/tables/data-tables/store'
import permissions from '@src/views/apps/roles-permissions/store'

const rootReducer = {
  auth,
  todo,
  chat,
  users,
  navbar,
  layout,
  invoice,
  calendar,
  dataTables,
  permissions
}

export default rootReducer
