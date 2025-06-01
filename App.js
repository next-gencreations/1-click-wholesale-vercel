import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Platform, SafeAreaView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const webViewUrl = 'https://1-click-wholesale-vercel.vercel.app';
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4a86e8" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>1-Click-Wholesale</Text>
      </View>
      <WebView 
        source={{ uri: webViewUrl }} 
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4a86e8',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  webView: {
    flex: 1,
  }
});
