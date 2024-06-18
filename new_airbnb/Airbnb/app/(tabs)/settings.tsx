import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EvilIcons } from '@expo/vector-icons';


export default function Settings({ navigation }: any) {
  const [search, setSearch] = useState<string>('');

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Settings..."
            placeholderTextColor="#999"
            onChangeText={(text: string) => setSearch(text)}
            value={search}
          />
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.option} onPress={navigateToProfile}>
            <EvilIcons name="user" size={26} color="black" />
            <Text style={[styles.optionText, styles.monospaced]}>Profile Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={[styles.optionText, styles.monospaced]}>Notification Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <Text style={[styles.optionText, styles.monospaced]}>Privacy Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="color-palette-outline" size={24} color="black" />
            <Text style={[styles.optionText, styles.monospaced]}>Appearance Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="language-outline" size={24} color="black" />
            <Text style={[styles.optionText, styles.monospaced]}>Language Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="information-circle-outline" size={24} color="black" />
            <Text style={[styles.optionText, styles.monospaced]}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'mon-b',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  monospaced: {
    fontFamily: 'mon',
  },
});
