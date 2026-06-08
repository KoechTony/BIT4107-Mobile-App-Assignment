import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';

export default function ApiIntegrationScreen() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchExternalData();
  }, []);

  // Asynchronous network data processing function
  const fetchExternalData = async () => {
    try {
      // Sending a live HTTP GET request to a public test server endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      // Error handling check: did the server return a healthy response code?
      if (!response.ok) throw new Error('Something went wrong with network codes.');

      const data = await response.json(); // Transform the raw string stream into a JSON object
      setUsers(data);
    } catch (error) {
      Alert.alert('Network Failure Error', error.message);
    } finally {
      setLoading(false); // Stop showing the loading spinner animation
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌐 Live API Database Consumers</Text>
      <Text style={styles.subText}>Asynchronously loading global developer records</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E3A8A" />
          <Text style={styles.loadingText}>Connecting to cloud server cluster...</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.userName}>👤 {item.name}</Text>
              <Text style={styles.userEmail}>✉️ Email: {item.email}</Text>
              <Text style={styles.userCompany}>🏢 Organization: {item.company.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center', marginTop: 10 },
  subText: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#1E3A8A', fontWeight: '500' },
  userCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0', elevation: 1 },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  userEmail: { fontSize: 14, color: '#475569', marginTop: 4 },
  userCompany: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginTop: 2 }
});