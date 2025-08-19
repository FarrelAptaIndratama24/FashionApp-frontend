import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Modal,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const ProductDetail = () => {
  const { product: productParam } = useLocalSearchParams();

let product;
try {
  product = JSON.parse(productParam as string);
} catch (error) {
  console.error('Error parsing product data:', error);
  // Default product jika parsing gagal
  product = {
    id: '1',
    name: 'H&M',
    description: 'Short dress',
    price: '19.99',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&auto=format',
    rating: 4.5,
    reviews: 10,
  };
}

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  
  const sizes = [
    { id: 'xs', label: 'XS', available: true },
    { id: 's', label: 'S', available: true },
    { id: 'm', label: 'M', available: true },
    { id: 'l', label: 'L', available: true },
    { id: 'xl', label: 'XL', available: true },
  ];
  
  const colors = [
    { id: 'black', label: 'Black', color: '#000000' },
    { id: 'white', label: 'White', color: '#FFFFFF' },
    { id: 'red', label: 'Red', color: '#FF0000' },
    { id: 'blue', label: 'Blue', color: '#0000FF' },
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <Ionicons key={i} name="star" size={16} color="#FFD700" />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <Ionicons key={i} name="star-half" size={16} color="#FFD700" />
            );
          } else {
            return (
              <Ionicons key={i} name="star-outline" size={16} color="#E5E7EB" />
            );
          }
        })}
      </View>
    );
  };

  // Bottom Sheet Modal Component
  const BottomSheetModal = ({ 
    visible, 
    onClose, 
    title, 
    children 
  }: { 
    visible: boolean; 
    onClose: () => void; 
    title: string; 
    children: React.ReactNode;
  }) => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            onPress={onClose}
            activeOpacity={1}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
            <ScrollView style={styles.modalBody}>
              {children}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // Size Selection Modal Content
  const SizeSelectionContent = () => (
    <View style={styles.selectionContent}>
      {sizes.map((size) => (
        <TouchableOpacity
          key={size.id}
          style={[
            styles.selectionItem,
            selectedSize === size.id && styles.selectedItem,
            !size.available && styles.unavailableItem,
          ]}
          onPress={() => {
            if (size.available) {
              setSelectedSize(size.id);
              setShowSizeModal(false);
            }
          }}
          disabled={!size.available}
        >
          <Text
            style={[
              styles.selectionText,
              selectedSize === size.id && styles.selectedText,
              !size.available && styles.unavailableText,
            ]}
          >
            {size.label}
          </Text>
          {selectedSize === size.id && (
            <Ionicons name="checkmark" size={24} color="#FF4444" />
          )}
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.sizeInfoButton}>
        <Text style={styles.sizeInfoButtonText}>Size info</Text>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );

  // Color Selection Modal Content
  const ColorSelectionContent = () => (
    <View style={styles.selectionContent}>
      {colors.map((color) => (
        <TouchableOpacity
          key={color.id}
          style={[
            styles.selectionItem,
            selectedColor === color.id && styles.selectedItem,
          ]}
          onPress={() => {
            setSelectedColor(color.id);
            setShowColorModal(false);
          }}
        >
          <View style={styles.colorItemContent}>
            <View 
              style={[
                styles.colorCircle, 
                { backgroundColor: color.color },
                color.color === '#FFFFFF' && styles.whiteColorBorder,
              ]} 
            />
            <Text
              style={[
                styles.selectionText,
                selectedColor === color.id && styles.selectedText,
              ]}
            >
              {color.label}
            </Text>
          </View>
          {selectedColor === color.id && (
            <Ionicons name="checkmark" size={24} color="#FF4444" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const currentPrice = product.salePrice || product.price;
  const hasDiscount = product.originalPrice && product.salePrice;
  const selectedSizeLabel = sizes.find(s => s.id === selectedSize)?.label;
  const selectedColorLabel = colors.find(c => c.id === selectedColor)?.label;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.description}</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{product.discount}</Text>
            </View>
          )}
          {product.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? "#FF4444" : "#9CA3AF"} 
            />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          {/* Brand and Rating */}
          <View style={styles.brandSection}>
            <Text style={styles.brandName}>{product.name}</Text>
            {product.rating && (
              <View style={styles.ratingSection}>
                <StarRating rating={product.rating} />
                <Text style={styles.reviewText}>({product.reviews})</Text>
              </View>
            )}
          </View>

          {/* Product Name */}
          <Text style={styles.productName}>{product.description}</Text>

          {/* Description */}
          <Text style={styles.description}>
            Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed hem. Slightly shorter sleeves.
          </Text>

          {/* Price */}
          <View style={styles.priceSection}>
            <Text style={styles.currentPrice}>${currentPrice}</Text>
            {hasDiscount && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          {/* Size Selection */}
          <TouchableOpacity 
            style={styles.selectionButton} 
            onPress={() => setShowSizeModal(true)}
          >
            <Text style={styles.selectionLabel}>Size</Text>
            <View style={styles.selectionValue}>
              <Text style={styles.selectionValueText}>
                {selectedSizeLabel || 'Select size'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Color Selection */}
          <TouchableOpacity 
            style={styles.selectionButton} 
            onPress={() => setShowColorModal(true)}
          >
            <Text style={styles.selectionLabel}>Color</Text>
            <View style={styles.selectionValue}>
              <Text style={styles.selectionValueText}>
                {selectedColorLabel || 'Select color'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            (!selectedSize || !selectedColor) && styles.disabledButton,
          ]}
          disabled={!selectedSize || !selectedColor}
        >
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>

      {/* Size Selection Modal */}
      <BottomSheetModal
        visible={showSizeModal}
        onClose={() => setShowSizeModal(false)}
        title="Select size"
      >
        <SizeSelectionContent />
      </BottomSheetModal>

      {/* Color Selection Modal */}
      <BottomSheetModal
        visible={showColorModal}
        onClose={() => setShowColorModal(false)}
        title="Select color"
      >
        <ColorSelectionContent />
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  shareButton: {
    padding: 8,
  },

  // Image Styles
  imageContainer: {
    position: 'relative',
    height: 400,
    backgroundColor: '#F9FAFB',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  newBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  newText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Product Info Styles
  productInfo: {
    padding: 20,
  },

  // Brand and Rating
  brandSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  // Product Name
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },

  // Description
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },

  // Price Section
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  originalPrice: {
    fontSize: 18,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },

  // Selection Button Styles
  selectionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectionLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  selectionValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectionValueText: {
    fontSize: 14,
    color: '#6B7280',
  },

  // Bottom Section
  bottomSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  addToCartButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.6,
  },
  modalHeader: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  modalBody: {
    flex: 1,
  },

  // Selection Content Styles
  selectionContent: {
    padding: 20,
  },
  selectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedItem: {
    backgroundColor: '#FEF2F2',
  },
  unavailableItem: {
    opacity: 0.5,
  },
  selectionText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedText: {
    color: '#FF4444',
    fontWeight: '600',
  },
  unavailableText: {
    color: '#9CA3AF',
  },

  // Color Selection Specific
  colorItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  whiteColorBorder: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  // Size Info Button
  sizeInfoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  sizeInfoButtonText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default ProductDetail;