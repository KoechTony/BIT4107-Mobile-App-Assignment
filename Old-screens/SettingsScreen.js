import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ App Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>🔔 Push Notifications: Enabled</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>🔒 Device Security Token: Active</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>📱 App Version: v1.0.0 (SDK 54)</Text>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.backBtnText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB', padding: 25, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center', marginBottom: 20 },
  settingItem: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  settingText: { fontSize: 15, color: '#475569' },
  backBtn: { backgroundColor: '#64748B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  backBtnText: { color: '#FFF', fontWeight: 'bold' }
});