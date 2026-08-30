import { LocalStartCard } from '@/src/components/LocalStartCard';
import { RouteMap } from '@/src/components/RouteMap';
import { Button, Card, Header, Metric, Progress, Screen, SectionTitle } from '@/src/components/UI';
import { challenges } from '@/src/data/mock';
import { nextCheckpoint } from '@/src/domain/engine';
import type { ActivityType } from '@/src/domain/models';
import { useApp } from '@/src/state/AppContext';
import { palette, radius } from '@/src/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

export default function HomeScreen(){
 const router=useRouter(),{width}=useWindowDimensions(),wide=width>=760;
 const {journey,startSession,session,totalDistanceKm,totalXp,homeArea}=useApp(); const [type,setType]=useState<ActivityType>('walk');
 const progress=journey.completedKm/journey.distanceKm, challenge=challenges[0];
 const next=nextCheckpoint(journey.checkpoints,journey.completedKm);
 const resumable=session.status==='active'||session.status==='paused';
 const begin=()=>{if(!resumable)startSession(type);router.push('/activity')};
 return <Screen><Header eyebrow="Sunday · 30 August" title="Ready to move, Alex?" action={<Pressable onPress={()=>router.push('/settings')} style={styles.avatar}><Text style={styles.avatarText}>AM</Text></Pressable>}/>
  <LocalStartCard/>
  <View style={[styles.hero,wide&&styles.heroWide]}><View style={styles.mapPane}><RouteMap journey={journey} progress={progress} homeAreaLabel={homeArea?.label}/></View><Card style={styles.controlPane}>
    <Text style={styles.kicker}>CURRENT JOURNEY</Text><Text style={styles.journey}>{journey.title}</Text><Text style={styles.muted}>{Math.max(0,journey.distanceKm-journey.completedKm).toFixed(1)} km to finish · next: {next?.name??'Finish line'}</Text>
   <Progress value={progress} color={journey.color} height={10}/><View style={styles.typeRow}>{(['walk','run'] as ActivityType[]).map(item=><Pressable key={item} onPress={()=>setType(item)} style={[styles.type,type===item&&styles.typeActive]}><Text style={styles.typeIcon}>{item==='walk'?'♟':'➤'}</Text><Text style={[styles.typeText,type===item&&{color:palette.ink}]}>{item==='walk'?'Walk':'Run'}</Text></Pressable>)}</View>
    <Button title={resumable?'Resume activity':`Start ${type==='walk'?'walking':'running'}`} icon="▶" onPress={begin}/>
  </Card></View>
    <View style={styles.metrics}><Metric value={`${totalDistanceKm.toFixed(1)} km`} label="Journey distance"/><Metric value="#18" label="City rank" accent/><Metric value="12 days" label="Current streak"/><Metric value={totalXp.toLocaleString()} label="Total XP"/></View>
  <SectionTitle title="Your momentum" action="View challenge" onAction={()=>router.push(`/challenge/${challenge.id}` as never)}/><View style={[styles.grid,wide&&styles.gridWide]}><Card style={styles.challenge}><View style={styles.row}><View><Text style={styles.kicker}>ENDING SOON</Text><Text style={styles.cardTitle}>{challenge.title}</Text></View><Text style={styles.fire}>◒</Text></View><Text style={styles.big}>{challenge.progress}<Text style={styles.small}> / {challenge.target} {challenge.unit}</Text></Text><Progress value={challenge.progress/challenge.target}/><Text style={styles.muted}>You’re 15.4 km from +{challenge.rewardXp.toLocaleString()} XP</Text></Card>
  <Card style={styles.challenge}><View style={styles.row}><View><Text style={styles.kicker}>RECENT ACHIEVEMENT</Text><Text style={styles.cardTitle}>City Explorer</Text></View><View style={styles.medal}><Text>★</Text></View></View><Text style={styles.muted}>You discovered 10 city landmarks.</Text><Text style={styles.reward}>+500 XP earned</Text></Card></View>
    <SectionTitle title="Up next" action="Journey details" onAction={()=>router.push(`/journey/${journey.id}` as never)}/><Card><View style={styles.row}><View style={{flex:1}}><Text style={styles.cardTitle}>{next?.name??'Journey finish'}</Text><Text style={styles.muted}>{next?.kind??'destination'} · {Math.max(0,(next?.distanceKm??journey.distanceKm)-journey.completedKm).toFixed(1)} km away</Text></View><Text style={styles.chevron}>›</Text></View></Card>
 </Screen>
}
const styles=StyleSheet.create({avatar:{width:44,height:44,borderRadius:22,backgroundColor:palette.accent,alignItems:'center',justifyContent:'center'},avatarText:{color:palette.ink,fontWeight:'900'},hero:{gap:14},heroWide:{flexDirection:'row'},mapPane:{flex:1.6,minWidth:0},controlPane:{flex:1,gap:14,justifyContent:'center'},kicker:{color:palette.accent,fontSize:10,fontWeight:'900',letterSpacing:1.2},journey:{color:palette.text,fontSize:24,fontWeight:'900'},muted:{color:palette.muted,fontSize:12,lineHeight:18},typeRow:{flexDirection:'row',gap:10},type:{flex:1,minHeight:58,borderRadius:radius.md,backgroundColor:palette.elevated,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8,borderWidth:1,borderColor:palette.line},typeActive:{backgroundColor:palette.lime,borderColor:palette.lime},typeText:{color:palette.text,fontWeight:'800'},typeIcon:{fontSize:18},metrics:{flexDirection:'row',flexWrap:'wrap',gap:16,backgroundColor:palette.surface,borderColor:palette.line,borderWidth:1,borderRadius:radius.lg,padding:18},grid:{gap:14},gridWide:{flexDirection:'row'},challenge:{flex:1,gap:13},row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12},cardTitle:{color:palette.text,fontSize:18,fontWeight:'800',marginTop:4},fire:{color:palette.accent,fontSize:34},big:{color:palette.text,fontSize:29,fontWeight:'900'},small:{fontSize:13,color:palette.muted},medal:{width:50,height:50,borderRadius:25,backgroundColor:palette.warning,alignItems:'center',justifyContent:'center'},reward:{color:palette.lime,fontWeight:'800'},chevron:{color:palette.muted,fontSize:32}});
