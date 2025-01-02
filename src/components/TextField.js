import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const TextField = ({
    label,
    placeholder,
    onChangeText,
    isObscured = false,
    value,
    textColor = '#ffffff'
}) => {
    return (
        <View>
            <Text style={[styles.text_label, {
                color: textColor
            }]}>{label}</Text>
            <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChangeText} secureTextEntry={isObscured} value={value} />
        </View>
    )
}

const styles = StyleSheet.create({
    text_label: {
        color: '#ffffff',
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginBottom: 10,
        fontSize: 14,
    },

})

export default TextField