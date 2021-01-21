import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { colors, getData, storeData, showError } from '../../utils'
import { Header, Profile, Input, Button, Gap } from '../../components'
import { Fire } from '../../config'
import { ILNullPhoto } from '../../assets'

const UpdateProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  })
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState(ILNullPhoto)
  const [photoForDB, setPhotoForDB] = useState('')

  useEffect(() => {
    getData('user').then((res) => {
      const data = res
      setPhoto({ uri: res.photo })
      setProfile(data)
    })
  }, [])

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6 karakter')
      } else {
        updatePassword()
        updateProfileData()
        navigation.replace('MainApp')
      }
    } else {
      updateProfileData()
      navigation.replace('MainApp')
    }
  }

  const updatePassword = () => {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updatePassword(password).catch((err) => {
          showError(err.message)
        })
      }
    })
  }

  const updateProfileData = () => {
    const data = profile
    data.photo = photoForDB

    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData('user', data)
      })
      .catch((err) => {
        showError(err.message)
      })
  }

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    })
  }

  const getImage = () => {
  launchImageLibrary(
      { quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true, },
      (response) => {
        // Same code as in above section!
        if (response.didCancel || response.error) {
          showError('Ooops, Sepertinya anda tidak memilih fotonya?')
        } else {
          setPhotoForDB(`data:${response.type};base64, ${response.base64}`)
          const source = { uri: response.uri }
          setPhoto(source)
        }
      },
    )
  }

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={profile.email}
            editable
            selectTextOnFocus
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
})
