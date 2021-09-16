import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppointmentModel } from '~/models/Appointment'
import { COLLECTION_APPOINTMENTS } from '~/configs/database'

type UseAppointmentsRepository = {
  loading: boolean
  appointments: AppointmentModel[]
  fetchAppointments: (byCategory?: string) => Promise<void>
  saveAppointment: (appointment: AppointmentModel) => Promise<void>
  deleteAppointment: (appointmentId: string) => Promise<void>
}

export default function useAppointmentsRepository(): UseAppointmentsRepository {
  const [appointments, setAppointments] = useState<AppointmentModel[]>([])
  const [loading, setLoading] = useState(false)

  const readAppointmentsFromStorage = useCallback(async () => {
    const appointmentsResult = await AsyncStorage.getItem(
      COLLECTION_APPOINTMENTS
    )
    return appointmentsResult
      ? (JSON.parse(appointmentsResult) as AppointmentModel[])
      : []
  }, [])

  const writeAppointmentsToStorage = useCallback(
    async (appointmentsData: AppointmentModel[]) => {
      await AsyncStorage.setItem(
        COLLECTION_APPOINTMENTS,
        JSON.stringify(appointmentsData)
      )
    },
    []
  )

  const fetchAppointments = useCallback(
    async (byCategory?: string) => {
      try {
        setLoading(true)
        const appointmentsFromStorage = await readAppointmentsFromStorage()
        if (byCategory) {
          setAppointments(
            appointmentsFromStorage.filter(
              appointment => appointment.category === byCategory
            )
          )
        } else {
          setAppointments(appointmentsFromStorage)
        }
        setLoading(false)
      } catch (err) {
        Alert.alert('Ocorreu um erro.')
      } finally {
        setLoading(false)
      }
    },
    [readAppointmentsFromStorage]
  )

  const saveAppointment = useCallback(
    async (appointment: AppointmentModel) => {
      try {
        setLoading(true)
        const appointmentsFromStorage = await readAppointmentsFromStorage()
        appointmentsFromStorage.push(appointment)
        await writeAppointmentsToStorage(appointmentsFromStorage)
        setAppointments(appointmentsFromStorage)
      } catch (err) {
        Alert.alert('Ocorreu um erro.')
      } finally {
        setLoading(false)
      }
    },
    [readAppointmentsFromStorage, writeAppointmentsToStorage]
  )

  const deleteAppointment = useCallback(
    async (appointmentId: string) => {
      try {
        setLoading(true)
        const appointmentsFromStorage = await readAppointmentsFromStorage()
        const newAppointments = appointmentsFromStorage.filter(
          appointment => appointment.id !== appointmentId
        )
        await writeAppointmentsToStorage(newAppointments)
        setAppointments(newAppointments)
      } catch (err) {
        Alert.alert('Ocorreu um erro.')
      } finally {
        setLoading(false)
      }
    },
    [readAppointmentsFromStorage, writeAppointmentsToStorage]
  )

  return {
    appointments,
    loading,
    fetchAppointments,
    saveAppointment,
    deleteAppointment
  }
}
