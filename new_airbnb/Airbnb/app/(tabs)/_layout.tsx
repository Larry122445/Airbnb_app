import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
const _layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle:{
        fontFamily:'non-sb'
      }
    }}>
      <Tabs.Screen
      name ='index'
      options={{
        tabBarLabel :'Explore',
        tabBarIcon:({color,size}) =>
            <Ionicons name='search' color={color} size={size}/>
      }}/>

      <Tabs.Screen
            name ='wishlist'
            options={{
              tabBarLabel :'Wishlist',
              tabBarIcon:({color,size}) =>
                  <Ionicons name='heart-outline' color={color} size={size}/>
      }}/>

      <Tabs.Screen
            name ='trips'
            options={{
              tabBarLabel :'Trips',
              tabBarIcon:({color,size}) =>
                  <MaterialCommunityIcons name='airplane' color={color} size={size}/>
      }}/>
       <Tabs.Screen
            name ='inbox'
            options={{
              tabBarLabel :'Inbox',
              tabBarIcon:({color,size}) =>
                  <MaterialCommunityIcons name='message-outline' color={color} size={size}/>
      }}/>

    <Tabs.Screen
                name ='Profile'
                options={{
                  tabBarLabel :'Profile',
                  tabBarIcon:({color,size}) =>
                      <Ionicons name='person-circle-outline' color={color} size={size}/>
      }}/>
    </Tabs>
  )
}

export default _layout