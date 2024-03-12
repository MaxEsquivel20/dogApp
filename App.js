import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function App() {
  const [dog, setDog] = useState(null);
  const [error, setError] = useState(null);

  const getPhoto = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDog(data.message); // Update dog state with image URL
    } catch (err) {
      setError('Error fetching dog photo: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dog App</Text>

      <TouchableOpacity style={styles.button} onPress={getPhoto}>
        <Text style={styles.buttonText}>Get New Photo</Text>
      </TouchableOpacity>

      {dog && ( // Conditionally render image only if dog state is set
        <Image
          source={{ uri: dog }}
          style={styles.image}
        />
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
  },
  buttonText: {
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});