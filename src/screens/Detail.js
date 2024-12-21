import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Detail = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detail Monitoring</Text>
            <View style={styles.content}>
                <Text style={styles.text}>Temperature: {item.temperature}°C</Text>
                <Text style={styles.text}>pH: {item.pH}</Text>
                <Text style={styles.text}>Salinity: {item.TDS}ppm</Text>
                <Text style={styles.text}>Timestamp: {item.timestamp}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    content: {
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
});

export default Detail;
