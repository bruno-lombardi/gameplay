import { GuildModel } from './Guild'

export type AppointmentModel = {
  id: string
  guild: GuildModel
  category: string
  date: string
  description: string
}
