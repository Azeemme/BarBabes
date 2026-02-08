import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import MainLayout from '../../MainLayout';
import BottomNavBar from '../../components/BottomNavBar';

const { width } = Dimensions.get('window');

// Data representing the list in the image
// 'statusColor' maps to the background circle color
const contactData = [
  { id: '1', name: 'Designated Driver', initials: 'DD', statusColor: 'rgba(226, 164, 255, 0.5)' }, // Purple
  { id: '2', name: 'Primary Contact 1', initials: 'PC', statusColor: 'transparent' },
  { id: '3', name: 'Primary Contact 2', initials: 'PC', statusColor: 'transparent' },
  { id: '4', name: 'Group Member', initials: 'GM', statusColor: 'rgba(115, 255, 136, 0.37)' }, // Green
  { id: '5', name: 'Group Member', initials: 'GM', statusColor: 'rgba(255, 192, 91, 0.5)' }, // Orange
  { id: '6', name: 'Group Member', initials: 'GM', statusColor: 'rgba(255, 192, 91, 0.5)' }, // Orange
  { id: '7', name: 'Group Member', initials: 'GM', statusColor: 'rgba(234, 23, 20, 0.3)' }, // Red
];

export default function ContactListScreen() {
  return (
    <MainLayout>
      <View style={styles.container}>
        
        {/* Page Title */}
        <Text style={styles.pageTitle}>Your Contacts</Text>

        {/* Scrollable List */}
        <ScrollView 
          contentContainerStyle={styles.listContainer} 
          showsVerticalScrollIndicator={false}
        >
          {contactData.map((contact) => (
            <ContactRow 
              key={contact.id}
              name={contact.name}
              initials={contact.initials}
              statusColor={contact.statusColor}
            />
          ))}
        </ScrollView>

      </View>
      
      {/* Fixed Bottom Bar */}
      <BottomNavBar />
    </MainLayout>
  );
}

// --- Reusable Row Component ---
const ContactRow = ({ name, initials, statusColor }) => (
  <View style={styles.rowContainer}>
    
    {/* Avatar Circle */}
    <View style={[styles.avatarCircle, { backgroundColor: statusColor }]}>
      <Text style={styles.initialsText}>{initials}</Text>
    </View>

    {/* Name */}
    <Text style={styles.nameText}>{name}</Text>

    {/* Action Icons (Right Side) */}
    <View style={styles.actionsContainer}>
      {/* Message Icon */}
      <TouchableOpacity style={styles.iconButton}>
        <Image 
          source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/speech-bubble.png' }} 
          style={styles.actionIcon} 
        />
      </TouchableOpacity>
      
      {/* Phone Icon */}
      <TouchableOpacity style={styles.iconButton}>
        <Image 
          source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/phone.png' }} 
          style={styles.actionIcon} 
        />
      </TouchableOpacity>
    </View>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pageTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: '300', // Light font weight
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 100, // Extra space for BottomNavBar
    gap: 12, // Spacing between rows
  },
  // Row Styles
  rowContainer: {
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassy background
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 15,
  },
  initialsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  nameText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Inter',
    flex: 1, // Pushes icons to the right
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});