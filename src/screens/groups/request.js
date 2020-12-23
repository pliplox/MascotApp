import mascotapi from '../../api/mascotappi'

export const fetchGroups = async () => {
  try {
    const response = await mascotapi.get('family/groups')
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}
