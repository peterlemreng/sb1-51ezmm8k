import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Play, Eye, ThumbsUp, Share2 } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const videos = [
  {
    id: '1',
    title: 'Funny Cat Compilation',
    thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '5:23',
    views: '2.3M',
    likes: '124K',
    creator: 'PetComedy',
  },
  {
    id: '2',
    title: 'Epic Dance Fails',
    thumbnail: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '8:45',
    views: '1.8M',
    likes: '89K',
    creator: 'DanceFails',
  },
  {
    id: '3',
    title: 'Pranks Gone Wrong',
    thumbnail: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '12:15',
    views: '3.1M',
    likes: '201K',
    creator: 'PrankMasters',
  },
  {
    id: '4',
    title: 'Dogs Being Silly',
    thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '6:32',
    views: '1.5M',
    likes: '78K',
    creator: 'DoggoFun',
  },
  {
    id: '5',
    title: 'Kid Says What?',
    thumbnail: 'https://images.pexels.com/photos/1912902/pexels-photo-1912902.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '4:18',
    views: '890K',
    likes: '45K',
    creator: 'KidsComedy',
  },
  {
    id: '6',
    title: 'Street Performance Fails',
    thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '9:27',
    views: '2.7M',
    likes: '156K',
    creator: 'StreetShow',
  },
];

export default function VideosScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderVideoCard = (video: any) => (
    <TouchableOpacity key={video.id} style={styles.videoCard}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{video.title}</Text>
        <Text style={styles.videoCreator}>{video.creator}</Text>
        <View style={styles.videoStats}>
          <View style={styles.statItem}>
            <Eye size={12} color="#9CA3AF" />
            <Text style={styles.statText}>{video.views}</Text>
          </View>
          <View style={styles.statItem}>
            <ThumbsUp size={12} color="#9CA3AF" />
            <Text style={styles.statText}>{video.likes}</Text>
          </View>
          <TouchableOpacity style={styles.statItem}>
            <Share2 size={12} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
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
          <Text style={styles.headerTitle}>Funny Videos</Text>
          <Text style={styles.headerSubtitle}>Laugh out loud!</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search videos..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView
          style={styles.videoList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.videoListContent}
        >
          {filteredVideos.map(renderVideoCard)}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  videoList: {
    flex: 1,
  },
  videoListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  videoCard: {
    backgroundColor: '#374151',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 200,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  videoCreator: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 12,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
});