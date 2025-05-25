import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';

export default function ScanQRScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      console.log('Bar code with type ${type} and data ${data} has been scanned!');
      // Navigate to PumpScreen with the scanned data
      navigation.navigate('Pump', { licensePlate: data });
    }
  };

  if (!permission) return <Text>Requesting camera permission...</Text>;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>Camera Access Required</Text>
          <Text style={styles.message}>We need your permission to scan QR codes</Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <LinearGradient
              colors={['#7293b2', '#5d7d9a']} 
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Grant Permission</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan Vehicle QR Code</Text>
      </View>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea}/>
      </View>
      {scanned && (
        <View style={styles.rescanContainer}>
          <TouchableOpacity onPress={() => setScanned(false)}>
            <LinearGradient
              colors={['#7293b2', '#5d7d9a']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Tap to Scan Again</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f2f3f5', 
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
  },
  messageBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#34495e',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#34495e',
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  camera: { 
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#7293b2',
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  rescanContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    width: '50%',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});