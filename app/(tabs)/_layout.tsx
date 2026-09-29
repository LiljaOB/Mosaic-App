import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,

        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255,255,255,0.75)",

        tabBarStyle: {
          display: "none",
        },

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
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={26}
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

    </Tabs>
  );
}