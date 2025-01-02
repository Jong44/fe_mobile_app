import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native'

const ButtonPrimary = ({
    title,
    onPress,
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { marginTop, marginBottom, marginLeft, marginRight },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: "#03256C",
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
})


export default ButtonPrimary