import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
// Import the notebook tool
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Oops!', 'Please fill in both fields.');
      return;
    }

    try {
      // 1. Read the saved student record out of the phone storage notebook
      const savedData = await AsyncStorage.getItem('saved_student');
      
      if (savedData !== null) {
        // Convert the raw text data back into a readable JavaScript object
        const student = JSON.parse(savedData);

        // 2. Check if the entered credentials match what was saved!
        if (student.email === email && student.password === password) {
          Alert.alert('Welcome Back!', 'Authentication successful.');
          
          // Pass the student's name and registration number to the Dashboard!
          navigation.navigate('Dashboard', { 
            studentName: student.name, 
            studentReg: student.reg 
          });
        } else {
          Alert.alert('Error', 'Incorrect email or password.');
        }
      } else {
        Alert.alert('No Account Found', 'No student records exist on this device. Please register first!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to read local storage data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎓 Student Portal</Text>
      <Text style={styles.subTitle}>Please login to access your records</Text>

      <TextInput style={styles.input} placeholder="Enter your Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Enter your Password" value={password} onChangeText={setPassword} secureTextEntry={true} />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Don't have an account? <Text style={styles.boldText}>Register here</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB', justifyContent: 'center', paddingHorizontal: 30 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center', marginBottom: 5 },
  subTitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#FFFFFF', height: 55, borderRadius: 10, paddingHorizontal: 15, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0', color: '#333' },
  loginButton: { backgroundColor: '#1E3A8A', height: 55, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 25 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  registerLink: { color: '#555', textAlign: 'center', fontSize: 14 },
  boldText: { color: '#1E3A8A', fontWeight: 'bold' }
});