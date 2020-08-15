import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { ILLogo, ILGetStarted } from '../../assets'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'
import { colors } from '../../utils'

const GetStarted = ({ navigation }) => {
    return (
        <ImageBackground source={ILGetStarted} style={styles.page}>
            <View>
                <ILLogo />
                <Text style={styles.title}>Konsultasi dengan dokter jadi lebih mudah & fleksibel</Text>
            </View>
            <View>
                <Button title='Get Started' onPress={() => navigation.navigate('Register')} />
                <Gap height={16} />
                <Button type='secondary' title='Sign In' onPress={() => navigation.replace('Login')} />
            </View>
        </ImageBackground>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    page: {
        padding: 40,
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: colors.white
    },
    title: {
        fontSize: 28,
        color: colors.white,
        marginTop: 91,
        fontFamily: 'Nunito-SemiBold'
    }
})
