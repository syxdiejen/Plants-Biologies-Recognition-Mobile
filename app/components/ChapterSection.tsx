import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ChapterSection() {
  const [expanded, setExpanded] = useState(true);

  return (
    <View>
      {/* Chapter 1 */}
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.chapter}>
          {expanded ? '▼' : '▶'} Chapter 1
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.lessonList}>
          <Text>Lesson 1: Introduction</Text>
          <Text>Lesson 2: Photosynthesis</Text>
        </View>
      )}

      {/* Chapter 2 */}
      <Text style={styles.chapter}>▶ Chapter 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chapter: { fontWeight: 'bold', fontSize: 16, marginVertical: 8 },
  lessonList: { marginLeft: 16 },
});
