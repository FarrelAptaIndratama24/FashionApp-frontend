import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Gunakan React.FC untuk mendefinisikan komponen dengan TypeScript
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Tombol back */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Judul */}
      <Text style={styles.title}>Login</Text>

      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Input Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Link Lupa Password */}
      <Link href="/forgot-password" style={styles.forgotText}>
        Forgot your password? →
      </Link>

      {/* Tombol Login */}
      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    // TODO: di sini bisa ditambah validasi ke server / API auth
    if (email && password) {
      router.replace("/tabs"); // pindah ke halaman tabs setelah login
    } else {
      alert("Email dan password wajib diisi!");
    }
  }}
>
  <Text style={styles.buttonText}>LOGIN</Text>
</TouchableOpacity>

      {/* Login Sosial */}
      <Text style={styles.socialText}>Or login with social account</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/images/google.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/images/facebook.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 100 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  forgotText: { alignSelf: 'flex-end', color: '#FF3B30', marginBottom: 20 },
  button: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 25, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  socialText: { textAlign: 'center', marginBottom: 10 },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', columnGap: 20, marginTop: 100 },
  socialButton: {  
    backgroundColor: '#fff',  
    padding: 15,  
    borderRadius: 20,
    width: 100, 
    justifyContent: 'center',
    alignItems: 'center', 

    // Shadow untuk iOS
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.2,  
    shadowRadius: 4,  

    // Shadow untuk Android
    elevation: 3,  
  },
  icon: { width: 30, height: 30 },
});

