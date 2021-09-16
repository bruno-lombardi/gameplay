import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { styles } from './styles'

import Profile from '~/components/Profile'
import ButtonAdd from '~/components/ButtonAdd'
import CategorySelect from '~/components/CategorySelect'
import ListHeader from '~/components/ListHeader'
import Appointment from '~/components/Appointment'
import ListDivider from '~/components/ListDivider'
import Background from '~/components/Background'
import { RootStackParamList } from '~/routes/app-routes'
import useAppointmentsRepository from '~/hooks/useAppointmentsRepository'
import Loading from '~/components/Loading'
import { AppointmentModel } from '~/models/Appointment'

const Home: React.FC = () => {
  const [category, setCategory] = useState('')
  const { appointments, fetchAppointments, loading } =
    useAppointmentsRepository()

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'AppointmentDetails'>
    >()

  const handleNavigateToDetails = useCallback(
    (appointment: AppointmentModel) => {
      navigation.navigate('AppointmentDetails', { appointment })
    },
    [navigation]
  )

  const handleNavigateToCreate = useCallback(() => {
    navigation.navigate('AppointmentCreate')
  }, [navigation])

  const handleCategorySelect = useCallback(
    (categoryId: string) =>
      categoryId === category ? setCategory('') : setCategory(categoryId),
    [category]
  )

  const loadAppointments = useCallback(async () => {
    await fetchAppointments(category)
  }, [fetchAppointments, category])

  useFocusEffect(
    useCallback(() => {
      loadAppointments()
    }, [loadAppointments])
  )

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleNavigateToCreate} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />

          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleNavigateToDetails(item)}
              />
            )}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        </>
      )}
    </Background>
  )
}

export default Home
