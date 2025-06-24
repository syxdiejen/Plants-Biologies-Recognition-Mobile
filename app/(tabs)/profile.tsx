import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { User, Bell, LogOut, ChevronRight } from 'lucide-react-native';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  showChevron?: boolean;
}

function SettingsItem({ icon, title, onPress, showChevron = true }: SettingsItemProps) {
  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        {icon}
        <Text style={styles.settingsItemText}>{title}</Text>
      </View>
      {showChevron && <ChevronRight size={20} color="#94a3b8" />}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const handleLogout = () => {
    // Navigate to login screen
    router.push('../auth/login');
  };

  const handleAccount = () => {
    // Handle account settings
    console.log('Account settings');
  };

  const handleNotifications = () => {
    // Handle notifications settings
    console.log('Notifications settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Sabohiddin</Text>
              <Text style={styles.profileRole}>Digital goodies designer - Pixseliz</Text>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsSection}>
          <SettingsItem
            icon={<User size={24} color="#3b82f6" />}
            title="Account"
            onPress={handleAccount}
          />
          
          <SettingsItem
            icon={<Bell size={24} color="#ef4444" />}
            title="Notifications"
            onPress={handleNotifications}
          />
          
          <SettingsItem
            icon={<LogOut size={24} color="#ef4444" />}
            title="Log out"
            onPress={handleLogout}
            showChevron={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  settingsSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginLeft: 16,
  },
});