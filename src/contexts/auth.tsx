import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '~/models/User'
import { api } from '~/services/api'
import { COLLECTION_USERS } from '~/configs/database'

const { SCOPE } = process.env
const { CLIENT_ID } = process.env
const { CDN_IMAGE } = process.env
const { REDIRECT_URI } = process.env
const { RESPONSE_TYPE } = process.env

type AuthContextData = {
  user: User | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string
    error?: string
  }
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = useCallback(async () => {
    try {
      setLoading(true)
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      const response = (await AuthSession.startAsync({
        authUrl
      })) as AuthorizationResponse

      if (response.type === 'success' && !response.params.error) {
        api.defaults.headers.authorization = `Bearer ${response.params.access_token}`

        const userInfoResponse = await api.get('/users/@me')
        const userInfo = userInfoResponse.data

        const firstName = userInfo.username.split(' ')[0]
        userInfo.avatar = `${CDN_IMAGE}/avatars/${userInfo.id}/${userInfo.avatar}.png`

        const userData = {
          ...userInfo,
          firstName,
          token: response.params.access_token
        }
        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))

        setUser(userData)
        setLoading(false)
      }
    } catch (err) {
      // console.log(err)
      throw new Error('Não foi possível autenticar.')
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    setUser(null)
    await AsyncStorage.removeItem(COLLECTION_USERS)
  }, [])

  const loadUserFromStorage = useCallback(async () => {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS)

    if (storage) {
      const userLogged = JSON.parse(storage) as User
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`

      setUser(userLogged)
    }
  }, [])

  useEffect(() => {
    loadUserFromStorage()
  }, [loadUserFromStorage])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used with AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
