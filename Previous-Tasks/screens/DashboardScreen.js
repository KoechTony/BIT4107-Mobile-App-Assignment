import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  const { studentName, studentReg } = route.params || { studentName: 'Guest Student', studentReg: 'N/A' };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back! 👋</Text>
      <Text style={styles.subText}>School of Computing & Information Technology</Text>

      {/* ID Card Layout */}
      <View style={styles.idCard}>
        <View style={styles.cardHeader}><Text style={styles.cardHeaderTitle}>OFFICIAL STUDENT PASS</Text></View>
        <View style={styles.cardBody}>
          <Text style={styles.label}>STUDENT NAME:</Text>
          <Text style={styles.value}>{studentName}</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>REGISTRATION NUMBER:</Text>
          <Text style={styles.value}>{studentReg}</Text>
        </View>
      </View>

      {/* Week 4 Button: Local Database Reports Screen */}
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981' }]} onPress={() => navigation.navigate('Reports')}>
        <Text style={styles.actionButtonText}>📋 OPEN REPORTS MANAGER (WEEK 4)</Text>
      </TouchableOpacity>

      {/* Week 5 Button: External REST API Integration Screen */}
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#8B5CF6' }]} onPress={() => navigation.navigate('ApiIntegration')}>
        <Text style={styles.actionButtonText}>🌐 CONNECT TO LIVE API (WEEK 5)</Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#1E3A8A' }]} onPress={() => navigation.navigate('Profile', { studentName, studentReg })}>
        <Text style={styles.actionButtonText}>VIEW MY PROFILE</Text>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EF4444' }]} onPress={() => navigation.replace('Login')}>
        <Text style={styles.actionButtonText}>SIGN OUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingGrow: 1, backgroundColor: '#F5F7FB', paddingHorizontal: 25, paddingVertical: 30, justifyContent: 'center' },
  welcomeText: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center' },
  subText: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 25 },
  idCard: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginBottom: 20, elevation: 3 },
  cardHeader: { backgroundColor: '#1E3A8A', paddingVertical: 10, alignItems: 'center' },
  cardHeaderTitle: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  cardBody: { padding: 20 },
  label: { fontSize: 11, color: '#64748B', fontWeight: '700', marginBottom: 2 },
  value: { fontSize: 16, color: '#1E293B', fontWeight: 'bold', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#EDF2F7', marginBottom: 12 },
  actionButton: { height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 1 },
  actionButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }
});