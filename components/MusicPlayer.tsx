import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play, Pause, SkipBack, SkipForward, Heart, Share2 } from 'lucide-react-native';
import { useState } from 'react';

interface MusicPlayerProps {
  song: {
    id: string;
    title: string;
    artist: string;
    artwork: string;
    duration: string;
  };
  onTogglePlay?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function MusicPlayer({ song, onTogglePlay, onNext, onPrevious }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    onTogglePlay?.();
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.artworkContainer}>
        <Image source={{ uri: song.artwork }} style={styles.artwork} />
        <TouchableOpacity style={styles.playOverlay} onPress={handleTogglePlay}>
          {isPlaying ? (
            <Pause size={32} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.songInfo}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
        <Text style={styles.duration}>{song.duration}</Text>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={onPrevious}>
          <SkipBack size={24} color="#9CA3AF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.mainPlayButton} onPress={handleTogglePlay}>
          {isPlaying ? (
            <Pause size={28} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Play size={28} color="#FFFFFF" fill="#FFFFFF" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={onNext}>
          <SkipForward size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleToggleLike}>
          <Heart 
            size={20} 
            color={isLiked ? "#EC4899" : "#9CA3AF"} 
            fill={isLiked ? "#EC4899" : "none"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  artworkContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  artwork: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  playOverlay: {
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
  songInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  duration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
  },
  controlButton: {
    padding: 8,
  },
  mainPlayButton: {
    backgroundColor: '#8B5CF6',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
});