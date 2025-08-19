import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter,Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
      <Text style={styles.title}>Sign up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Link href="/login" style={styles.linkText}>
        Already have an account? →
      </Link>

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
       <Text style={styles.buttonText}>SIGN UP</Text>
     </TouchableOpacity>

      <Text style={styles.socialText}>Or sign up with social account</Text>

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
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
  linkText: { color: '#FF3B30', marginBottom: 20 },
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
   backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
});
