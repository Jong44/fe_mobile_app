import React, { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import ButtonPrimary from "../../components/ButtonPrimary";

const OnboardingScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const listImage = [
    require("../../assets/onboarding1.png"),
    require("../../assets/onboarding2.png"),
    require("../../assets/onboarding3.png"),
  ];
  const title = [
    "Temukan Peluang Investasi Terbaik, Wujudkan Keuntungan Maksimal!",
    "Temukan Investasi Cerdas Dimulai Di Sini. Pilih Bisnis Berkualitas, Dapatkan Hasil Optimal!",
    "Bergabunglah Dengan Jaringan Investor Kami, Raih Kesuksesan Bersama!",
  ];
  const handleNext = () => {
    if (index < listImage.length - 1) {
      setIndex(index + 1);
    }
  };
  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo_app.png")}
        style={styles.img_logo}
      />
      <View>
        <Image source={listImage[index]} style={styles.img_onboarding} />
        <Text style={styles.title}>{title[index]}</Text>
      </View>

      {index === 2 && (
        <View style={{ width: "100%" }}>
          <ButtonPrimary
            title={"Sign Up"}
            onPress={() => navigation.replace("Auth", { screen: "Register" })}
          />
          <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "center", gap: 5 }}>
            <Text style={{ color: "#000" }}>Already have an account?</Text>
            <Text
              style={{ color: "#03256C", fontWeight: "bold" }}
              onPress={() => navigation.replace("Auth", { screen: "Login" })} 
            >
              {" "}
              Sign In
            </Text>
          </View>
        </View>
      )}

      <View style={styles.row_nav}>
        <Text
          onPress={handleBack}
          style={{
            color: index === 0 ? "#D1D1D1" : "#03256C",
            fontWeight: "bold",
            marginRight: 10,
          }}
        >
          Back
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={
              index === 0
                ? styles.dot_symbol_active
                : styles.dot_symbol_inactive
            }
          ></View>
          <View
            style={
              index === 1
                ? styles.dot_symbol_active
                : styles.dot_symbol_inactive
            }
          ></View>
          <View
            style={
              index === 2
                ? styles.dot_symbol_active
                : styles.dot_symbol_inactive
            }
          ></View>
        </View>
        <Text
          onPress={handleNext}
          style={{
            color: index === 2 ? "#D1D1D1" : "#03256C",
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Next
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingVertical: 60,
    paddingHorizontal: 35,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  img_logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  img_onboarding: {
    marginHorizontal: "auto",
    width: 270,
    height: 270,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  dot_symbol_active: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#03256C",
    marginRight: 5,
  },
  dot_symbol_inactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D1D1D1",
    marginRight: 5,
  },
  row_nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
};

export default OnboardingScreen;
