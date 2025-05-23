// C:\necxis assign project\nextjs-expo-assignment\mobile-app\App.js

import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  ActivityIndicator,
  Linking,
} from "react-native";
// Only import WebView if not on web, or the bundler will error
let WebView;
if (Platform.OS !== "web") {
  WebView = require("react-native-webview").WebView;
}
import { StatusBar } from "expo-status-bar";

export default function App() {
  // *** IMPORTANT: This MUST be your deployed Next.js web app's PUBLIC URL from Vercel ***
  const urlToLoad = "https://nextjs-webview-web-app.vercel.app/"; // This is your correct Vercel URL // <<< PASTE YOUR ACTUAL VERCEL URL HERE >>>

  console.log("Loading App for Platform:", Platform.OS);
  console.log("WebView URL (if applicable):", urlToLoad);

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <StatusBar style="auto" />
        <Text style={styles.webTitle}>Hybrid Mobile App Demo</Text>
        <Text style={styles.webMessage}>
          This application is designed for mobile devices (iOS and Android) to
          showcase WebView integration.
        </Text>
        <Text style={styles.webMessage}>
          The web version cannot fully demonstrate the native WebView
          functionality.
        </Text>
        <Text style={styles.webMessage}>
          To experience the full app, please scan the QR code with the Expo Go
          app:
        </Text>
        {/* You can add instructions or a link to a demo video/GIF here */}
        <Text style={styles.webLink}>
          You can view the embedded web app here:{" "}
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL(urlToLoad)}
          >
            {urlToLoad}
          </Text>
        </Text>
        {/* Optionally, you could try an iframe here, but it might still have issues
        <iframe
          src={urlToLoad}
          style={{ width: '100%', height: '50%', border: 'none', marginTop: 20 }}
          title="Embedded Web App Preview"
        ></iframe>
        */}
      </View>
    );
  }

  // Render WebView for iOS and Android platforms
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {WebView ? ( // Ensure WebView is loaded before rendering
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
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>WebView component not available.</Text>
        </View>
      )}
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
    backgroundColor: "#fff", // Ensure it covers the whole screen while loading
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
  // Styles for the web fallback
  webContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f7",
    padding: 20,
  },
  webTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  webMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  webLink: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
