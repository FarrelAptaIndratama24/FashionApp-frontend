import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useRouter } from "expo-router";

// Create a custom MaterialTopTabs compatible with Expo Router
const TopTabNavigator = createMaterialTopTabNavigator().Navigator;
export const MaterialTopTabs = withLayoutContext(TopTabNavigator);

// Komponen Header Custom
function CustomHeader() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerButton} onPress={handleBackPress}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Categories</Text>
      <TouchableOpacity style={styles.headerButton}>
        <Ionicons name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

export default function ShopLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
      <CustomHeader />
      <MaterialTopTabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#ffffff",
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            borderBottomWidth: 1,
            borderBottomColor: "#f0f0f0",
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "500",
            textTransform: "none",
            paddingBottom: 4, // Avoid text clipping
          },
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#888888",
          tabBarIndicatorStyle: {
            backgroundColor: "#ff0000", // Red underline
            height: 3,
            borderRadius: 2,
            bottom: 0,
          },
          tabBarPressColor: "rgba(0, 0, 0, 0.1)", // Android ripple effect
          tabBarShowIcon: false, // Hide icons, text-only tabs
        }}
      >
        <MaterialTopTabs.Screen
          name="women"
          options={{
             title: "Women",
          }}
        />
        <MaterialTopTabs.Screen
          name="men"
          options={{
             title: "Men",
          }}
        />
        <MaterialTopTabs.Screen
          name="kids"
          options={{
             title: "Kids",
          }}
        />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 1,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  headerButton: {
    padding: 8,
  },
});