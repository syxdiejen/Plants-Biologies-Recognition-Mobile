import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  description: string;
  imageUri: string;
}

export default function BookCard({ title, description, imageUri }: Props) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.learnMore}>Learn more</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    padding: 8,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  learnMore: { fontSize: 12, color: '#007bff', marginBottom: 4 },
  image: { width: '100%', height: 80, backgroundColor: '#ccc', marginBottom: 8 },
  title: { fontWeight: 'bold' },
  description: { fontSize: 12, color: '#555' },
});
