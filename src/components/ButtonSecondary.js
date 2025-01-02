import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native'

const ButtonSecondary = ({
    title,
    onPress,
}) => {
  return (
    <TouchableOpacity
        style={styles.button}
        onPress={onPress}
    >
        {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: "#6DAEDB",
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
})


export default ButtonSecondary