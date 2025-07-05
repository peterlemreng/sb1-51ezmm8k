import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

interface VideoPlayerProps {
  uri: string;
  thumbnail?: string;
  title?: string;
  duration?: string;
}

export default function VideoPlayer({ uri, thumbnail, title, duration }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={toggleControls}
        activeOpacity={0.9}
      >
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoText}>Video Player</Text>
          <Text style={styles.videoUri}>{uri}</Text>
        </View>
        
        {showControls && (
          <View style={styles.controlsOverlay}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={togglePlayPause}
            >
              {isPlaying ? (
                <Pause size={32} color="#FFFFFF" fill="#FFFFFF" />
              ) : (
                <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
              )}
            </TouchableOpacity>
            
            <View style={styles.bottomControls}>
              <View style={styles.leftControls}>
                <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
                  {isMuted ? (
                    <VolumeX size={20} color="#FFFFFF" />
                  ) : (
                    <Volume2 size={20} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
                {duration && (
                  <Text style={styles.durationText}>{duration}</Text>
                )}
              </View>
              
              <TouchableOpacity style={styles.controlButton}>
                <Maximize size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
      
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 220,
    backgroundColor: '#000000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  videoUri: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  controlButton: {
    padding: 8,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginTop: 12,
  },
});