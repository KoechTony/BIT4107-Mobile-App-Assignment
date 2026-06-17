import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
// 1. Import the local storage notebook tool
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. We add "async" here because saving data takes a split second
  const handleRegister = async () => {
    if (fullName.trim() === '' || regNumber.trim() === '' || email.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Create a student package object
      const studentData = {
        name: fullName,
        reg: regNumber,
        email: email,
        password: password
      };

      // 3. Save the package into the phone's local storage memory!
      await AsyncStorage.setItem('saved_student', JSON.stringify(studentData));

      Alert.alert('Success 🎉', 'Student record saved locally!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to save student data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Create Account</Text>
      <Text style={styles.subTitle}>Register your student details below</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="e.g. Anthony Koech" value={fullName} onChangeText={setFullName} />

      <Text style={styles.label}>Registration Number</Text>
      <TextInput style={styles.input} placeholder="e.g. BIT/2026/0001" value={regNumber} onChangeText={setRegNumber} autoCapitalize="characters" />

      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} placeholder="student@university.ac.ke" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="Create a secure password" value={password} onChangeText={setPassword} secureTextEntry={true} />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTER STUDENT</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? <Text style={styles.boldText}>Login here</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F5F7FB', paddingHorizontal: 30, paddingVertical: 40, justifyContent: 'center' },
  title: { fontSize: 30, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center', marginBottom: 5 },
  subTitle: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 30 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', height: 50, borderRadius: 8, paddingHorizontal: 15, fontSize: 15, marginBottom: 18, borderWidth: 1, borderColor: '#E2E8F0', color: '#333' },
  registerButton: { backgroundColor: '#10B981', height: 55, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 25 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  loginLink: { color: '#555', textAlign: 'center', fontSize: 14 },
  boldText: { color: '#1E3A8A', fontWeight: 'bold' }
});