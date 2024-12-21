import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { Firestore_DB } from '../../config/firebase';
import dayjs from 'dayjs';

const { width } = Dimensions.get('window');

const Dashboard = () => {
    const navigation = useNavigation();
    const [temperature, setTemperature] = useState(0);
    const [pH, setPH] = useState(0);
    const [salinity, setSalinity] = useState(0);
    const [history, setHistory] = useState([]);

    const checkThresholds = (temp, ph, sal) => {
        let warnings = [];

        if (ph < 6.0 || ph > 8.0) {
            warnings.push("Nilai pH berada di luar kisaran aman!");
        }

        if (temp > 31) {
            warnings.push("Suhu melebihi tingkat aman!");
        }

        if (sal > 33) {
            warnings.push("Salinitas melebihi batas aman!");
        }

        if (warnings.length === 0) {
            Alert.alert("Informasi”, “Kualitas air dalam batas aman!");
        } else {
            warnings.forEach((message) => Alert.alert("Peringatan", message));
        }
    };

    useEffect(() => {
        const documentRef = doc(Firestore_DB, 'waterQuality', 'data');

        const unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                const temp = data.temperature || 0;
                const ph = data.pH || 0;
                const sal = data.TDS || 0;

                setTemperature(temp);
                setPH(ph);
                setSalinity(sal);

                const timestamp = dayjs().format('DD/MM/YYYY HH:mm:ss');
                setHistory((prevHistory) => [
                    ...prevHistory,
                    { temperature: temp, pH: ph, TDS: sal, timestamp },
                ]);

                checkThresholds(temp, ph, sal);
            } else {
                console.log("No document found!");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Ellipse.png')} style={styles.background} />
            <Image source={require('../assets/Icon.png')} resizeMode='center' style={styles.logo} />
            <Text style={styles.text}>Monitoring Water</Text>
            <ScrollView style={styles.scrollView}>
                <View style={styles.parameters}>
                    <View style={styles.parameterItem}>
                        <Text style={styles.label}>Temperature</Text>
                        <Text style={styles.value}>{temperature}°C</Text>
                    </View>
                    <View style={styles.parameterItem}>
                        <Text style={styles.label}>pH</Text>
                        <Text style={styles.value}>{pH}</Text>
                    </View>
                    <View style={styles.parameterItem}>
                        <Text style={styles.label}>Salinity</Text>
                        <Text style={styles.value}>{salinity}ppm</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.historyButton}
                    onPress={() => navigation.navigate('History', { history })}
                >
                    <Text style={styles.historyButtonText}>View History</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    background: {
        flex: 1,
        position: 'absolute',
        width: 390,
        height: 80,
    },
    logo: {
        width: 50,
        height: 50,
        left: 26.5,
        top: 20,
        position: 'absolute',
    },
    text: {
        position: 'absolute',
        width: 200,
        height: 36,
        left: 130,
        top: 25,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 36,
        letterSpacing: 3,
        textAlign: 'left',
        color: '#FDCB5A',
    },
    scrollView: {
        marginTop: 100,
    },
    parameters: {
        marginTop: 100,
        paddingHorizontal: 20,
    },
    parameterItem: {
        backgroundColor: '#F3F4F6',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        color: '#555',
        marginBottom: 5,
        fontWeight: '600',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    historyButton: {
        backgroundColor: '#FDCB5A',
        padding: 15,
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    historyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Dashboard;
