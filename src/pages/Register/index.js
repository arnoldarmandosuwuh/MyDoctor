import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap } from '../../components'
import { colors, useForm } from '../../utils'

const Register = ({ navigation }) => {
    
    const [form, setForm] = useForm({
        fullName: '',
        profession: '',
        email: '',
        password: '',
    })

    const onContinue = () => {
        navigation.navigate('UploadPhoto')
    }

    return (
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
