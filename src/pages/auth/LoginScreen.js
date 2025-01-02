import React,{useState} from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import TextField from '../../components/TextField'
import ButtonSecondary from '../../components/ButtonSecondary'
import { Login } from '../../services/api/AuthService'
import { handleApiError } from '../../services/utils/ErorHandling'
import { saveUserData } from '../../services/storage/UserStorage'

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleOnChangeText = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const handleLogin = async () => {
    if(!formData.email || !formData.password){
      Alert.alert('Error', 'Email and password must be filled')
      return
    }
    try{
      const data = await Login(formData.email, formData.password)
      if(data.status == 'false'){
        Alert.alert('Error', data.message)
        return
      }
      await saveUserData(data.data.investment_user_id, data.data.name)
      Alert.alert('Success', 'Login success')
      navigation.navigate('MainStack')
    }catch(error){
      const {message} = handleApiError(error)
      Alert.alert('Error', 'Login failed')
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text_title}>Sign In</Text>
        <View style={{
          marginTop: 40,
          flexDirection: 'column',
          gap: 10,
        }}>
          <TextField label="Email" placeholder="Enter your email" onChangeText={(value) => handleOnChangeText('email', value)} />
          <TextField label="Password" placeholder="Enter your password" isObscured onChangeText={(value) => handleOnChangeText('password', value)} />
        </View>
      </View>
      <View>
        <ButtonSecondary title="Sign In" onPress={handleLogin} />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
          <Text style={{ color: '#ffffff' }}>Don't have an account?</Text>
          <Text style={{ color: '#ffffff', fontWeight: 'bold', marginLeft: 5 }} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 70,
    backgroundColor: '#03256C',
    color: '#ffffff',
    flex: 1,
    justifyContent: 'space-between',
  },
  text_title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

})


export default LoginScreen