import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import VideoUploader from '@/components/VideoUploader';
import { useState } from 'react';

export default function UploadScreen() {
  const [uploadedVideos, setUploadedVideos] = useState<any[]>([]);

  const handleVideoSelected = (video: any) => {
    console.log('Video selected:', video);
  };

  const handleUploadComplete = (videoData: any) => {
    setUploadedVideos(prev => [videoData, ...prev]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upload Video</Text>
          <Text style={styles.headerSubtitle}>Share your funny moments</Text>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <VideoUploader
            onVideoSelected={handleVideoSelected}
            onUploadComplete={handleUploadComplete}
          />

          {uploadedVideos.length > 0 && (
            <View style={styles.uploadedSection}>
              <Text style={styles.sectionTitle}>Recently Uploaded</Text>
              {uploadedVideos.map((video) => (
                <View key={video.id} style={styles.uploadedItem}>
                  <Text style={styles.uploadedTitle}>{video.title}</Text>
                  <Text style={styles.uploadedStatus}>✅ Upload Complete</Text>
                </View>
              ))}
            </View>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  uploadedSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  uploadedItem: {
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  uploadedTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  uploadedStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#10B981',
    marginTop: 4,
  },
});