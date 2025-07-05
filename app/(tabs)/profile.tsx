import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, CreditCard as Edit3, Play, Music, Heart, Eye, Download, Bell, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const userStats = [
  { label: 'Videos Watched', value: '1,234', icon: Play },
  { label: 'Songs Played', value: '3,567', icon: Music },
  { label: 'Favorites', value: '89', icon: Heart },
  { label: 'Watch Time', value: '24h', icon: Eye },
];

const menuItems = [
  { icon: Download, label: 'Downloads', subtitle: 'Manage offline content' },
  { icon: Bell, label: 'Notifications', subtitle: 'Customize your alerts' },
  { icon: Settings, label: 'Settings', subtitle: 'App preferences' },
  { icon: HelpCircle, label: 'Help & Support', subtitle: 'Get assistance' },
  { icon: LogOut, label: 'Sign Out', subtitle: 'Log out of your account' },
];

export default function ProfileScreen() {
  const [user] = useState({
    name: 'Alex Johnson',
    username: '@alexj',
    avatar: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400',
    memberSince: 'December 2023',
  });

  const renderStatItem = (stat: any, index: number) => (
    <View key={index} style={styles.statItem}>
      <View style={styles.statIcon}>
        <stat.icon size={20} color="#8B5CF6" />
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  const renderMenuItem = (item: any, index: number) => (
    <TouchableOpacity key={index} style={styles.menuItem}>
      <View style={styles.menuIcon}>
        <item.icon size={20} color="#9CA3AF" />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuLabel}>{item.label}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.editButton}>
                <Edit3 size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Your Activity</Text>
            <View style={styles.statsGrid}>
              {userStats.map(renderStatItem)}
            </View>
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.menuList}>
              {menuItems.map(renderMenuItem)}
            </View>
          </View>

          <View style={styles.premiumSection}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              style={styles.premiumCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.premiumContent}>
                <Text style={styles.premiumTitle}>Go Premium</Text>
                <Text style={styles.premiumSubtitle}>
                  Enjoy unlimited access to all content
                </Text>
                <TouchableOpacity style={styles.premiumButton}>
                  <Text style={styles.premiumButtonText}>Upgrade Now</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#8B5CF6',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#8B5CF6',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1F2937',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8B5CF6',
    marginBottom: 8,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: (width - 52) / 2,
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 4,
  },
  menuSection: {
    marginBottom: 32,
  },
  menuList: {
    backgroundColor: '#374151',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4B5563',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  premiumSection: {
    marginBottom: 20,
  },
  premiumCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  premiumContent: {
    alignItems: 'center',
  },
  premiumTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  premiumSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  premiumButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  premiumButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#8B5CF6',
  },
});