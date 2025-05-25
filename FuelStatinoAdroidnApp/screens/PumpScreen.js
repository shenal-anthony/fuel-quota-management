import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PumpScreen({ route, navigation }) {
  const { licensePlate } = route.params; // Expecting licensePlate from QR code
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [liters, setLiters] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch vehicle info on component mount
  useEffect(() => {
    fetchVehicleInfo();
  }, []);

  const fetchVehicleInfo = async () => {
    try {
      setLoading(true);
      console.log(`Fetching vehicle info for license plate: ${licensePlate}`);
      
      const response = await fetch('http://192.168.8.100:8080/api/fuel/vehicle-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ licensePlate }),
      });

      console.log(`Response status: ${response.status}`);
      if (!response.ok) throw new Error('Vehicle not found');

      const data = await response.json();
      setVehicleInfo(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePumpFuel = async () => {
    if (!liters) {
      Alert.alert('Input Error', 'Please enter the number of liters pumped.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://192.168.8.100:8080/api/fuel/pump', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licensePlate: licensePlate,
          pumpedLiters: parseFloat(liters),
          stationId: 1, // Adjust as necessary
        }),
      });

      const result = await response.text();
      if (!response.ok) throw new Error(result);

      Alert.alert('Success', result);
      navigation.popToTop();
    } catch (error) {
      Alert.alert('Pump Failed', error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading && !vehicleInfo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7293b2" />
        <Text style={styles.loadingText}>Loading vehicle information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.heading}>Vehicle Details</Text>
      </View>
      
      {vehicleInfo && (
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>License Plate:</Text>
            <Text style={styles.detailValue}>{vehicleInfo.licensePlate}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vehicle Type:</Text>
            <Text style={styles.detailValue}>{vehicleInfo.vehicleType}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fuel Type:</Text>
            <Text style={styles.detailValue}>{vehicleInfo.fuelType}</Text>
          </View>
          
          <View style={styles.quotaSection}>
            <Text style={styles.quotaTitle}>Fuel Quota</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Quota Limit:</Text>
              <Text style={styles.detailValue}>{vehicleInfo.quotaLimit} L</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Balance:</Text>
              <Text style={[styles.detailValue, styles.balanceText]}>{vehicleInfo.balance} L</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Last Reset:</Text>
              <Text style={styles.detailValue}>{vehicleInfo.lastReset}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.pumpCard}>
        <Text style={styles.pumpTitle}>Dispense Fuel</Text>
        <TextInput
          placeholder="Enter Liters to Pump"
          keyboardType="numeric"
          value={liters}
          onChangeText={setLiters}
          style={styles.input}
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.disabledButton]} 
          onPress={handlePumpFuel} 
          disabled={loading}
        >
          <LinearGradient
            colors={loading ? ['#cccccc', '#aaaaaa'] : ['#7293b2', '#5d7d9a']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Processing...' : 'Pump Fuel'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f2f3f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#34495e',
    marginTop: 10,
  },
  headerSection: {
    backgroundColor: '#34495e',
    padding: 20,
    alignItems: 'center',
  },
  heading: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white',
  },
  detailsCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: 'bold',
  },
  balanceText: {
    color: '#8a9a6d',
  },
  quotaSection: {
    marginTop: 15,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
  },
  quotaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  pumpCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pumpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 5,
  },
  disabledButton: {
    opacity: 0.7,
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
});
