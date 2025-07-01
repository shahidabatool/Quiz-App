import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { zoomPlugin } from '@react-pdf-viewer/zoom';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import { theme } from '../theme';

const OFFICIAL_PDF_URL = 'https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/pub/discover.pdf';

export default function CanadaStudyGuideScreen() {
  const [error, setError] = useState<string | null>(null);

  // Initialize the plugins
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const zoomPluginInstance = zoomPlugin();

  const renderError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load the study guide. Please check your internet connection and try again.');
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error.message}</Text>
        <Text style={styles.errorHint}>Try refreshing the page or check your internet connection.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Canada</Text>
        <Text style={styles.subtitle}>Study Guide</Text>
      </View>

      <View style={styles.pdfContainer}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>{error}</Text>
              <Text style={styles.errorHint}>Try refreshing the page or check your internet connection.</Text>
            </View>
          ) : (
            <div style={{ height: '100%', width: '100%' }}>
              <Viewer
                fileUrl={OFFICIAL_PDF_URL}
                plugins={[
                  defaultLayoutPluginInstance,
                  zoomPluginInstance,
                ]}
                renderError={renderError}
                onError={(error) => {
                  console.error('PDF viewer error:', error);
                  setError('Failed to load the study guide. Please try again later.');
                }}
              />
            </div>
          )}
        </Worker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 60,
    backgroundColor: theme.colors.primary,
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
  pdfContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorHint: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    opacity: 0.7,
  },
}); 