import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AddRunModal() {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');

  const handleSave = async () => {
    if (!distance || !time || isNaN(parseFloat(distance)) || isNaN(parseInt(time, 10))) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректные данные.');
      return;
    }

    const newRun = {
      id: Date.now().toString(),
      distance: parseFloat(distance),
      time: parseInt(time, 10),
    };

    try {
      const existingRuns = await AsyncStorage.getItem('runs');
      const runs = existingRuns ? JSON.parse(existingRuns) : [];
      runs.push(newRun);
      await AsyncStorage.setItem('runs', JSON.stringify(runs));
      if (router.canGoBack()) {
        router.back();
      }
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось сохранить пробежку.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text style={styles.title}>Добавить пробежку</Text>
      <TextInput
        style={styles.input}
        placeholder="Дистанция (км)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Время (в секундах)"
        keyboardType="numeric"
        value={time}
        onChangeText={setTime}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Сохранить</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1c7ed6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
