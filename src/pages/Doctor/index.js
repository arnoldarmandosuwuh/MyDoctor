import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { HomeProfile, DoctorCategory, RatedDoctor, NewsItem, Gap } from '../../components'
import { fonts, colors } from '../../utils'
import { JSONCategoryDoctor } from '../../assets'

const Doctor = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.wrapperSection}>
                        <Gap height={30} />
                        <HomeProfile />
                        <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini?</Text>
                    </View>
                    <View style={styles.wrapperScroll}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.category}>
                                <Gap width={32} />
                                {
                                    JSONCategoryDoctor.data.map(item => {
                                        return (
                                            <DoctorCategory 
                                                key={item.id}
                                                category={item.category}
                                                onPress={() => navigation.navigate('ChooseDoctor')} 
                                            />
                                        )
                                    })
                                }
                                <Gap width={22} />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.wrapperSection}>
                        <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
                        <RatedDoctor />
                        <RatedDoctor />
                        <RatedDoctor />
                        <Text style={styles.sectionLabel}>Good News</Text>
                    </View>
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                    <Gap height={30} />
                </ScrollView>
            </View>
        </View>
    )
}

export default Doctor

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    wrapperSection: {
        paddingHorizontal: 16,
    },
    welcome: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        maxWidth: 209,
        marginTop: 30,
        marginBottom: 16,
    },
    category: {
        flexDirection: 'row',
    },
    wrapperScroll: {
        marginHorizontal: -16
    },
    sectionLabel: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16,
    },
})
