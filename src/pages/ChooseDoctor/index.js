import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header, List } from '../../components'
import { DummyDoctor1 } from '../../assets'
import { colors } from '../../utils'

const ChooseDoctor = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Header title="Pilih Dokter Anak" type="dark" onPress={() => navigation.goBack()} />
            <List profile={DummyDoctor1} name="Alexander Janie" desc="Wanita" type="next" onPress={() => navigation.navigate('Chatting')} />
            <List profile={DummyDoctor1} name="Alexander Janie" desc="Wanita" type="next" onPress={() => navigation.navigate('Chatting')} />
            <List profile={DummyDoctor1} name="Alexander Janie" desc="Wanita" type="next" onPress={() => navigation.navigate('Chatting')} />
            <List profile={DummyDoctor1} name="Alexander Janie" desc="Wanita" type="next" onPress={() => navigation.navigate('Chatting')} />
            <List profile={DummyDoctor1} name="Alexander Janie" desc="Wanita" type="next" onPress={() => navigation.navigate('Chatting')} />
        </View>
    )
}

export default ChooseDoctor

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
})
