import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, Heart, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const songs = [
  {
    id: '1',
    title: 'Upbeat Summer',
    artist: 'Sunny Vibes',
    album: 'Feel Good Hits',
    duration: '3:45',
    artwork: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPlaying: false,
  },
  {
    id: '2',
    title: 'Chill Night',
    artist: 'Midnight Jazz',
    album: 'Smooth Sessions',
    duration: '4:12',
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPlaying: false,
  },
  {
    id: '3',
    title: 'Rock Anthem',
    artist: 'Electric Storm',
    album: 'Power Chords',
    duration: '3:28',
    artwork: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPlaying: true,
  },
  {
    id: '4',
    title: 'Acoustic Dreams',
    artist: 'Gentle Strings',
    album: 'Unplugged',
    duration: '5:03',
    artwork: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPlaying: false,
  },
  {
    id: '5',
    title: 'Electronic Pulse',
    artist: 'Digital Waves',
    album: 'Synthetic',
    duration: '4:37',
    artwork: 'https://images.pexels.com/photos/1840608/pexels-photo-1840608.jpeg?auto=compress&cs=tinysrgb&w=400',
    isPlaying: false,
  },
];

const playlists = [
  {
    id: '1',
    name: 'My Favorites',
    songCount: 24,
    artwork: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '2',
    name: 'Workout Mix',
    songCount: 18,
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '3',
    name: 'Study Vibes',
    songCount: 32,
    artwork: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export default function MusicScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSong, setCurrentSong] = useState(songs[2]);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSongItem = (song: any) => (
    <TouchableOpacity key={song.id} style={styles.songItem}>
      <Image source={{ uri: song.artwork }} style={styles.songArtwork} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.songArtist}>{song.artist}</Text>
      </View>
      <View style={styles.songActions}>
        <Text style={styles.songDuration}>{song.duration}</Text>
        <TouchableOpacity style={styles.playButton}>
          {song.isPlaying ? (
            <Pause size={16} color="#8B5CF6" fill="#8B5CF6" />
          ) : (
            <Play size={16} color="#9CA3AF" fill="#9CA3AF" />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <MoreHorizontal size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderPlaylistItem = (playlist: any) => (
    <TouchableOpacity key={playlist.id} style={styles.playlistItem}>
      <Image source={{ uri: playlist.artwork }} style={styles.playlistArtwork} />
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName}>{playlist.name}</Text>
        <Text style={styles.playlistSongs}>{playlist.songCount} songs</Text>
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
          <Text style={styles.headerTitle}>Music</Text>
          <Text style={styles.headerSubtitle}>Your soundtrack</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search music..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Playlists</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.playlistsContainer}
            >
              {playlists.map(renderPlaylistItem)}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Songs</Text>
            <View style={styles.songsList}>
              {filteredSongs.map(renderSongItem)}
            </View>
          </View>
        </ScrollView>

        <View style={styles.nowPlaying}>
          <View style={styles.nowPlayingInfo}>
            <Image source={{ uri: currentSong.artwork }} style={styles.nowPlayingArtwork} />
            <View style={styles.nowPlayingText}>
              <Text style={styles.nowPlayingTitle}>{currentSong.title}</Text>
              <Text style={styles.nowPlayingArtist}>{currentSong.artist}</Text>
            </View>
          </View>
          <View style={styles.nowPlayingControls}>
            <TouchableOpacity>
              <Heart size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <SkipBack size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playPauseButton}>
              <Pause size={24} color="#FFFFFF" fill="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <SkipForward size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Volume2 size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  playlistsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  playlistItem: {
    width: 140,
    marginRight: 8,
  },
  playlistArtwork: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  playlistInfo: {
    alignItems: 'center',
  },
  playlistName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  playlistSongs: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  songsList: {
    paddingHorizontal: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  songArtwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  songArtist: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  songDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  playButton: {
    padding: 4,
  },
  nowPlaying: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nowPlayingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nowPlayingArtwork: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  nowPlayingText: {
    flex: 1,
  },
  nowPlayingTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  nowPlayingArtist: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  nowPlayingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playPauseButton: {
    backgroundColor: '#8B5CF6',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});