import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ route, navigation }) {
  const { studentName, studentReg } = route.params || { studentName: 'Anthony Koech', studentReg: 'BIT/2026/0001' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 My Profile</Text>
      
      <View style={styles.infoCard}>
        <Text style={styles.text}>Name: {studentName}</Text>
        <Text style={styles.text}>Reg No: {studentReg}</Text>
        <Text style={styles.text}>Course: Software Engineering</Text>
        <Text style={styles.text}>Year: Final Year (4.2)</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.btnText}>Go to App Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB', padding: 25, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center', marginBottom: 20 },
  infoCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 10, color: '#333', fontWeight: '500' },
  btn: { backgroundColor: '#1E3A8A', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});