import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useAuth } from '../context/AuthContext'
import mascotappi from '../api/mascotappi'
import { Text, Card, Toggle, Button, Spinner } from '@ui-kitten/components'
import CardHeader from '../components/home/CardHeader'
import moment from 'moment'
import useSWR from 'swr'
import { useTranslation } from '../context/LanguageContext'

const fetchGroups = async () => {
  const response = await mascotappi.get('family/groups')
  return response.data
}

const fetchFirstPet = async id => {
  const response = await mascotappi.get(`pets/${id}`)
  return response.data.pets[0]
}

const Home = ({ navigation }) => {
  const { signOut, loadingUser } = useAuth()
  const [error, setError] = useState()
  const [amLoading, setAmLoading] = useState(false)
  const [pmLoading, setPmLoading] = useState(false)

  const { placeholders } = useTranslation()

  const { data: groups, error: groupError } = useSWR('family/group', () =>
    fetchGroups(),
  )

  const { data: pet, error: petError, mutate } = useSWR(
    groups.length > 0 ? `pets/${groups[0].id}` : null,
    () => fetchFirstPet(groups[0].id),
  )

  const toggleAmChecked = async (event, fedId) => {
    if (!isAm()) {
      return
    }
    setAmLoading(true)
    try {
      if (fedId) {
        await mascotappi.delete('fed', { data: { fedId } })
        mutate(pet)
      } else if (event) {
        await mascotappi.post('fed', { petId: pet?._id })
        mutate(pet)
      }
      setAmLoading(false)
    } catch (e) {
      setAmLoading(false)
      setError(e)
    }
  }

  const togglePmChecked = async (event, fedId) => {
    if (!isPm()) {
      return
    }
    try {
      setPmLoading(true)
      if (fedId) {
        await mascotappi.delete('fed', { data: { fedId } })
        mutate(pet)
      } else if (event) {
        await mascotappi.post('fed', { petId: pet?._id })
        mutate(pet)
      }
      setPmLoading(false)
    } catch (e) {
      setPmLoading(false)
      setError(e)
    }
  }

  const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

  const isAm = () => {
    const hours = new Date().getHours()
    return hours >= 0 && hours < 12
  }

  const isPm = () => {
    const currentHour = new Date().getHours()
    return currentHour >= 12 && currentHour <= 23
  }

  const firstAmFed = pet?.feds?.filter(fed => {
    const fedHours = new Date(fed.currentDateTime).getHours()
    return fedHours >= 0 && fedHours < 12
  })[0]

  const firstPmFed = pet?.feds?.filter(fed => {
    const fedHours = new Date(fed.currentDateTime).getHours()
    return fedHours >= 12 && fedHours <= 23
  })[0]

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (e) {
      console.error('Error trying to sign out: ', e.message)
      setError(e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {(!pet || groupError || petError || error) && (
        <View style={styles.loadingContainer}>
          <Spinner size="large" />
          <Text>{placeholders.loadingDots}</Text>
        </View>
      )}

      {groupError && (
        <Text>
          There was an error trying to get the group: {groupError?.message}
        </Text>
      )}
      {petError && (
        <Text>
          There was an error trying to get the pet: {petError?.message}
        </Text>
      )}
      {error && (
        <Text>There was an error trying to update: {error?.message}</Text>
      )}
      {pet && (
        <Card
          header={() => (
            <CardHeader name={pet.name} birthdate={pet.birthdate} />
          )}
          style={styles.card}>
          <Text>
            {`${capitalize(
              new Date().toLocaleString('es-CL', { weekday: 'long' }),
            )} ${moment().format('DD/MM/YYYY')}`}
          </Text>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.username}>{firstAmFed?.user.name}</Text>
              <Text style={styles.username}>{firstPmFed?.user.name}</Text>
            </View>
            <View style={styles.row}>
              <Text>
                {firstAmFed?.currentDateTime
                  ? moment(firstAmFed?.currentDateTime).format('HH:mm:ss')
                  : 'HH:mm:ss'}
              </Text>
              <Text>
                {firstPmFed?.currentDateTime
                  ? moment(firstPmFed?.currentDateTime).format('HH:mm:ss')
                  : 'HH:mm:ss'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text>AM</Text>
              <Text>PM</Text>
            </View>
            <View style={[styles.row, styles.toggleWrapper]}>
              {amLoading ? (
                <Spinner />
              ) : (
                <Toggle
                  checked={!!firstAmFed?.currentDateTime}
                  onChange={event => toggleAmChecked(event, firstAmFed?._id)}
                  disabled={!isAm()}
                  style={styles.toggle}
                />
              )}
              {pmLoading ? (
                <Spinner />
              ) : (
                <Toggle
                  checked={!!firstPmFed?.currentDateTime}
                  onChange={event => togglePmChecked(event, firstPmFed?._id)}
                  disabled={!isPm()}
                  style={styles.toggle}
                />
              )}
            </View>
          </View>
        </Card>
      )}

      {/* this buttons should change when implement button bar navigation, but they
      are here in order to let the user be able to navigate to something */}
      <View style={styles.bottom}>
        <Button
          onPress={() => navigation.navigate('Groups')}
          style={styles.buttons}>
          Go to groups
        </Button>
        <Button
          onPress={handleSignOut}
          style={styles.buttons}
          accessoryRight={
            loadingUser && (() => <Spinner size="small" status="basic" />)
          }>
          Sign Out
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flex: 1, margin: 15 },
  cardContent: {
    marginTop: 250,
  },
  toggle: { flex: 0.17 },
  row: { flexDirection: 'row', justifyContent: 'space-around' },
  toggleWrapper: { marginTop: 15 },
  bottom: {
    flexDirection: 'row',
    flex: 0.15,
    marginBottom: 15,
    marginHorizontal: 1.7,
  },
  buttons: { flex: 0.5, margin: 15 },
  username: { flex: 0.5, margin: 15, textAlign: 'center' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
