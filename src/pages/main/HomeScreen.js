import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import { getUserData } from "../../services/storage/UserStorage";
import { globalStyles } from "../../styles/globalStyle";
import ButtonPrimary from "../../components/ButtonPrimary";
import { ScrollView } from "react-native-gesture-handler";
import CardBusiness from "../../components/CardBusiness";
import { getBusiness, getLogo } from "../../services/api/BusinessService";

const HomeScreen = ({
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
  });
  const [businessData, setBusinessData] = useState([]);

  const bufferToBase64 = (bufferArray) => {
    let binaryString = '';
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

  const handleClick = (idData) => {
    navigation.navigate('PagesStack', {
      screen: 'Detail Business',
      params: { id: idData },
    })
  }

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const data = await getBusiness();
        if (!data || !data.data) {
          throw new Error("Failed to fetch business data");
        }
        // Proses semua business data secara asynchronous
        const businesses = await Promise.all(
          data.data.map(async (business) => {
            const logo = await getLogoBusiness(business.business_id);
            return { ...business, logo }; // Tambahkan logo ke objek business
          })
        );
        setBusinessData(businesses);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
  
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        if (!data || !data.userId) {
          Alert.alert("Error", "You are not logged in");
          navigation.replace("Auth", { screen: "Login" });
          return;
        }
        setUserData(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user data");
      }
    };
  
    const fetchData = async () => {
      setIsLoading(true); // Tampilkan loading sebelum memulai fetch
      await Promise.all([fetchBusinessData(), fetchUserData()]);
      setIsLoading(false); // Hentikan loading setelah semua fetch selesai
    };
  
    fetchData();
  
  }, []);
  if (isLoading) {
    return (
      <View style={globalStyles.contaner_screen}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={globalStyles.contaner_screen}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "70%",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>Hey</Text>
          <Text style={styles.title}>{userData.userName}</Text>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.circle_avatar}></View>
        </View>
      </View>
      <View style={styles.contaner_deals}>
        <View style={{ width: "70%", paddingRight: 20 }}>
          <Text style={styles.contaner_title}>
            Do you looking for a business to invest?
          </Text>
          <Text>There are no deals yet</Text>
          <ButtonPrimary title="Make a deals" marginTop={20} />
        </View>
        <View style={{ width: "30%" }}>
          <Image
            source={require("../../assets/logo_app.png")}
            style={{ width: 100, height: 100 }}
          />  
        </View>
      </View>
      <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={[styles.subtitle, {width: "70%"}]}>Trending Business</Text>
        <Text style={{ color: "blue" }}>See all</Text>
      </View>
      <View style={{ marginTop: 20 }}>
      <ScrollView horizontal={true}>
        {businessData.length > 0 ? (
          businessData.map((business, index) => (
            <CardBusiness
              key={index}
              id={business.business_id}
              businessName={business.business_name}
              ownerName={business.owner.bo_first_name}
              image={business.logo}
              fundingCurrent={business.funding_current === null ? 0 : business.funding_current}
              fundingNeeded={business.funding_needed === null ? 0 : business.funding_needed}
              onPress={()=>handleClick(business.business_id)}
            />
          ))
        ) : (
          <Text>No business data</Text>
        )}
      </ScrollView>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row_between: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle_avatar: {
    width: 70,
    height: 70,
    borderRadius: 100 / 2,
    backgroundColor: "gray",
  },
  contaner_deals: {
    marginTop: 30,
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
    flexDirection: "row",
  },
  contaner_title: {
    fontSize: 18,
    fontWeight: "bold",
  },

});

export default HomeScreen;
