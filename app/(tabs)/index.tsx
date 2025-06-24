import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { ChevronDown, ChevronRight } from 'lucide-react-native';

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Book {
  id: string;
  title: string;
  subtitle: string;
  coverColor: string;
  chapters: Chapter[];
}

const books: Book[] = [
  {
    id: 'plant',
    title: 'Plant Book',
    subtitle: 'Explore various plants and their characteristics',
    coverColor: '#dcfce7',
    chapters: [
      {
        id: 'chapter1',
        title: 'Chapter 1: Introduction to Plants',
        lessons: [
          { id: 'lesson1', title: 'Lesson 1: What are Plants?', duration: '15 min' },
          { id: 'lesson2', title: 'Lesson 2: Plant Classification', duration: '20 min' },
          { id: 'lesson3', title: 'Lesson 3: Plant Structures', duration: '18 min' },
        ],
      },
      {
        id: 'chapter2',
        title: 'Chapter 2: Plant Reproduction',
        lessons: [
          { id: 'lesson4', title: 'Lesson 1: Flower Structure', duration: '22 min' },
          { id: 'lesson5', title: 'Lesson 2: Pollination Process', duration: '25 min' },
        ],
      },
    ],
  },
  {
    id: 'animal',
    title: 'Animal Book',
    subtitle: 'Discover the diverse world of animals',
    coverColor: '#dbeafe',
    chapters: [
      {
        id: 'chapter1',
        title: 'Chapter 1: Animal Kingdom',
        lessons: [
          { id: 'lesson1', title: 'Lesson 1: Classification', duration: '18 min' },
          { id: 'lesson2', title: 'Lesson 2: Habitats', duration: '16 min' },
        ],
      },
      {
        id: 'chapter2',
        title: 'Chapter 2: Animal Behavior',
        lessons: [
          { id: 'lesson3', title: 'Lesson 1: Migration Patterns', duration: '20 min' },
          { id: 'lesson4', title: 'Lesson 2: Social Structures', duration: '24 min' },
        ],
      },
    ],
  },
  {
    id: 'biology',
    title: 'Biology Book',
    subtitle: 'Comprehensive biology fundamentals',
    coverColor: '#fef3c7',
    chapters: [
      {
        id: 'chapter1',
        title: 'Chapter 1: Cell Biology',
        lessons: [
          { id: 'lesson1', title: 'Lesson 1: Cell Structure', duration: '25 min' },
          { id: 'lesson2', title: 'Lesson 2: Cell Division', duration: '30 min' },
        ],
      },
    ],
  },
];

export default function HomeScreen() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const bookSelectionAnimation = useSharedValue(0);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setExpandedChapters(new Set());
    bookSelectionAnimation.value = withTiming(1, { duration: 300 });
  };

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const animatedBookStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(bookSelectionAnimation.value, [0, 1], [0, 1]),
      transform: [
        {
          translateY: interpolate(bookSelectionAnimation.value, [0, 1], [20, 0]),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Biology & Plant Sample Learning App</Text>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeTitle}>Welcome to Learning Environment</Text>
              <Text style={styles.welcomeSubtitle}>Explore the Biology of Plants and Animals</Text>
            </View>
          </View>
        </View>

        {/* Book Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Book Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.booksScroll}>
            {books.map((book) => (
              <View key={book.id} style={styles.bookCard}>
                <View style={[styles.bookCover, { backgroundColor: book.coverColor }]}>
                  <Text style={styles.bookCoverText}>Cover of {book.title}</Text>
                </View>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookSubtitle}>{book.subtitle}</Text>
                <TouchableOpacity
                  style={styles.learnButton}
                  onPress={() => handleBookSelect(book)}
                >
                  <Text style={styles.learnButtonText}>Learn more</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Selected Book Chapters */}
        {selectedBook && (
          <Animated.View style={[styles.section, animatedBookStyle]}>
            <Text style={styles.sectionTitle}>Select a Book to Continue</Text>
            <View style={styles.chaptersContainer}>
              {selectedBook.chapters.map((chapter) => (
                <ChapterItem
                  key={chapter.id}
                  chapter={chapter}
                  isExpanded={expandedChapters.has(chapter.id)}
                  onToggle={() => toggleChapter(chapter.id)}
                />
              ))}
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface ChapterItemProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
}

function ChapterItem({ chapter, isExpanded, onToggle }: ChapterItemProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withTiming(isExpanded ? 90 : 0, { duration: 200 });
  }, [isExpanded]);

  const animatedChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.chapterContainer}>
      <TouchableOpacity style={styles.chapterHeader} onPress={onToggle}>
        <Animated.View style={animatedChevronStyle}>
          <ChevronRight size={20} color="#64748b" />
        </Animated.View>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.lessonsContainer}>
          {chapter.lessons.map((lesson) => (
            <TouchableOpacity key={lesson.id} style={styles.lessonItem}>
              <View style={styles.lessonDot} />
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDuration}>{lesson.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 2,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 16,
  },
  booksScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  bookCard: {
    width: 180,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookCover: {
    height: 120,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bookCoverText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    textAlign: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 12,
    lineHeight: 16,
  },
  learnButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  learnButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#fff',
  },
  chaptersContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    overflow: 'hidden',
  },
  chapterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  chapterTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginLeft: 12,
    flex: 1,
  },
  lessonsContainer: {
    paddingLeft: 48,
    paddingRight: 16,
    paddingBottom: 8,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  lessonDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 2,
  },
  lessonDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
});