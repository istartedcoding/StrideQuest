import { JourneyCard } from '@/src/components/JourneyCard';
import { Chip, Header, Screen } from '@/src/components/UI';
import { journeys } from '@/src/data/mock';
import { palette } from '@/src/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const filters=['For you','Cities','Epic','Near me'] as const;
export default function JourneysScreen(){const router=useRouter(),{width}=useWindowDimensions();const [filter,setFilter]=useState<(typeof filters)[number]>('For you');const visible=journeys.filter(journey=>filter==='For you'||filter==='Cities'&&journey.difficulty!=='Epic'||filter==='Epic'&&journey.difficulty==='Epic'||filter==='Near me'&&journey.city.includes('Dubai'));return <Screen><Header eyebrow="GO SOMEWHERE" title="Explore journeys"/><Text style={styles.copy}>Turn every kilometre into a new place, landmark, and story.</Text><View style={styles.chips}>{filters.map(item=><Chip key={item} label={item} selected={filter===item} onPress={()=>setFilter(item)}/>)}</View><View style={[styles.grid,width>=760&&styles.wide]}>{visible.map(j=><JourneyCard key={j.id} journey={j} onPress={()=>router.push(`/journey/${j.id}` as never)}/>)}</View></Screen>}
const styles=StyleSheet.create({copy:{color:palette.muted,fontSize:14,lineHeight:21,maxWidth:520},chips:{flexDirection:'row',flexWrap:'wrap',gap:8,marginVertical:6},grid:{gap:14},wide:{flexDirection:'row',flexWrap:'wrap'}});
