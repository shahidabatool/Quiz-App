import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';
import { RootStackParamList } from '../types';
import { ukModules } from '../data/uk-questions';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function UKChaptersScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const handleModulePress = (moduleId: string) => {
    navigation.navigate('PracticeModule', {
      moduleId,
      country: 'uk',
      title: ukModules.find(m => m.id === moduleId)?.title || ''
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text style={styles.title}>Practice by Chapter</Text>
        <Text style={styles.subtitle}>Choose a topic to study</Text>
      </View>

      <View style={styles.content}>
        {ukModules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={[styles.moduleCard, { backgroundColor: theme.colors.card }]}
            onPress={() => handleModulePress(module.id)}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.background }]}>
              <Text style={styles.icon}>{module.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>{module.title}</Text>
              <Text style={[styles.moduleDescription, { color: theme.colors.textSecondary }]}>{module.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    padding: 15,
  },
  moduleCard: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 30,
  },
  textContainer: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moduleDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 