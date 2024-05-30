import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import ExploreHeader from '@/components/ExploreHeader';
import Listings from "@/components/Listings";
export default function Index() {
  return (
    <View style={{flex:1}}>
      <Stack.Screen
       options={{
        header:()=> <ExploreHeader onCategoryChanged={function (category: string): void {
           throw new Error("Function not implemented.");
         } }/>
      }}/>
      <Listings/>
    </View>
  );
}
