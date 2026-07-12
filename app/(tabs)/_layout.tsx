import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";

function TabBarBackground() {
  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: "hidden",
        backgroundColor: "#123C69",
      }}
    >
      <Image
        source={require("../../assets/images/bbar.png")}
         style={{
          position: "absolute",
          left: "-8%",
          top: -10,
           width: "116%",
          height: "125%",
          resizeMode: "cover",
       }}
    />

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: true,

        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255,255,255,0.75)",

        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 54,
          paddingTop: 4,
          paddingBottom: 4,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 14,
        },

        tabBarBackground: () => <TabBarBackground />,

        tabBarItemStyle: {
        borderRadius: 14,
        marginHorizontal: 4,
        marginVertical: 0,
        transform: [{ translateY: -8 }],
      },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "900",
          marginTop: 1,
        },

        tabBarIconStyle: {
          marginTop: 1,
        },

        tabBarActiveBackgroundColor: "rgba(255,255,255,0.22)",
        tabBarInactiveBackgroundColor: "rgba(255,255,255,0.04)",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Games",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "game-controller" : "game-controller-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="hold-the-line"
        options={{
          title: "Hold",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "shield-checkmark" : "shield-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen name="meetings" options={{ href: null }} />
      <Tabs.Screen name="meditation" options={{ href: null }} />
      <Tabs.Screen name="give-me-something-to-do" options={{ href: null }} />
      <Tabs.Screen name="steps" options={{ href: null }} />
      <Tabs.Screen name="open-season" options={{ href: null }} />
    </Tabs>
  );
}