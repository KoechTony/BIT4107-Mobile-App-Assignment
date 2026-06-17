import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReportsScreen() {
  const [records, setRecords] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Load records from local storage whenever the screen opens
  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const storedData = await AsyncStorage.getItem('scit_student_records');
      if (storedData) setRecords(JSON.parse(storedData));
    } catch (e) {
      Alert.alert('Error', 'Failed to read records.');
    }
  };

  const saveToDisk = async (newRecords) => {
    try {
      await AsyncStorage.setItem('scit_student_records', JSON.stringify(newRecords));
      setRecords(newRecords);
    } catch (e) {
      Alert.alert('Error', 'Failed to write records to disk.');
    }
  };

  // CREATE / UPDATE Operation
  const handleSaveRecord = () => {
    if (!studentName.trim() || !course.trim()) {
      Alert.alert('Oops', 'Please fill in both fields.');
      return;
    }

    if (editingId) {
      // UPDATE existing record
      const updated = records.map(item => 
        item.id === editingId ? { ...item, name: studentName, course: course } : item
      );
      saveToDisk(updated);
      setEditingId(null);
    } else {
      // CREATE new record
      const newRecord = {
        id: Date.now().toString(), // Generates a unique primary key id
        name: studentName,
        course: course
      };
      saveToDisk([...records, newRecord]);
    }

    setStudentName('');
    setCourse('');
  };

  // DELETE Operation
  const handleDelete = (id) => {
    const filtered = records.filter(item => item.id !== id);
    saveToDisk(filtered);
  };

  // Start Editing setup
  const startEdit = (item) => {
    setStudentName(item.name);
    setCourse(item.course);
    setEditingId(item.id);
  };

  // SEARCH Filter
  const filteredRecords = records.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Local Reports Manager</Text>

      {/* Input Section */}
      <View style={styles.formCard}>
        <TextInput style={styles.input} placeholder="Student Name" value={studentName} onChangeText={setStudentName} />
        <TextInput style={styles.input} placeholder="Course / Unit" value={course} onChangeText={setCourse} />
        <TouchableOpacity style={[styles.btn, editingId ? styles.btnEdit : styles.btnAdd]} onPress={handleSaveRecord}>
          <Text style={styles.btnText}>{editingId ? 'UPDATE RECORD' : 'ADD NEW RECORD'}</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH Bar Component */}
      <TextInput 
        style={styles.searchBar} 
        placeholder="🔍 Search records by name or course..." 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* READ Operation via FlatList (React Native's RecyclerView equivalent) */}
      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recordCard}>
            <View>
              <Text style={styles.recordName}>{item.name}</Text>
              <Text style={styles.recordCourse}>{item.course}</Text>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.editBtn} onPress={() => startEdit(item)}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1E3A8A', textAlign: 'center', marginBottom: 15, marginTop: 10 },
  formCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, elevation: 2, marginBottom: 15 },
  input: { backgroundColor: '#F1F5F9', height: 45, borderRadius: 6, paddingHorizontal: 12, marginBottom: 10, borderWidth: 1, borderColor: '#CBD5E1' },
  btn: { height: 45, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  btnAdd: { backgroundColor: '#10B981' },
  btnEdit: { backgroundColor: '#3B82F6' },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  searchBar: { backgroundColor: '#FFF', height: 45, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  recordCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  recordName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  recordCourse: { fontSize: 14, color: '#64748B' },
  actionRow: { flexDirection: 'row' },
  editBtn: { backgroundColor: '#3B82F6', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4, marginRight: 8 },
  deleteBtn: { backgroundColor: '#EF4444', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4 },
  actionText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 }
});