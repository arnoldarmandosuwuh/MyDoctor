import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { ILLogo, ILGetStarted } from '../../assets'
import Button from '../../components/atoms/Button'
import Gap from '../../components/atoms/Gap'

const GetStarted = () => {
    return (
        <ImageBackground source={ILGetStarted} style={styles.page}>
            <View>
                <ILLogo />
                <Text style={styles.title}>Konsultasi dengan dokter jadi lebih mudah & fleksibel</Text>
            </View>
            <View>
                <Button title='Get Started' />
                <Gap height={16} />
                <Button type='secondary' title='Sign In' />
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
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 28,
        color: '#fff',
        marginTop: 91,
        fontFamily: 'Nunito-SemiBold'
    }
})
