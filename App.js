import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput,FlatList} from 'react-native';
import { useEffect, useState } from 'react'

const apiURL ='https://654cc15277200d6ba8595b20.mockapi.io/Donut';
export default function Screen01() {
    const [data, setData] = useState([]);
    const [filterName, setFilterName] = useState('Donut');

    useEffect(() => {
        fetch(apiURL, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              // Xử lý lỗi
              throw new Error('Network response was not ok');
            })
            .then((data) => {
              setData(data); // Lưu trữ dữ liệu từ API vào state
            })
            .catch((error) => {
              console.error(error);
            });
        }, [])

    const renderHeader = () => {
        return (
            <View style={styles.fixedContainer}>
                <View style={styles.containerHeader}>
                    <Text style={styles.txtWelcome}>Welcome, Jala</Text>
                    <Text style={styles.txtChoice}>Choice your Best food</Text>
                </View>
                <View style={styles.containerSearch}>
                    <TextInput style={styles.inputSearchFood} placeholder="Search food" />
                    <TouchableOpacity style={styles.btnSearch}>
                        <Image style={{ width: 49, height: 47 }} source={require('./assets/btnSearch.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.filter}>
                    <TouchableOpacity style={[styles.nameFilter, filterName === 'Donut' && styles.activeFilter]}
                        onPress={() => setFilterName('Donut')}><Text>Donut</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.nameFilter, filterName === 'Pink Donut' && styles.activeFilter]}
                        onPress={() => setFilterName('Pink Donut')}><Text>Pink Donut</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.nameFilter, filterName === 'Floating' && styles.activeFilter]}
                        onPress={() => setFilterName('Floating')}><Text>Floating</Text></TouchableOpacity>
                </View>
            </View>
        );
    };
    const filteredData = filterName === 'Donut' ? data : data.filter(item => item.type === filterName);
    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={renderHeader}
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.containerDonut}>
                        <Image
                            style={styles.DonutImage}
                            source={{ uri: item.img }}
                        />
                        <View style={styles.info}>
                            <Text style={styles.DonutName}>{item.name}</Text>
                            <Text style={styles.DonutCompany}>{item.Company}</Text>
                            <Text style={styles.DonutPrice}>${item.price}</Text>
                        </View>
                        <TouchableOpacity style={styles.btnPlus}>
                            <Image style={{ width: 40, height: 40 }} source={require('./assets/btnPlus.png')}/>
                        </TouchableOpacity>
                    </View>
                )}
                numColumns={1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        left: 3,
    },
    fixedContainer: {
        backgroundColor: 'white',
        elevation: 2,
        justifyContent: 'center',
        top: 10,
        marginBottom: 10
    },
    containerHeader: {
        width: 200,
        height: 70,
    },
    txtWelcome: {
        width: 206,
        height: 35,
        fontSize: 16,
    },
    txtChoice: {
        width: 220,
        height: 35,
        fontSize: 20,
        fontWeight: '700',
    },
    containerSearch: {
        flexDirection: 'row',
        top: 20,
        height: 50,
        gap: 5,
        justifyContent: 'center',
    },
    inputSearchFood: {
        borderColor: '#C4C4C4',
        backgroundColor: 'rgba(196, 196, 196, 0.1)',
        width: 300,
        height: 46,
        borderRadius: 3,
        borderWidth: 1,
        opacity: 0.6,
    },
    btnSearch: {
        width: 49,
        height: 47,
    },
    filter: {
        flexDirection: 'row',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 20,
        alignSelf: 'center',
    },
    nameFilter: {
        width: 100,
        height: 35,
        backgroundColor: 'rgba(196, 196, 196, 0.17)',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        fontSize: 17,
        fontWeight: '700',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeFilter: {
        backgroundColor: 'yellow'
    },
    containerDonut: {
        width: '95%',
        height: 120,
        backgroundColor: 'rgba(244, 221, 221, 1)',
        borderRadius: 10,
        top: 20,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    DonutImage: {
        width: 100,
        height: 100,
        left: 5,
        borderRadius: 10,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        left: 20,
        height: 100,
    },
    DonutName: {
        fontSize: 20,
        fontWeight: '700',
    },
    DonutCompany: {
        fontSize: 15,
        fontWeight: '700',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    DonutPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: 'rgba(0, 0, 0, 1)',
    },
    btnPlus: {
        marginLeft: 'auto',
        marginTop: 'auto'
    },
});