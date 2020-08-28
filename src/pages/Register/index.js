import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Header, Input, Button, Gap, Loading } from '../../components'
import { showMessage, hideMessage } from 'react-native-flash-message'
import { colors, useForm, storeData } from '../../utils'
import { Fire } from '../../config'

const Register = ({ navigation }) => {

    const [form, setForm] = useForm({
        fullName: '',
        profession: '',
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)

    const onContinue = () => {
        setLoading(true)
        Fire.auth()
            .createUserWithEmailAndPassword(form.email, form.password)
            .then((success) => {
                setLoading(false)
                setForm('reset')
                const data = {
                    fullName: form.fullName,
                    profession: form.profession,
                    email: form.email,
                }
                Fire.database()
                    .ref('users/' +success.user.uid+'/')
                    .set(data)
                console.log("onContinue -> success", success)
                storeData('user', data)
                navigation.navigate('UploadPhoto', data)
            })
            .catch((error) => {
                const errorMessage = error.message
                setLoading(false)
                showMessage({
                    message: errorMessage,
                    type: 'default',
                    backgroundColor: colors.error,
                    color: colors.white,
                })
            })
    }

    return (
        <>
            <View style={styles.page}>
                <Header 
                    title="Daftar Akun" 
                    onPress={() => navigation.goBack()} 
                />
                <View style={styles.content}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Input 
                            label="Full Name" 
                            value={form.fullName} 
                            onChangeText={(value) => setForm('fullName', value)} 
                        />
                        <Gap height={24} />
                        <Input 
                            label="Pekerjaan" 
                            value={form.profession} 
                            onChangeText={(value) => setForm('profession', value)} 
                        />
                        <Gap height={24} />
                        <Input 
                            label="Email" 
                            value={form.email} 
                            onChangeText={(value) => setForm('email',value)} 
                        />
                        <Gap height={24} />
                        <Input 
                            label="Password" 
                            value={form.password} 
                            onChangeText={(value) => setForm('password',value)} 
                            secureTextEntry
                        />
                        <Gap height={40} />
                        <Button 
                            title="Continue" 
                            onPress={onContinue} 
                        />
                    </ScrollView>
                </View>
            </View>
            {loading && <Loading />}
        </>
    )
}

export default Register

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        padding: 40,
        paddingTop: 0
    },
})
