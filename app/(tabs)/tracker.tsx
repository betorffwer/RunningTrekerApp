import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Run = {
  id: string;
  distance: number;
  time: number;
};

const formatTime = (totalSeconds: number) => {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${paddedMinutes}:${paddedSeconds}`;
};

const calculatePace = (distance: number, time: number) => {
  if (distance <= 0 || time <= 0) return "0' 0''";
  const paceInSecondsPerKm = time / distance;
  const paceMinutes = Math.floor(paceInSecondsPerKm / 60);
  const paceSeconds = Math.round(paceInSecondsPerKm % 60);
  return `${paceMinutes}' ${paceSeconds}''`;
};

const calculateSpeed = (distance: number, time: number) => {
  if (distance <= 0 || time <= 0) return '0,00';
  const timeInHours = time / 3600;
  const speed = distance / timeInHours;
  return speed.toFixed(2).replace('.', ',');
};

export default function TrackerScreen() {
  const [runs, setRuns] = useState<Run[]>([]);

  const loadRuns = useCallback(async () => {
    try {
      const storedRuns = await AsyncStorage.getItem('runs');
      if (storedRuns !== null) {
        setRuns(JSON.parse(storedRuns));
      }
    } catch (error) {
      console.error('Failed to load runs.', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRuns();
    }, [loadRuns])
  );

  const sortRuns = (criteria: 'best' | 'worst') => {
    const sortedRuns = [...runs].sort((a, b) => {
      const paceA = a.time / a.distance;
      const paceB = b.time / b.distance;
      return criteria === 'best' ? paceA - paceB : paceB - paceA;
    });
    setRuns(sortedRuns);
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Удалить пробежку',
      'Вы уверены, что хотите удалить эту пробежку?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: async () => {
            try {
              const updatedRuns = runs.filter(run => run.id !== id);
              setRuns(updatedRuns);
              await AsyncStorage.setItem('runs', JSON.stringify(updatedRuns));
            } catch (error) {
              console.error('Failed to delete the run.', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Run }) => (
    <View style={styles.runItem}>
      <View style={styles.runDataContainer}>
        <View style={styles.runDetails}>
          <FontAwesome name="road" size={20} color="#333" />
          <Text style={styles.runText} adjustsFontSizeToFit numberOfLines={1}>{item.distance} км</Text>
          <Text style={styles.runSubText}>Дистанция</Text>
        </View>
        <View style={styles.runDetails}>
          <FontAwesome name="clock-o" size={20} color="#333" />
          <Text style={styles.runText} adjustsFontSizeToFit numberOfLines={1}>{formatTime(item.time)}</Text>
          <Text style={styles.runSubText}>Время</Text>
        </View>
        <View style={styles.runDetails}>
          <FontAwesome name="tachometer" size={20} color="#333" />
          <Text style={styles.runText} adjustsFontSizeToFit numberOfLines={1}>{calculatePace(item.distance, item.time)}</Text>
          <Text style={styles.runSubText}>Темп (/км)</Text>
        </View>
        <View style={styles.runDetails}>
          <FontAwesome name="bolt" size={20} color="#333" />
          <Text style={styles.runText} adjustsFontSizeToFit numberOfLines={1}>{calculateSpeed(item.distance, item.time)}</Text>
          <Text style={styles.runSubText}>Скорость (км/ч)</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <FontAwesome name="trash" size={24} color="#ff3b30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.title}>Мои пробежки</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sortButton} onPress={() => sortRuns('best')}>
          <Text style={styles.sortButtonText}>Лучший результат</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => sortRuns('worst')}>
          <Text style={styles.sortButtonText}>Худший результат</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={runs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>У вас пока нет пробежек.</Text>
            <Text style={styles.emptyText}>Нажмите "+", чтобы добавить первую.</Text>
          </View>
        )}
      />
      <Link href="/modal/addRun" asChild>
        <TouchableOpacity style={styles.fab}>
          <FontAwesome name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </Link>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sortButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  runItem: {
    backgroundColor: '#fff',
    padding: 15,
    paddingHorizontal: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  runDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  runDetails: {
    alignItems: 'center',
    flex: 1,
  },
  deleteButton: {
    padding: 10,
    marginLeft: 5,
  },
  runText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1,
  },
  runSubText: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1c7ed6',
    justifyContent: 'center',
    alignItems: 'center',
    // @ts-ignore
    boxShadow: 'none',
  },
});
