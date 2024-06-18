import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';


const categories = [
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Homestels',
    icon: 'home',
  },
  {
    name: 'Hostels',
    icon: 'apartment',
  },
  {
    name: 'Campus',
    icon: 'school',
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(1);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 5, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/knust-logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>KWAME NKRUMAH UNIVERSITY OF SCIENCE & TECHNOLOGY</Text>
        </View>
        <View style={styles.actionRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity>
              <View style={styles.searchBtn}>
                <AntDesign name="search1" size={24} />
                <View>
                  <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                  <Text style={{ color: Colors.grey, fontFamily: 'mon' }}>Anywhere · Any week · Anytime</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              gap: 40,
              paddingHorizontal: 25,
            }}>
            {categories.map((item, index) => (
              <TouchableOpacity
                onPress={() => selectCategory(index)}
                key={index}
                ref={(el) => itemsRef.current[index] = el}
                style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={23}
                  color={activeIndex === index ? '#000' : Colors.grey}
                />
                <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 5,
    height: 173,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 15,
    },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontFamily: 'mon-b',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  searchBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    alignItems: 'center',
    width: 360,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 5,
    },
  },
  categoryText: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
});

export default ExploreHeader;
