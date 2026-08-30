import { palette } from '@/src/theme';
import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

const Icon=({symbol,color}:{symbol:string;color:string})=><Text style={[styles.icon,{color}]}>{symbol}</Text>;
export default function TabLayout(){return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:palette.lime,tabBarInactiveTintColor:palette.muted,tabBarStyle:styles.bar,tabBarLabelStyle:styles.label}}>
  <Tabs.Screen name="index" options={{title:'Home',tabBarIcon:({color})=><Icon symbol="⌂" color={color}/>}}/>
  <Tabs.Screen name="journeys" options={{title:'Explore',tabBarIcon:({color})=><Icon symbol="⌁" color={color}/>}}/>
  <Tabs.Screen name="challenges" options={{title:'Challenges',tabBarIcon:({color})=><Icon symbol="◆" color={color}/>}}/>
  <Tabs.Screen name="leaderboard" options={{title:'Ranks',tabBarIcon:({color})=><Icon symbol="≡" color={color}/>}}/>
  <Tabs.Screen name="profile" options={{title:'Profile',tabBarIcon:({color})=><Icon symbol="●" color={color}/>}}/>
</Tabs>}
const styles=StyleSheet.create({bar:{height:76,paddingTop:8,paddingBottom:10,backgroundColor:'#0A1726',borderTopColor:palette.line},label:{fontSize:10,fontWeight:'700'},icon:{fontSize:24,fontWeight:'900'}});
