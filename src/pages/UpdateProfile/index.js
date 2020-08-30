import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { colors, getData, storeData } from '../../utils'
import { Header, Profile, Input, Button, Gap } from '../../components'
import { Fire } from '../../config'
import { showMessage } from 'react-native-flash-message'
import ImagePicker from 'react-native-image-picker'
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
        getData('user').then(res => {
            const data = res
            setPhoto({uri: res.photo})
            setProfile(data)
        })
    }, [])

    const update = () => {
        console.log('Update : ', profile)

        if (password.length > 0){
            if (password.length < 6) {
                showMessage({
                    message: 'Password kurang dari 6 karakter',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                })
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
        Fire.auth().onAuthStateChanged(user => {
            if (user){
                user.updatePassword(password)
                    .catch(err => {
                        showMessage({
                            message: err.message,
                            type: 'default',
                            backgroundColor: colors.error,
                            color: colors.white,
                        })              
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
                console.log("Success", data)
                storeData('user', data)
            })
            .catch(err => {
                showMessage({
                    message: err.message,
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white
                })
            })
    }

    const changeText = (key, value) => {
        setProfile({
            ...profile,
            [key]: value,
        })
    }

    const getImage = () => {
        ImagePicker.launchImageLibrary({quality: 0.5, maxWidth: 200, maxHeight: 200}, response => {
            // Same code as in above section!
            console.log("getImage -> response", response)
            if(response.didCancel || response.error){
                showMessage({
                    message: 'Ooops, Sepertinya anda tidak memilih fotonya?',
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                })
            }
            else {
                setPhotoForDB(`data:${response.type};base64, ${response.data}`)
                const source =  {uri: response.uri}
                setPhoto(source)
            }
          });
    }

    return (
        <View style={styles.page}>
            <Header title="Edit Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile isRemove photo={photo} onPress={getImage} />
                    <Gap height={26} />
                    <Input label="Full Name" value={profile.fullName} onChangeText={(value) => changeText('fullName', value)} />
                    <Gap height={24} />
                    <Input label="Pekerjaan" value={profile.profession} onChangeText={(value) => changeText('profession', value)} />
                    <Gap height={24} />
                    <Input label="Email" value={profile.email} editable selectTextOnFocus />
                    <Gap height={24} />
                    <Input label="Password" value={password} onChangeText={(value) => setPassword(value)} secureTextEntry />
                    <Gap height={40} />
                    <Button 
                        title="Save Profile"
                        onPress={update} 
                    />
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
