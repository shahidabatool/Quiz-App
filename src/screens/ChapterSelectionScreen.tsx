import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { chapters } from '../data/chapters';
import { theme } from '../theme';

export default function ChapterSelectionScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Select Chapter</Text>
      
      {chapters.map((chapter) => (
        <TouchableOpacity
          key={chapter.id}
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Quiz', { 
            mode: 'practice',
            chapterId: chapter.id 
          })}
        >
          <View style={styles.chapterNumber}>
            <Text style={styles.chapterNumberText}>{chapter.id}</Text>
          </View>
          
          <View style={styles.chapterInfo}>
            <Text style={styles.icon}>{chapter.icon}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{chapter.title}</Text>
              <Text style={styles.description}>{chapter.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  chapterCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chapterNumber: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    position: 'absolute',
    left: 0,
    top: 0,
    borderBottomRightRadius: 12,
  },
  chapterNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chapterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 50,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
}); 