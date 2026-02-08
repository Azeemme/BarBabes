import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  StatusBar
} from 'react-native';

const { width } = Dimensions.get('window');

// Reusable Input Component
const CustomInput = ({ label, width = '100%', isDropdown = false, style }) => (
  <View style={[styles.inputWrapper, { width }, style]}>
    <View style={styles.inputField}>
      <Text style={styles.inputText}>{label}</Text>
      {isDropdown && (
        <View style={styles.dropdownIcon}>
          {/* Using text strictly to avoid SVG dependency */}
          <Text style={{ color: 'white', fontSize: 12 }}>▼</Text>
        </View>
      )}
    </View>
  </View>
);

const Divider = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <View style={styles.dividerGap} />
    <View style={styles.dividerLine} />
  </View>
);

export default function SetupScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Shapes (Simplified as solid opaque circles) */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: 'https://placehold.co/32x32/png' }} 
                  style={styles.avatar} 
                />
              </View>
              <Text style={styles.userName}>Name</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              {/* Fallback for Bell Icon using an Image */}
              <Image 
                source={{ uri: 'https://img.icons8.com/ios/50/ffffff/bell.png' }} 
                style={{ width: 24, height: 24 }} 
              />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>LET’S GET</Text>
            <Text style={styles.titleText}>YOU SET UP</Text>
          </View>
          
          {/* Form Section */}
          <View style={styles.formContainer}>
            <CustomInput label="First name" />
            <CustomInput label="Last name" />

            <Divider />

            {/* Row: Age & Gender */}
            <View style={styles.row}>
              <CustomInput label="Age" width="40%" />
              <CustomInput label="Gender" width="55%" isDropdown={true} />
            </View>

            {/* Row: Height & Weight */}
            <View style={styles.row}>
              <CustomInput label="Height" width="48%" />
              <CustomInput label="Weight" width="48%" />
            </View>

            <CustomInput label="Medical Conditions" isDropdown={true} />
            <CustomInput label="Medications" isDropdown={true} />
            
            <Divider />

            {/* Solid Button (No Gradient) */}
            <TouchableOpacity style={styles.buttonContainer}>
              <View style={styles.solidButton}>
                <Text style={styles.buttonText}>Discover Your BAC Tolerance</Text>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F3B4A', // Base maroon color
  },
  // Blobs simplified to Views with opacity
  blob1: {
    position: 'absolute',
    width: 500,
    height: 500,
    left: -150,
    top: 350,
    backgroundColor: '#B4524C',
    borderRadius: 250, // Half of width/height for circle
    opacity: 0.6, 
  },
  blob2: {
    position: 'absolute',
    width: 400,
    height: 400,
    left: -100,
    top: 400,
    backgroundColor: '#FFC9C9',
    borderRadius: 200,
    opacity: 0.15,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    // fontFamily: 'Inter', // Make sure this font is linked in your project
  },
  iconButton: {
    padding: 5,
  },
  titleContainer: {
    marginBottom: 40,
  },
  titleText: {
    color: 'white',
    fontSize: 54, 
    lineHeight: 64,
    // fontFamily: 'Instrument Serif', // Make sure this font is linked
    fontWeight: '400',
    letterSpacing: 1.5,
  },
  formContainer: {
    gap: 18,
  },
  inputWrapper: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.50)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    color: 'white',
    fontSize: 16,
    // fontFamily: 'Inter',
    fontWeight: '300',
    fontStyle: 'italic',
  },
  dropdownIcon: {
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.75,
    marginVertical: 10,
  },
  dividerLine: {
    height: 4,
    width: 50,
    backgroundColor: '#E8DEF8',
    borderRadius: 2,
  },
  dividerGap: {
    width: 100, 
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  solidButton: {
    height: 50,
    backgroundColor: '#BE5C5C', // Solid color to replace gradient
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    // fontFamily: 'Inter',
    fontWeight: '600',
  },
});