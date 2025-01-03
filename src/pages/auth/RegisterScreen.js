import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
} from "react-native";
import TextField from "../../components/TextField";
import ButtonSecondary from "../../components/ButtonSecondary";
import { BaseButton, ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { Register } from "../../services/api/AuthService";
import { handleApiError } from "../../services/utils/ErorHandling";

const RegisterScreen = ({
    navigation
}) => {
    const [indexField, setIndexField] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        birth_of_date: "",
        email: "",
        phone_number: "",
        npwp: "",
        password: "",
        confirm_password: "",
        min_investment: "",
        max_investment: "",
        location: "",
        industry: null,
        is_representative: false,
    });
    const listTextFieldsPersonal = [
        {
            label: "Name",
            placeholder: "Please input your name",
            name: "name",
        },
        {
            label: "Birth Of Date",
            placeholder: "Please input your birth of date",
            name: "birth_of_date",
        },
        {
            label: "Email",
            placeholder: "Please input your email",
            name: "email",
        },
        {
            label: "Phone Number",
            placeholder: "Please input your phone number",
            name: "phone_number",
        },
        {
            label: "NPWP",
            placeholder: "Please input your NPWP",
            name: "npwp",
        },
        {
            label: "Password",
            placeholder: "Please input your password",
            isObsured: true,
            name: "password",
        },
        {
            label: "Confirm Password",
            placeholder: "Please input your password",
            isObsured: true,
            name: "confirm_password",
        },
    ];


    const listTextFieldsDatas = [
        {
            label: "Min. Investment",
            placeholder: "Please input your min. investment",
            name: "min_investment",
        },
        {
            label: "Max. Investment",
            placeholder: "Please input your max. investment",
            name: "max_investment",
        },
        {
            label: "Location",
            placeholder: "Please input your location",
            name: "location",
        },
    ];

    const industryOptions = [
        "Creative",
        "Medicine",
        "Clothing",
        "Food",
        "Fashion",
        "Electronics",
        "Others",
    ];


    const handleChooseIndustry = (industry) => {
        const listIndustry = formData.industry || [];
        if (listIndustry.includes(industry)) {
            const newIndustry = listIndustry.filter((item) => item !== industry);
            setFormData({ ...formData, industry: newIndustry });
        } else {
            setFormData({ ...formData, industry: [...listIndustry, industry] });
        }
    }

    const handleRepresentative = (status) => {
        setFormData({ ...formData, is_representative: status });
    }

    const handleChanges = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleNext = () => {
        if (indexField < 1) {
            setIndexField(indexField + 1);
        }
        if (indexField == 1) {
            submitRegister();
        }
    };
    
    const submitRegister = async () => {
        try{
            setFormData({...formData, industry: JSON.stringify(formData.industry)});
            setFormData({...formData, is_representative: formData.is_representative ? 1 : 0});
            setFormData({...formData, min_investment: parseInt(formData.min_investment)});
            setFormData({...formData, max_investment: parseInt(formData.max_investment)});
            setFormData({...formData, npwp: parseInt(formData.npwp)});
            const payload = {
                name: formData.name,
                birth_of_date: formData.birth_of_date,
                email: formData.email,
                phone_number: formData.phone_number,
                npwp: parseInt(formData.npwp),
                password: formData.password,
                min_investment: parseInt(formData.min_investment),
                max_investment: parseInt(formData.max_investment),
                location: formData.location,
                industry: formData.industry,
                is_representative: formData.is_representative
            };
            console.log("Payload",payload);
            const response = await Register(payload);
            if (response.status == "false") {
                console.log(response.message);
                return;
            }
            Alert.alert("Success", "Register success");
            navigation.navigate("Login");
        } catch (error) {
            const { message } = handleApiError(error);
            console.log(message);
        }
    };
    const handleBack = () => {
        if (indexField > 0) {
            setIndexField(indexField - 1);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: "#03256C", flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "start",
                            gap: 10,
                            marginBottom: 20,
                        }}
                    >
                        {indexField > 0 && (
                            <View style={styles.container_back}>
                                <TouchableOpacity
                                    onPress={handleBack}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: "white",
                                        borderRadius: "100%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#03256C",
                                            fontSize: 20,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {"<"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <Text style={styles.text_title}>Sign Up</Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: "column",
                            gap: 10,
                        }}
                    >
                        {indexField == 0 &&
                            listTextFieldsPersonal.map((textField, index) => (
                                <TextField
                                    key={index}
                                    label={textField.label}
                                    placeholder={textField.placeholder}
                                    isObscured={textField.isObsured}
                                    onChangeText={(value) => handleChanges(textField.name, value)}
                                />
                            ))}

                        {indexField == 1 &&
                            listTextFieldsDatas.map((textField, index) => (
                                <TextField
                                    key={index}
                                    label={textField.label}
                                    placeholder={textField.placeholder}
                                    isObscured={textField.isObsured}
                                    onChangeText={(value) => handleChanges(textField.name, value)}
                                />
                            ))}

                        {indexField == 1 && (
                            <View>
                                <Text style={{ color: "#ffffff", fontSize: 16, marginBottom: 10 }}>
                                    Industry
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        gap: 10,
                                    }}
                                >
                                    {industryOptions.map((industry, index) => (
                                        <BaseButton
                                            key={index}
                                            onPress={() => handleChooseIndustry(industry)}
                                            style={{
                                                backgroundColor: formData.industry?.includes(industry)
                                                    ? "#6DAEDB"
                                                    : "#ffffff",
                                                padding: 10,
                                                borderRadius: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: formData.industry?.includes(industry)
                                                        ? "#ffffff"
                                                        : "#000000",
                                                }}
                                            >
                                                {industry}
                                            </Text>
                                        </BaseButton>
                                    ))}
                                </View>
                            </View>
                        )}

                        {indexField == 1 && (
                            <View>
                                <Text style={{ color: "#ffffff", fontSize: 16, marginBottom: 10 }}>
                                    Are you a representative?
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 10,
                                    }}
                                >
                                    <BaseButton
                                        onPress={() => handleRepresentative(true)}
                                        style={{
                                            backgroundColor: formData.is_representative ? "#6DAEDB" : "#ffffff",
                                            padding: 10,
                                            borderRadius: 10,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: formData.is_representative ? "#ffffff" : "#000000",
                                            }}
                                        >
                                            Yes
                                        </Text>
                                    </BaseButton>
                                    <BaseButton
                                        onPress={() => handleRepresentative(false)}
                                        style={{
                                            backgroundColor: !formData.is_representative ? "#6DAEDB" : "#ffffff",
                                            padding: 10,
                                            borderRadius: 10,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: !formData.is_representative ? "#ffffff" : "#000000",
                                            }}
                                        >
                                            No
                                        </Text>
                                    </BaseButton>
                                </View>
                            </View>
                        )}

                    </View>
                </View>
                <ButtonSecondary
                    title={indexField == 0 ? "Next" : "Sign Up"}
                    onPress={handleNext}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 70,
        backgroundColor: "#03256C",
        color: "#ffffff",
        flex: 1,

    },
    text_title: {
        color: "#ffffff",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    container_back: {
        width: 40,
        height: 40,
        backgroundColor: "white",
        borderRadius: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default RegisterScreen;
