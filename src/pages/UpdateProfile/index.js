import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { colors } from '../../utils'
import { Header, Profile, Input, Button, Gap } from '../../components'

const UpdateProfile = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Header title="Edit Profile" onPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile />
                    <Gap height={26} />
                    <Input label="Full Name" />
                    <Gap height={24} />
                    <Input label="Pekerjaan" />
                    <Gap height={24} />
                    <Input label="Email" />
                    <Gap height={24} />
                    <Input label="Password" />
                    <Gap height={40} />
                    <Button title="Save Profile" />
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
