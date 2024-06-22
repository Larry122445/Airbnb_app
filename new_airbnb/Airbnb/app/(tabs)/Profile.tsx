import React, { useEffect, useState, useRef, forwardRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors'; // Assuming this is correctly imported
import * as ImagePicker from 'expo-image-picker';
import { Link, router } from 'expo-router'; // Import the router from expo-router
import { defaultStyles } from '@/constants/styles';

// Wrapping the Page component with forwardRef
const Page = forwardRef((props, ref) => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress); // Added safe navigation here
  const [edit, setEdit] = useState(false);

  // Ref for the TextInput
  const inputRef = useRef(null);

  // Load user data on mount and update on user change
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.emailAddresses[0]?.emailAddress); // Added safe navigation here
    }
  }, [user]);

  // Update Clerk user data
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('(modals)/settings')}>
          <Ionicons name="settings-outline" size={26} />
        </TouchableOpacity>
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {!edit && (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={24} />
                </TouchableOpacity>
              </View>
            )}
            {edit && (
              <View style={styles.editRow}>
                <TextInput
                  ref={inputRef}
                  placeholder="First Name"
                  value={firstName || ''}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ''}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt!.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && <Button title="Log Out" onPress={() => signOut()} />}
      {!isSignedIn && (
        <Link href={'/(modals)/Login'} asChild>
          <Button title="Log In" />
        </Link>
      )}
      <View style={styles.viewstyle}>
        <TouchableOpacity style={defaultStyles.btn}>
          <Ionicons name='person' size={30} style={styles.btnicon} />
          <Text style={defaultStyles.btnText}> LOG IN AS HOST</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
    alignSelf: 'center',
  },
  btnOutline: {
    backgroundColor: '#11c3c3',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  viewstyle: {
    paddingTop: 30,
    padding: 50,
  },
  btnicon: {
    position: 'absolute',
    left: 16,
    color: '#fff',
  },
});

export default Page;
