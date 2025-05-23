// C:\necxis assign project\nextjs-expo-assignment\mobile-app\App.js

import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar"; // Import StatusBar

export default function App() {
  // Your computer's local IPv4 address (from `ipconfig` output)
  // VERIFY THIS IP ADDRESS AGAIN BEFORE RUNNING (from your latest ipconfig, it was 192.168.84.188)
  const localIpAddress = "192.168.84.188"; // Replace with your actual IP or deployed Next.js URL
  const urlToLoad = `http://${localIpAddress}:3000`; // Adjust if using a deployed URL

  console.log("Loading WebView with URL:", urlToLoad);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" /> {/* Add StatusBar for better appearance */}
      <WebView
        source={{ uri: urlToLoad }}
        style={styles.webview}
        onLoadStart={() => console.log("WebView started loading:", urlToLoad)}
        onLoadEnd={() => console.log("WebView finished loading")}
        renderLoading={() => (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        )}
        startInLoadingState={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error: ", nativeEvent);
          return (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                Failed to load web page. Check your internet connection or the
                server.
              </Text>
              <Text style={styles.errorDetail}>
                URL: {nativeEvent.url || "N/A"}
              </Text>
              <Text style={styles.errorDetail}>
                Description: {nativeEvent.description}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Dynamic padding for Android status bar
  },
  webview: {
    flex: 1,
  },
  loadingIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8d7da",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#721c24",
    textAlign: "center",
    marginBottom: 10,
  },
  errorDetail: {
    fontSize: 14,
    color: "#721c24",
    textAlign: "center",
  },
});
