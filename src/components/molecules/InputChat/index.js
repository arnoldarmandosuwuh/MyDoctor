import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

const InputChat = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Tulis Pesan Untuk Nairobi" />
            <Button type='btn-icon-send'/>
        </View>
    )
}

export default InputChat

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        backgroundColor: colors.disable,
        padding: 14,
        borderRadius: 10,
        marginRight: 10,
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        maxHeight: 45,
    },
})