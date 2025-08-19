import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

const categories = [
  { name: "New", image: "https://picsum.photos/200/300?random=5" },
  { name: "Clothes", image: "https://picsum.photos/200/300?random=6" },
  { name: "Shoes", image: "https://picsum.photos/200/300?random=7" },
  { name: "Accessories", image: "https://picsum.photos/200/300?random=8" },
];

export default function KidsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Banner Summer Sale */}
      <TouchableOpacity style={styles.banner}>
        <Text style={styles.bannerTitle}>SUMMER SALES</Text>
        <Text style={styles.bannerSubtitle}>Up to 50% off</Text>
      </TouchableOpacity>

      {/* Categories */}
      {categories.map((cat, idx) => (
        <TouchableOpacity key={idx} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{cat.name}</Text>
            <Image source={{ uri: cat.image }} style={styles.cardImage} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  banner: {
    backgroundColor: "#E53935",
    borderRadius: 8,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  bannerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  bannerSubtitle: { color: "#fff", fontSize: 14, marginTop: 4 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  cardText: { fontSize: 16, fontWeight: "500" },
  cardImage: { width: 100, height: 70, borderRadius: 6 },
});
