import React, { useEffect, useState } from 'react'
import { getBusiness, getLogo } from '../../services/api/BusinessService';
import { getUserData } from '../../services/storage/UserStorage';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CardBusiness from '../../components/CardBusiness';
import { globalStyles } from '../../styles/globalStyle';
import TextField from '../../components/TextField';

const ReportScreen = () => {
    const [businessData, setBusinessData] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [userData, setUserData] = useState({});
        const [businessFilter, setBusinessFilter] = useState([]);
        const [categoryActive, setCategoryActive] = useState(0);
    
        const Category = [
            "All",
            "Creative",
            "Medicine",
            "Clothing",
            "Food",
            "Fashion",
            "Electronics",
        ];
    
        
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
                setBusinessFilter(businesses);
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
    
          const onChangeFilter = (text) => {
            const filteredData = businessData.filter((business) => {
                return business.business_name.toLowerCase().includes(text.toLowerCase());
                }
            );
            setBusinessFilter(filteredData);
            };
    
            const filterCategory = (index) => {
                setCategoryActive(index);
            };
    
    
    
          
          if (isLoading) {
            return (
              <View style={globalStyles.contaner_screen}>
                <Text>Loading...</Text>
              </View>
            );
          }
  return (
    <View style={globalStyles.contaner_screen}>
        <View>
        <Text style={styles.title}>Check Regularly!</Text>
        <Text style={[styles.title, {
            color: '#03256C'
        }]}>Your Investment!</Text>
        </View>
        <View style={{ marginTop: 20 }}>
            <TextField label={"Pencarian"} placeholder="Search Business" textColor='#000' onChangeText={onChangeFilter} />
        </View>
        <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 15 }}>
        {businessFilter.length > 0 ? (
            businessFilter.map((business, index) => (
              <CardBusiness
                width='165'
                height='100'
                margin='6'
                marginRight='0'
                subtitleSize={10}
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
        </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default ReportScreen