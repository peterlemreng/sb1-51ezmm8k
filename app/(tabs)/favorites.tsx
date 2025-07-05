import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Music, Heart, Trash2, Share2 } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const favoriteVideos = [
  {
    id: '1',
    title: 'Funny Cat Compilation',
    thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '5:23',
    creator: 'PetComedy',
    type: 'video',
  },
  {
    id: '2',
    title: 'Dogs Being Silly',
    thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '6:32',
    creator: 'DoggoFun',
    type: 'video',
  },
];

const favoriteSongs = [
  {
    id: '1',
    title: 'Upbeat Summer',
    artist: 'Sunny Vibes',
    artwork: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '3:45',
    type: 'music',
  },
  {
    id: '2',
    title: 'Rock Anthem',
    artist: 'Electric Storm',
    artwork: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '3:28',
    type: 'music',
  },
  {
    id: '3',
    title: 'Chill Night',
    artist: 'Midnight Jazz',
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '4:12',
    type: 'music',
  },
];

export default function FavoritesScreen() {
  const [selectedTab, setSelectedTab] = useState<'videos' | 'music'>('videos');

  const renderVideoItem = (video: any) => (
    <TouchableOpacity key={video.id} style={styles.favoriteItem}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{video.title}</Text>
        <Text style={styles.itemSubtitle}>{video.creator}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={16} color="#EC4899" fill="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={16} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderMusicItem = (song: any) => (
    <TouchableOpacity key={song.id} style={styles.favoriteItem}>
      <View style={styles.musicArtworkContainer}>
        <Image source={{ uri: song.artwork }} style={styles.musicArtwork} />
        <TouchableOpacity style={styles.musicPlayButton}>
          <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{song.title}</Text>
        <Text style={styles.itemSubtitle}>{song.artist}</Text>
      </View>
      <View style={styles.itemActions}>
        <Text style={styles.durationText}>{song.duration}</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Heart size={16} color="#EC4899" fill="#EC4899" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={16} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Favorites</Text>
          <Text style={styles.headerSubtitle}>Your liked content</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'videos' && styles.activeTab]}
            onPress={() => setSelectedTab('videos')}
          >
            <Play size={20} color={selectedTab === 'videos' ? '#8B5CF6' : '#9CA3AF'} />
            <Text style={[styles.tabText, selectedTab === 'videos' && styles.activeTabText]}>
              Videos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'music' && styles.activeTab]}
            onPress={() => setSelectedTab('music')}
          >
            <Music size={20} color={selectedTab === 'music' ? '#8B5CF6' : '#9CA3AF'} />
            <Text style={[styles.tabText, selectedTab === 'music' && styles.activeTabText]}>
              Music
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {selectedTab === 'videos' ? (
            <>
              {favoriteVideos.length > 0 ? (
                <View style={styles.favoritesList}>
                  {favoriteVideos.map(renderVideoItem)}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Heart size={48} color="#6B7280" />
                  <Text style={styles.emptyStateTitle}>No favorite videos yet</Text>
                  <Text style={styles.emptyStateSubtitle}>
                    Like videos to see them here
                  </Text>
                </View>
              )}
            </>
          ) : (
            <>
              {favoriteSongs.length > 0 ? (
                <View style={styles.favoritesList}>
                  {favoriteSongs.map(renderMusicItem)}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Heart size={48} color="#6B7280" />
                  <Text style={styles.emptyStateTitle}>No favorite songs yet</Text>
                  <Text style={styles.emptyStateSubtitle}>
                    Like songs to see them here
                  </Text>
                </View>
              )}
            </>
          )}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#374151',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  favoritesList: {
    gap: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  thumbnailContainer: {
    position: 'relative',
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  musicArtworkContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  musicArtwork: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  musicPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  itemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
});