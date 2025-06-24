import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { ChevronDown, ChevronRight, Home, Search, User, BookOpen, Leaf, Microscope } from 'lucide-react-native';

interface Chapter {
  id: number;
  title: string;
  lessons: string[];
  isExpanded: boolean;
}

interface BookCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  chapters: Chapter[];
}

const About: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const bookCategories: BookCategory[] = [
    {
      id: 'plant',
      title: 'Plant Book',
      description: 'Explore various plant species and their characteristics',
      icon: <Leaf size={32} color="#16a34a" />,
      color: '#16a34a',
      chapters: [
        {
          id: 1,
          title: 'Chapter 1: Plant Fundamentals',
          lessons: ['Lesson 1: Introduction to Plant Biology', 'Lesson 2: Plant Cell Structure and Function'],
          isExpanded: false,
        },
        {
          id: 2,
          title: 'Chapter 2: Plant Processes',
          lessons: ['Lesson 1: Photosynthesis Process', 'Lesson 2: Plant Reproduction'],
          isExpanded: false,
        },
        {
          id: 3,
          title: 'Chapter 3: Plant Ecology',
          lessons: ['Lesson 1: Plant Adaptation', 'Lesson 2: Ecosystem Interactions'],
          isExpanded: false,
        },
      ],
    },
    {
      id: 'animal',
      title: 'Animal Book',
      description: 'Discover the diverse world of animal kingdom',
      icon: <Microscope size={32} color="#2563eb" />,
      color: '#2563eb',
      chapters: [
        {
          id: 1,
          title: 'Chapter 1: Animal Classification',
          lessons: ['Lesson 1: Introduction to Animal Kingdom', 'Lesson 2: Vertebrates vs Invertebrates'],
          isExpanded: false,
        },
        {
          id: 2,
          title: 'Chapter 2: Animal Behavior',
          lessons: ['Lesson 1: Animal Communication', 'Lesson 2: Migration Patterns'],
          isExpanded: false,
        },
        {
          id: 3,
          title: 'Chapter 3: Animal Habitats',
          lessons: ['Lesson 1: Terrestrial Animals', 'Lesson 2: Aquatic Animals'],
          isExpanded: false,
        },
      ],
    },
    {
      id: 'biology',
      title: 'Biology Book',
      description: 'Comprehensive study of life sciences',
      icon: <BookOpen size={32} color="#ea580c" />,
      color: '#ea580c',
      chapters: [
        {
          id: 1,
          title: 'Chapter 1: Life Sciences Basics',
          lessons: ['Lesson 1: What is Biology?', 'Lesson 2: Scientific Method in Biology'],
          isExpanded: false,
        },
        {
          id: 2,
          title: 'Chapter 2: Cellular Biology',
          lessons: ['Lesson 1: Cell Theory', 'Lesson 2: Cell Division'],
          isExpanded: false,
        },
        {
          id: 3,
          title: 'Chapter 3: Genetics',
          lessons: ['Lesson 1: DNA Structure', 'Lesson 2: Heredity and Inheritance'],
          isExpanded: false,
        },
      ],
    },
  ];

  const handleBookSelect = (bookId: string) => {
    const selectedBookData = bookCategories.find((book) => book.id === bookId);
    if (selectedBookData) {
      setSelectedBook(bookId);
      setChapters(selectedBookData.chapters);
    }
  };

  const toggleChapter = (chapterId: number) => {
    setChapters(chapters.map((chapter) =>
      chapter.id === chapterId ? { ...chapter, isExpanded: !chapter.isExpanded } : chapter
    ));
  };

  const getSelectedBookTitle = () => {
    const book = bookCategories.find((book) => book.id === selectedBook);
    return book ? book.title : '';
  };

  const renderBookCategory = ({ item }: { item: BookCategory }) => (
    <TouchableOpacity
      style={[styles.bookCard, { borderColor: selectedBook === item.id ? '#3b82f6' : '#e5e7eb' }]}
      onPress={() => handleBookSelect(item.id)}
    >
      <View style={styles.bookCardContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
          {item.icon}
        </View>
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookDescription}>{item.description}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.selectButton, selectedBook === item.id ? styles.selectedButton : null]}
        onPress={() => handleBookSelect(item.id)}
      >
        <Text style={[styles.selectButtonText, selectedBook === item.id ? styles.selectedButtonText : null]}>
          {selectedBook === item.id ? 'Selected' : 'Learn more'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderChapter = ({ item, index }: { item: Chapter; index: number }) => (
    <View style={[styles.chapterContainer, index !== chapters.length - 1 ? styles.chapterBorder : null]}>
      <TouchableOpacity style={styles.chapterHeader} onPress={() => toggleChapter(item.id)}>
        <Text style={styles.chapterTitle}>{item.title}</Text>
        {item.isExpanded ? (
          <ChevronDown size={20} color="#6b7280" />
        ) : (
          <ChevronRight size={20} color="#6b7280" />
        )}
      </TouchableOpacity>
      {item.isExpanded && (
        <View style={styles.lessonContainer}>
          {item.lessons.map((lesson, lessonIndex) => (
            <TouchableOpacity key={lessonIndex} style={styles.lessonItem}>
              <Text style={styles.lessonText}>{lesson}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Biology & Plant Sample Learning App</Text>
      </View>

      {/* Main Content */}
      <FlatList
        data={selectedBook ? [] : bookCategories}
        renderItem={renderBookCategory}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <View style={styles.welcomeCard}>
                <View style={styles.welcomeIcon}>
                  <Leaf size={24} color="#ffffff" />
                </View>
                <Text style={styles.welcomeTitle}>Welcome to Learning Environment</Text>
                <Text style={styles.welcomeText}>Explore the Biology of Plants and Animals</Text>
              </View>
            </View>

            {/* Book Categories Header */}
            {!selectedBook && (
              <Text style={styles.sectionTitle}>Book Categories</Text>
            )}

            {/* Chapters Section */}
            {selectedBook && chapters.length > 0 && (
              <View style={styles.chaptersSection}>
                <View style={styles.chaptersHeader}>
                  <Text style={styles.sectionTitle}>{getSelectedBookTitle()} - Chapters</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBook(null);
                      setChapters([]);
                    }}
                  >
                    <Text style={styles.backButton}>Back to Books</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={chapters}
                  renderItem={renderChapter}
                  keyExtractor={(item) => item.id.toString()}
                  style={styles.chaptersList}
                />
              </View>
            )}

            {/* Placeholder when no book is selected */}
            {!selectedBook && (
              <View style={styles.placeholderSection}>
                <View style={styles.placeholderCard}>
                  <BookOpen size={48} color="#9ca3af" />
                  <Text style={styles.placeholderTitle}>Select a Book to Continue</Text>
                  <Text style={styles.placeholderText}>
                    Choose one of the book categories above to start exploring chapters and lessons.
                  </Text>
                </View>
              </View>
            )}
          </>
        }
        contentContainerStyle={styles.mainContent}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Home size={24} color="#16a34a" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Search size={24} color="#9ca3af" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <User size={24} color="#9ca3af" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  welcomeSection: {
    marginVertical: 16,
  },
  welcomeCard: {
    backgroundColor: '#16a34a',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  welcomeIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 14,
    color: '#dcfce7',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  bookCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  bookDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  selectedButton: {
    backgroundColor: '#2563eb',
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  selectedButtonText: {
    color: '#ffffff',
  },
  chaptersSection: {
    marginBottom: 16,
  },
  chaptersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
  chaptersList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chapterContainer: {
    paddingHorizontal: 16,
  },
  chapterBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  lessonContainer: {
    paddingBottom: 16,
  },
  lessonItem: {
    paddingVertical: 8,
    paddingLeft: 16,
    borderRadius: 8,
  },
  lessonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  placeholderSection: {
    marginVertical: 16,
    alignItems: 'center',
  },
  placeholderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginVertical: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    ...Platform.select({
      ios: {
        paddingBottom: 16,
      },
      android: {
        paddingBottom: 8,
      },
    }),
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginTop: 4,
  },
});

export default About