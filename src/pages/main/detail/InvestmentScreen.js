import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { globalStyles } from '../../../styles/globalStyle'
import TextField from '../../../components/TextField'
import ButtonPrimary from '../../../components/ButtonPrimary'
import { getBusinessById } from '../../../services/api/BusinessService'
import { getUserById } from '../../../services/api/UserService'
import { getUserData } from '../../../services/storage/UserStorage'
import { createInvestment } from '../../../services/api/InvestmentService' 

const InvestmentScreen = ({
    navigation,
    route
}) => {
    const { id } = route.params;
    const [loading, setLoading] = useState(true);
    const [businessData, setBusinessData] = useState({});
    const [userData, setUserData] = useState({});
    const [formData, setFormData] = useState({
        investment_user_id: 0,
        bussinessowner_id: 0,
        business_id: 0,
        amount: 0,
        agreement: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserData();
                if (!data || !data.userId) {
                  Alert.alert("Error", "You are not logged in");
                  navigation.replace("Auth", { screen: "Login" });
                  return;
                }
                const response = await getBusinessById(id);
                const responseUser = await getUserById(data.userId);
                if (!responseUser || !responseUser.data) {
                    throw new Error("Failed to fetch user data");
                }
                if (!response || !response.data) {
                    throw new Error("Failed to fetch business data");
                }
                setBusinessData(response.data);
                setUserData(responseUser.data);
                setFormData({
                    ...formData,
                    investment_user_id: responseUser.data.investment_user_id,
                    bussinessowner_id: response.data.owner.bussinessowner_id,
                    business_id: response.data.business_id,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id]);

    const listTab = [
        "Fill Out Data",
        "Agreement",
        "Verification",
    ]
    const [tabActive, setTabActive] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChangeTab = (index) => {
        setTabActive(index)
    }

    const handleNext = () => {
        if(!formData.amount){
           Alert.alert("Error", "Please fill out the amount");
            return; 
        }
        if (tabActive < listTab.length - 1) {
            setTabActive(tabActive + 1)
        }
        if(tabActive === 1){
            handleSubmit();
        }else if(tabActive === 2){
            navigation.replace("MainStack");
        }
    }

    const onChangeTextInput = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async () => {
        try {
            const response = await createInvestment(formData);
            if (!response || !response.data) {
                throw new Error("Failed to create investment");
            }
            console.log('response:', response.data);
            setTabActive(2);
            Alert.alert("Success", "Investment created successfully")
        } catch (error) {
            console.error('Error creating investment:', error);
        }
    }



    if (loading) {
        return (
            <View style={globalStyles.contaner_screen}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={[globalStyles.contaner_screen, { flexDirection: "column", justifyContent: "flex-start", flex: 1 }]}>
            <View style={styles.header_row}>
                <TouchableOpacity style={styles.circle_back} onPress={() => { navigation.goBack() }}>
                    <Text>-</Text>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Make a Deal</Text>
                <View style={{ width: 50, height: 50 }}></View>
            </View>
            <View style={styles.header_tab}>
                {listTab.map((tab, index) => (
                    <View
                        key={index}
                        style={[
                            styles.tab,
                            {
                                width: "33%",
                                backgroundColor: index === tabActive ? "#03256C" : "#ffffff",
                            }
                        ]}>
                        <Text
                            style={{
                                fontSize: 14,
                                color: index === tabActive ? "#ffffff" : "#000",
                                textAlign: "center",
                            }}
                        >{tab}</Text>
                    </View>
                ))}
            </View>
            {tabActive === 0 && (
                <View>
                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "20%" }}>
                            <View style={styles.circle_avatar}></View>
                        </View>
                        <View style={{ width: "70%", justifyContent: "center", alignItems: "start" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{userData.first_name} {userData.name}</Text>
                            <Text style={{ fontSize: 14 }}>NPWP : {userData.npwp}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Deal with</Text>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "20%" }}>
                            <View style={styles.circle_avatar}></View>
                        </View>
                        <View style={{ width: "70%", justifyContent: "center", alignItems: "start" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{businessData.owner.bo_first_name} {businessData.owner.bo_last_name}</Text>
                            <Text style={{ fontSize: 14 }}>NPWP : {businessData.owner.npwp}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, gap: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Investment for</Text>
                        <Text style={{ fontSize: 18, fontWeight: "medium" }}>{businessData.business_name}</Text>
                        <TextField label="Amount" placeholder="Rp. 1.000.000" textColor='#000' onChangeText={(value) => onChangeTextInput("amount", value)} />
                    </View>
                </View>
                )}

            {tabActive === 1 && (
                <View style={{ marginTop: 20 }}>
                    <Text
                        style={{
                            color: "#03256C",
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >Upload the contract agreement</Text>
                    <TouchableOpacity   style={styles.contaner_files}>
                        <Text style={{ color: "#03256C" }}>Upload File</Text>
                    </TouchableOpacity>
                </View>
            )}
            {tabActive === 2 && (
                <View style={{ marginTop: 40, gap: 20 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: 'center' }}>Hang Tight</Text>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>We are validating your data</Text>
                    </View>
                    <Image source={require("../../../assets/investment.png")} style={{ width: 240, height: 240, margin: 'auto'}} />
                    <View style={{ marginTop: 20,gap: 20 }}>
                        <Text style={{ fontSize: 13, textAlign: 'center' }}>Thank you for your transaction! Our team is working hard to verify your data to ensure everything is accurate and trustworthy.</Text>
                        <Text style={{ fontSize: 13, textAlign: 'center' }}>This process usually takes up to 1x24 hours, so sit back and relax—we’ll notify you as soon as your transaction is good to go!</Text>
                    </View>
                </View>
            )}
            <View>
                <ButtonPrimary title={tabActive === 1 ? "Submit" : tabActive === 2 ? "Back" : "Next"} marginTop={20} onPress={handleNext} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header_tab: {
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
        backgroundColor: "#ffffff",
    },
    tab: {
        padding: 10,
        borderRadius: 50,
    },
    circle_back: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    circle_avatar: {
        width: 70,
        height: 70,
        borderRadius: 100 / 2,
        backgroundColor: "gray",
    },
    contaner_files: {
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
})

export default InvestmentScreen