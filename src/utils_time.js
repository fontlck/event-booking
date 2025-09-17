import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { APP_TZ } from './config'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(APP_TZ)

export function fmtDate(d) {
  if (!d) return ''
  return dayjs.tz(d, APP_TZ).format('YYYY-MM-DD')
}
export function fmtTime(t) {
  if (!t) return ''
  return dayjs.tz(t, APP_TZ).format('HH:mm')
}
export function now() { return dayjs().tz(APP_TZ) }

export default dayjs
