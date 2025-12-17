import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <View style={styles.headerContainer}>
        <FontAwesome name="futbol-o" size={80} color="#fff" style={styles.icon} />
        <Text style={styles.title}>Sport Tracer</Text>
      </View>
      <Text style={styles.subtitle}>Отслеживайте свои пробежки с легкостью</Text>
      
      <View style={styles.buttonContainer}>
        <Link href="/tracker" asChild>
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="play-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>Начать отслеживание</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/modal/about" asChild>
          <TouchableOpacity style={[styles.button, styles.outlineButton]}>
            <FontAwesome name="info-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>О приложении</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
    marginTop: 5,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c7ed6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 15,
    width: '80%',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1c7ed6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
