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
import { StatusBar } from "expo-status-bar";

export default function App() {
  // *** IMPORTANT: This MUST be your deployed Next.js web app's URL from Vercel ***
  const urlToLoad =
    "https://vercel.com/jayantsolao05-gmailcoms-projects/nextjs-webview-web-app"; // PASTE YOUR ACTUAL VERCEL URL HERE

  console.log("Loading WebView with URL:", urlToLoad);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
