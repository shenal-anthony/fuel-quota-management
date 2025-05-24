import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';

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
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {vehicleInfo && (
        <>
          <Text style={styles.heading}>Vehicle Details</Text>
          <Text style={styles.label}>License Plate: {vehicleInfo.licensePlate}</Text>
          <Text style={styles.label}>Vehicle Type: {vehicleInfo.vehicleType}</Text>
          <Text style={styles.label}>Fuel Type: {vehicleInfo.fuelType}</Text>
          <Text style={styles.label}>Quota Limit: {vehicleInfo.quotaLimit} L</Text>
          <Text style={styles.label}>Balance: {vehicleInfo.balance} L</Text>
          <Text style={styles.label}>Last Reset: {vehicleInfo.lastReset}</Text>
        </>
      )}

      <TextInput
        placeholder="Enter Liters Pumped"
        keyboardType="numeric"
        value={liters}
        onChangeText={setLiters}
        style={styles.input}
      />

      <Button title="Pump Fuel" onPress={handlePumpFuel} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 15,
    borderRadius: 5,
  },
});
