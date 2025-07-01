import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Test'>;
};

export default function TestScreen({ navigation }: Props) {
    const startQuiz = () => {
        navigation.navigate('QuizScreen', { mode: 'test' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Test Mode</Text>
            <Text style={styles.description}>
                In test mode, you'll get your score at the end.
                This helps you assess your knowledge and readiness.
            </Text>
            
            <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
                <Text style={styles.startButtonText}>Start Test</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
        lineHeight: 24,
    },
    startButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
    },
    startButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
}); 