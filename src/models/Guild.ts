import { MemberModel } from './Member'

export type GuildModel = {
  id: string
  name: string
  icon: string | null
  owner: boolean
  splash?: string
}

export type GuildWidgetModel = {
  id: string
  name: string
  instant_invite: string
  members: MemberModel[]
}
