import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs'; 

const History = ({ route }) => {
    const { history: initialHistory } = route.params;
    const [history, setHistory] = useState(initialHistory);
    const navigation = useNavigation();

    // Fungsi untuk memformat tanggal
    const formatDate = (timestamp) => {
        const date = dayjs(timestamp);
        if (!date.isValid()) {
            return 'View'; 
        }
        return date.format('D MMMM YYYY'); 
    };

    // Fungsi untuk mengurutkan data terbaru di atas
    const sortHistory = (historyData) => {
        return historyData.sort((a, b) => b.timestamp - a.timestamp); // Mengurutkan berdasarkan timestamp, terbaru di atas
    };

    // Fungsi untuk menghapus item dari history
    const handleDelete = (itemIndex) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        const updatedHistory = history.filter((_, index) => index !== itemIndex);
                        const sortedHistory = sortHistory(updatedHistory); // Mengurutkan setelah item dihapus
                        setHistory(sortedHistory); // Update state history
                    }
                }
            ]
        );
    };

    // Menyortir history ketika pertama kali dimuat atau jika initialHistory berubah
    useEffect(() => {
        const sortedHistory = sortHistory(initialHistory); // Mengurutkan data history saat pertama kali dimuat
        setHistory(sortedHistory); // Menyimpan data yang sudah diurutkan
    }, [initialHistory]); // Efek ini hanya dijalankan saat initialHistory berubah

    return (
        <View style={styles.container}>
            {/* Header */}
            <Image source={require('../assets/Ellipse.png')} style={styles.background} />
            <Image source={require('../assets/Icon.png')} resizeMode="center" style={styles.logo} />
            <Text style={styles.headerText}>History</Text>

            {/* History List */}
            <FlatList
                contentContainerStyle={styles.listContent}
                data={history}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => navigation.navigate('Detail', { item })}
                        >
                            <Text style={styles.text}>{formatDate(item.timestamp)}</Text>
                        </TouchableOpacity>

                        {/* Tombol Hapus */}
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(index)}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
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
    headerText: {
        position: 'absolute',
        width: 200,
        height: 36,
        left: 165,
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
    listContent: {
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#F3F4F6',
        padding: 15,
        borderRadius: 10,
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#FF4D4D',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    deleteText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});

export default History;
