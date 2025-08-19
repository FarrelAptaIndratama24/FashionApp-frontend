import { Tabs } from 'expo-router';
import { Ionicons, Entypo, AntDesign, Fontisto } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF4444', // Warna merah seperti di gambar
        tabBarInactiveTintColor: '#9CA3AF', // Abu-abu untuk inactive
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -2,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5, // untuk Android
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        headerShown: false, // Hide default header
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="bag"
        options={{
          title: 'Bag',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="shopping-bag" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "heart" : "heart-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
           <Ionicons 
  name={focused ? "person-outline" : "person-circle-outline"} 
  size={size} 
  color={color} 
/>
          ),
        }}
      />
    </Tabs>
  );
}