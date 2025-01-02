import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProgressBar = ({
    fundingCurrent,
    fundingNeeded,
}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <View style={styles.progress_bar}>
                    <View
                        style={{
                            width: `${fundingCurrent ? (fundingCurrent / fundingNeeded) * 100 : 0}%`,
                            height: 8,
                            backgroundColor: "#03256C",
                            borderRadius: 10,
                        }}
                    />
                </View>
                <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 10, color: "gray", marginLeft: 5, fontWeight: "bold" }}>
                     {`${fundingCurrent ? (fundingCurrent / fundingNeeded) * 100 : 0}%`}
                </Text>
                </View>
            </View>
  )
}
const styles = StyleSheet.create({
    progress_bar: {
        width: "85%",
        height: 8,
        backgroundColor: "#6DAEDB",
        borderRadius: 10,
        marginTop: 10,
    },
})

export default ProgressBar