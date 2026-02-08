import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MainLayout from '../../MainLayout';
import BottomNavBar from '../../components/BottomNavBar';
import { useUser } from '../../context/UserContext';

const { width } = Dimensions.get('window');

function memberToContact(m) {
  const name = m.name || [m.first_name, m.last_name].filter(Boolean).join(' ') || 'Unknown';
  const initials = (m.first_name?.[0] || '') + (m.last_name?.[0] || '') || name.slice(0, 2).toUpperCase() || '?';
  return { id: m.user_id, name, initials, statusColor: 'rgba(255, 255, 255, 0.15)' };
}

export default function ContactListScreen() {
  const { groupId, groupMembers, refreshGroupMembers } = useUser();

  useEffect(() => {
    if (groupId && refreshGroupMembers) refreshGroupMembers();
  }, [groupId]);

  const contacts = (groupMembers || []).map(memberToContact);

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Your Group</Text>
        <ScrollView 
          contentContainerStyle={styles.listContainer} 
          showsVerticalScrollIndicator={false}
        >
          {contacts.length === 0 ? (
            <Text style={styles.emptyText}>No group members yet. Join or create a group to see contacts here.</Text>
          ) : (
            contacts.map((contact) => (
              <ContactRow 
                key={contact.id}
                name={contact.name}
                initials={contact.initials}
                statusColor={contact.statusColor}
              />
            ))
          )}
        </ScrollView>
      </View>
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
      <TouchableOpacity style={styles.iconButton}>
        <Text style={{ fontSize: 18 }}>💬</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Text style={{ fontSize: 18 }}>📞</Text>
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
    paddingBottom: 100,
    gap: 12,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
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