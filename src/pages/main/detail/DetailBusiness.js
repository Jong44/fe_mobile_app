import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { globalStyles } from "../../../styles/globalStyle";
import { getBusinessById, getLogo, getVideoPitch } from "../../../services/api/BusinessService";
import ProgressBar from "../../../components/ProgressBar";
import VideoPlayer from "../../../components/VideoPlayer";
import { ScrollView } from "react-native-gesture-handler";

const DetailBusiness = ({ navigation,route }) => {
  const { id } = route.params;
  const [businessData, setBusinessData] = useState({
    business_id: 0,
    business_owner_id: 0,
    business_name: "",
    business_description: "",
    nib: 0,
    industry: "",
    funding_propose: 0,
    funding_needed: 0,
    funding_current: 0,
    invest_status: 0,
    owner: {
      bussinessowner_id: 0,
      bo_first_name: "",
      bo_last_name: "",
      bo_birth_of_date: "",
      bo_phone_number: "",
      bo_email: "",
      npwp: 0,
    },
  });
  const bufferToBase64 = (bufferArray) => {
    let binaryString = "";
    const chunkSize = 8192; // Ukuran chunk (8192 adalah nilai optimal untuk buffer besar)
    for (let i = 0; i < bufferArray.length; i += chunkSize) {
      const chunk = bufferArray.slice(i, i + chunkSize); // Ambil potongan kecil
      binaryString += String.fromCharCode.apply(null, chunk);
    }
    return btoa(binaryString); // Konversi ke Base64
  };

  const getLogoBusiness = async (id) => {
    try {
      const response = await getLogo(id);
      const logoBuffer = response?.data?.business_logo?.data;
      if (!logoBuffer) {
        throw new Error("Logo buffer is missing");
      }
      const base64Logo = bufferToBase64(logoBuffer); // Konversi buffer ke Base64
      return `data:image/png;base64,${base64Logo}`; // Tambahkan prefix Base64
    } catch (error) {
      console.error(`Error fetching logo for business ID ${id}:`, error);
      return null;
    }
  };

  const getVideoPitchDeck = async (id) => {
    try{
      const response = await getVideoPitch(id);
      const videoBuffer = response?.data?.video_pitch_deck?.data;
      if(!videoBuffer){
        throw new Error("Video buffer is missing");
      }
      const base64Video = bufferToBase64(videoBuffer);
      return `data:video/mp4;base64,${base64Video}`;
    }catch(error){
      console.error(`Error fetching video pitch for business ID ${id}:`, error);
      return null;
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await getBusinessById(id);
        if (!data || !data.data) {
          throw new Error("Failed to fetch business data");
        }
        const logo = await getLogoBusiness(data.data.business_id);
        const videoPitch = await getVideoPitchDeck(data.data.business_id);
        data.data.video_pitchdeck = videoPitch;
        data.data.logo = logo;
        setBusinessData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBusiness();
  }, []);
  return (
    <ScrollView>
      <View style={globalStyles.contaner_screen}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableHighlight style={styles.circle_back} onPress={handleBack}>
          <Text></Text>
        </TouchableHighlight>
      </View>
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: businessData.logo }} style={{ width: '70%', objectFit: 'cover', height: '200' }} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>{businessData.business_name}</Text>
        <Text>{businessData.business_description}</Text>
      </View>
      <ProgressBar fundingCurrent={businessData.funding_current} fundingNeeded={businessData.funding_needed} />
      <View>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>Funding Needed : Rp {businessData.funding_needed ? businessData.funding_needed : 0}</Text>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>Funding Current : Rp {businessData.funding_current ? businessData.funding_current : 0}</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.subtitle}>Deskripsi</Text>
        <View style={styles.container_description}>
          <Text>{businessData.business_description}</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={[styles.subtitle, {
          marginBottom:15
        }]}>Video PitchDeck</Text>
        <VideoPlayer videoUri={businessData.video_pitchdeck} />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  circle_back: {
    textAlign: "center",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  container_description: {
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
  },
});

export default DetailBusiness;
