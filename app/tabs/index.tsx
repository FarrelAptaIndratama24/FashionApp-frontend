import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock data untuk produk
const saleProducts = [
  {
    id: '1',
    name: 'Dorothy Perkins',
    description: 'Evening Dress',
    originalPrice: '15',
    salePrice: '12',
    discount: '20%',
    rating: 5,
    reviews: 10,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&auto=format',
  },
  {
    id: '2',
    name: 'Sitlly',
    description: 'Sport Dress',
    originalPrice: '22',
    salePrice: '19',
    discount: '15%',
    rating: 5,
    reviews: 10,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&auto=format',
  },
  {
    id: '3',
    name: 'Dorothy Perkins',
    description: 'Sport Dress',
    originalPrice: '14',
    salePrice: '12',
    discount: '15%',
    rating: 5,
    reviews: 8,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop&auto=format',
  },
];

const newProducts = [
  {
    id: '4',
    name: 'OVS',
    description: 'Blouse',
    price: '11',
    isNew: true,
    rating: 4.5,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'Mango Boy',
    description: 'T-Shirt',
    price: '9',
    isNew: true,
    rating: 4.0,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    name: 'Dorothy Perkins',
    description: 'Sport Dress',
    price: '15',
    isNew: true,
    rating: 4.8,
    reviews: 20,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
  },
];

// Komponen untuk menampilkan rating bintang
const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => {
  return (
    <View style={styles.ratingContainer}>
      {[...Array(5)].map((_, i) => (
        <Ionicons
          key={i}
          name="star"
          size={12}
          color={i < rating ? '#FFD700' : '#E5E7EB'}
        />
      ))}
      <Text style={styles.reviewText}>({reviews})</Text>
    </View>
  );
};

// Komponen untuk produk sale
const SaleProductCard = ({ item }: { item: any }) => {
  const handleProductPress = () => {
    // Encode product data untuk dikirim via URL params
    const productData = encodeURIComponent(JSON.stringify(item));
    router.push(`/ProductDetail?product=${productData}`);
  };

  return (
    <TouchableOpacity style={styles.saleCard} onPress={handleProductPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{item.discount}</Text>
        </View>
        <TouchableOpacity 
          style={styles.favoriteIcon}
          onPress={(e) => {
            e.stopPropagation(); // Prevent navigation when pressing favorite
          }}
        >
          <Ionicons name="heart-outline" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <StarRating rating={item.rating} reviews={item.reviews} />
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.productName}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          <Text style={styles.salePrice}>${item.salePrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Komponen untuk produk new
const NewProductCard = ({ item }: { item: any }) => {
  const handleProductPress = () => {
    // Encode product data untuk dikirim via URL params
    const productData = encodeURIComponent(JSON.stringify(item));
    router.push(`/ProductDetail?product=${productData}`);
  };

  return (
    <TouchableOpacity style={styles.newCard} onPress={handleProductPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newText}>NEW</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.favoriteIcon}
          onPress={(e) => {
            e.stopPropagation(); // Prevent navigation when pressing favorite
          }}
        >
          <Ionicons name="heart-outline" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.productName}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF4444" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop'
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Fashion{'\n'}sale</Text>
            <TouchableOpacity style={styles.checkButton}>
              <Text style={styles.checkButtonText}>Check</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sale Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Sale</Text>
              <Text style={styles.sectionSubtitle}>Super summer sale</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={saleProducts}
            renderItem={({ item }) => <SaleProductCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          />
        </View>

        {/* New Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>New</Text>
              <Text style={styles.sectionSubtitle}>You've never seen it before!</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={newProducts}
            renderItem={({ item }) => <NewProductCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Hero Banner Styles
  heroBanner: {
    height: 300,
    position: 'relative',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 50,
  },
  checkButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Section Styles
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#000000',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  viewAllText: {
    fontSize: 11,
    color: '#000000',
  },

  // Product List Styles
  horizontalList: {
    paddingHorizontal: 20,
  },

  // Sale Card Styles
  saleCard: {
    width: 148,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  productImage: {
    width: 148,
    height: 184,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  favoriteIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Product Info Styles
  productInfo: {
    gap: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  reviewText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  brandName: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4444',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },

  // New Card Styles
});