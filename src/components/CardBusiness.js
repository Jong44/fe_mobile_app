import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import ProgressBar from './ProgressBar'

const CardBusiness = ({
    id,
    businessName,
    ownerName,
    image = "",
    fundingCurrent = 0,
    fundingNeeded = 0,
    onPress,
}) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={'#51515129'} style={{
      margin: 6,
      marginRight: 15,
    }}>
      <View style={styles.container}>
        {image !== "" ? (
            <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 150, borderRadius: 10 }}
            />
        ) : (
            <View style={{ width: "100%", height: 150, backgroundColor: "gray", borderRadius: 10 }} />
        )}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
            {businessName}
        </Text>
        <Text style={{ fontSize: 14, color: "gray" }}>
            {ownerName}
        </Text>
        <ProgressBar fundingCurrent={fundingCurrent} fundingNeeded={fundingNeeded} />
        <Text style={{ fontSize: 12, fontWeight: 500 }}>Funding Needded : Rp {fundingNeeded}</Text>
    </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    container: {
      width: 250,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    progress_bar: {
        width: "85%",
        height: 8,
        backgroundColor: "#6DAEDB",
        borderRadius: 10,
        marginTop: 10,
    },
})

export default CardBusiness