import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>О приложении</Text>
        
        <View style={styles.content}>
          <Text style={styles.description}>
            Добро пожаловать в <Text style={styles.appName}>Sport Tracer</Text> — вашего надежного спутника в мире бега и активного образа жизни!
          </Text>
          
          <Text style={styles.paragraph}>
            Это современное мобильное приложение создано специально для тех, кто ценит каждую тренировку и стремится к постоянному самосовершенствованию. С помощью <Text style={styles.appName}>Sport Tracer</Text> вы сможете легко и удобно отслеживать все свои пробежки, анализировать прогресс и достигать новых высот в спорте.
          </Text>
          
          <Text style={styles.paragraph}>
            Приложение предоставляет широкий спектр возможностей: от простого фиксирования дистанции и времени до детального анализа темпа и скорости. Вы сможете отслеживать свои лучшие и худшие результаты, видеть динамику улучшений и ставить новые цели.
          </Text>
          
          <Text style={styles.paragraph}>
            <Text style={styles.appName}>Sport Tracer</Text> разработан с использованием передовых технологий React Native и Expo, что гарантирует высокую производительность, плавную работу и удобный интерфейс на всех платформах.
          </Text>
          
          <View style={styles.developerContainer}>
            <Text style={styles.developerLabel}>Разработал его</Text>
            <Text style={styles.developerName}>Ларин Сергей Эдуардович</Text>
            <Text style={styles.developerGroup}>Б-ИСиТ-42</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  content: {
    marginBottom: 30,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 25,
  },
  paragraph: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 20,
  },
  appName: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  developerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  developerLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
  },
  developerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  developerGroup: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
