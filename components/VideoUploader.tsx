import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Upload, Video, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video as ExpoVideo } from 'expo-av';
import { useState } from 'react';

interface VideoFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

interface VideoUploaderProps {
  onVideoSelected?: (video: VideoFile) => void;
  onUploadComplete?: (videoData: any) => void;
}

export default function VideoUploader({ onVideoSelected, onUploadComplete }: VideoUploaderProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to upload videos!'
      );
      return false;
    }
    return true;
  };

  const pickVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.8,
        videoMaxDuration: 300, // 5 minutes max
      });

      if (!result.canceled && result.assets[0]) {
        const video = result.assets[0];
        const videoFile: VideoFile = {
          uri: video.uri,
          name: video.fileName || `video_${Date.now()}.mp4`,
          type: 'video/mp4',
          size: video.fileSize,
        };
        
        setSelectedVideo(videoFile);
        onVideoSelected?.(videoFile);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video');
      console.error('Video picker error:', error);
    }
  };

  const recordVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.8,
        videoMaxDuration: 300, // 5 minutes max
      });

      if (!result.canceled && result.assets[0]) {
        const video = result.assets[0];
        const videoFile: VideoFile = {
          uri: video.uri,
          name: video.fileName || `recorded_${Date.now()}.mp4`,
          type: 'video/mp4',
          size: video.fileSize,
        };
        
        setSelectedVideo(videoFile);
        onVideoSelected?.(videoFile);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to record video');
      console.error('Video recording error:', error);
    }
  };

  const uploadVideo = async () => {
    if (!selectedVideo) return;

    setIsUploading(true);
    try {
      // Here you would implement your actual upload logic
      // This could be to your backend server, cloud storage, etc.
      
      // Simulated upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create video data object
      const videoData = {
        id: Date.now().toString(),
        title: selectedVideo.name.replace(/\.[^/.]+$/, ""), // Remove extension
        thumbnail: selectedVideo.uri, // In real app, you'd generate a thumbnail
        duration: '0:00', // You'd get actual duration from video metadata
        views: '0',
        likes: '0',
        creator: 'You',
        uri: selectedVideo.uri,
      };

      onUploadComplete?.(videoData);
      Alert.alert('Success', 'Video uploaded successfully!');
      setSelectedVideo(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload video');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <View style={styles.container}>
      {!selectedVideo ? (
        <View style={styles.uploadOptions}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickVideo}>
            <Upload size={24} color="#8B5CF6" />
            <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.uploadButton} onPress={recordVideo}>
            <Video size={24} color="#8B5CF6" />
            <Text style={styles.uploadButtonText}>Record New Video</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.selectedVideo}>
          <View style={styles.videoPreview}>
            <ExpoVideo
              source={{ uri: selectedVideo.uri }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              shouldPlay={false}
            />
            <TouchableOpacity style={styles.removeButton} onPress={removeVideo}>
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.videoInfo}>
            <Text style={styles.videoName}>{selectedVideo.name}</Text>
            {selectedVideo.size && (
              <Text style={styles.videoSize}>
                {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
              </Text>
            )}
          </View>
          
          <TouchableOpacity
            style={[styles.uploadFinalButton, isUploading && styles.uploadingButton]}
            onPress={uploadVideo}
            disabled={isUploading}
          >
            <Text style={styles.uploadFinalButtonText}>
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 20,
    margin: 20,
  },
  uploadOptions: {
    gap: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B5563',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  selectedVideo: {
    gap: 16,
  },
  videoPreview: {
    position: 'relative',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1F2937',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoInfo: {
    alignItems: 'center',
  },
  videoName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  videoSize: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginTop: 4,
  },
  uploadFinalButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  uploadingButton: {
    backgroundColor: '#6B7280',
  },
  uploadFinalButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});