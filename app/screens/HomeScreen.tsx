import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import BookCard from '../components/BookCard';
import ChapterSection from '../components/ChapterSection';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Biology & Plant Sample Learning App</Text>

      {/* Welcome */}
      <View style={styles.welcome}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcomeTitle}>Welcome to Learning Environment</Text>
          <Text style={styles.welcomeSubtitle}>Explore the Biology of Plants and Animals</Text>
        </View>
      </View>

      {/* Book Categories */}
      <Text style={styles.sectionTitle}>Book Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BookCard
          title="Plant Book"
          description="Explore various plants"
          imageUri="https://via.placeholder.com/100"
        />
        <BookCard
          title="Animal Book"
          description="Discover the diversity"
          imageUri="https://via.placeholder.com/100"
        />
        <BookCard
          title="Biology Book"
          description="Core biological concepts"
          imageUri="https://via.placeholder.com/100"
        />
      </ScrollView>

      {/* Chapter list */}
      <Text style={styles.sectionTitle}>Select a Book to Continue</Text>
      <ChapterSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  welcome: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  welcomeTitle: { fontWeight: 'bold' },
  welcomeSubtitle: { color: '#555' },
  sectionTitle: { marginTop: 16, marginBottom: 8, fontWeight: 'bold' },
});
