import { Button, Card, Header, Screen, SectionTitle } from '@/src/components/UI';
import { palette } from '@/src/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

const rows = [
  ['⌖','Privacy & location','Approximate city visible','privacy'],
  ['♡','Health integrations','Apple Health · Health Connect','integrations'],
  ['⌁','Devices','Treadmills, watches & sensors','integrations'],
  ['♟','Activity history','Recorded and imported sessions','history'],
  ['◉','Notifications','Challenges, streaks & friends','notifications'],
  ['⇩','Export your data','Download your StrideQuest data','privacy'],
  ['×','Delete account','Privacy-safe account removal','privacy'],
] as const;

export default function SettingsScreen(){
  const router=useRouter();
  const [publicRanks,setPublicRanks]=useState(true);
  const [livePresence,setLivePresence]=useState(false);
  return <Screen><Header eyebrow="YOUR CONTROL" title="Settings"/>
    <SectionTitle title="Privacy quick controls"/>
    <Card>
      <View style={styles.toggle}><View style={styles.copy}><Text style={styles.title}>Appear on public leaderboards</Text><Text style={styles.sub}>Shows profile and city, never precise location</Text></View><Switch value={publicRanks} onValueChange={setPublicRanks} trackColor={{true:palette.lime}} accessibilityLabel="Appear on public leaderboards"/></View>
      <View style={styles.toggle}><View style={styles.copy}><Text style={styles.title}>Live participant presence</Text><Text style={styles.sub}>Share a privacy-safe virtual route position</Text></View><Switch value={livePresence} onValueChange={setLivePresence} trackColor={{true:palette.lime}} accessibilityLabel="Live participant presence"/></View>
    </Card>
    <SectionTitle title="Account & connections"/>
    {rows.map(([icon,title,sub,slug])=><Pressable key={title} accessibilityRole="button" onPress={()=>router.push(`/feature/${slug}` as never)} style={({pressed})=>[styles.row,pressed&&{opacity:.65}]}><Text style={styles.icon}>{icon}</Text><View style={styles.copy}><Text style={styles.title}>{title}</Text><Text style={styles.sub}>{sub}</Text></View><Text style={styles.arrow}>›</Text></Pressable>)}
    <Button title="Preview sign-in & onboarding" variant="secondary" onPress={()=>router.push('/onboarding')}/><Text style={styles.version}>StrideQuest MVP · Demo data · v1.0.0</Text>
  </Screen>;
}
const styles=StyleSheet.create({toggle:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:14,paddingVertical:12,borderBottomWidth:1,borderBottomColor:palette.line},copy:{flex:1},title:{color:palette.text,fontWeight:'800',fontSize:14},sub:{color:palette.muted,fontSize:10,marginTop:4,maxWidth:320},row:{flexDirection:'row',alignItems:'center',gap:14,minHeight:68,borderBottomWidth:1,borderBottomColor:palette.line},icon:{color:palette.accent,fontSize:22,width:30,textAlign:'center'},arrow:{color:palette.muted,fontSize:28},version:{color:palette.muted,fontSize:10,textAlign:'center',marginVertical:20}});
