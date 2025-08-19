// File: app/index.tsx
import { Text, View, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang!</Text>
      <Text style={styles.subtitle}>Ini adalah halaman utama aplikasi.</Text>

      <Link href="/login" asChild>
        <Button title="Masuk ke Akun (Login)" />
      </Link>

      <View style={styles.separator} />

      <Link href="/signup" asChild>
        <Button title="Daftar Akun Baru (Signup)" />
      </Link>

      <View style={styles.separator} />

      <Link href="/forgot-password" asChild>
        <Button title="Lupa Password" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 24,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 10,
  },
});
