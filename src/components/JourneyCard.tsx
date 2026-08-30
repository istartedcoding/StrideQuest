import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Journey } from '../domain/models';
import { palette, radius } from '../theme';
import { Progress } from './UI';

export function JourneyCard({ journey, onPress }: { journey: Journey; onPress?: () => void }) {
 const progress=journey.completedKm/journey.distanceKm;
 return <Pressable accessibilityRole="button" accessibilityLabel={`${journey.title}, ${Math.round(progress*100)} percent complete`} onPress={onPress} style={({pressed})=>[styles.card,pressed&&{opacity:.8}]}><View style={[styles.art,{backgroundColor:`${journey.color}22`}]}><Text style={styles.artIcon}>⌁</Text><View style={[styles.line,{backgroundColor:journey.color}]}/></View><View style={styles.body}><View style={styles.row}><Text style={styles.title}>{journey.title}</Text><Text style={[styles.difficulty,{color:journey.color}]}>{journey.difficulty}</Text></View><Text style={styles.subtitle}>{journey.subtitle}</Text><View style={styles.row}><Text style={styles.progress}>{journey.completedKm.toFixed(1)} / {journey.distanceKm} km</Text><Text style={styles.progress}>{Math.round(progress*100)}%</Text></View><Progress value={progress} color={journey.color}/></View></Pressable>;
}
const styles=StyleSheet.create({card:{backgroundColor:palette.surface,borderRadius:radius.lg,borderWidth:1,borderColor:palette.line,overflow:'hidden',minWidth:270,flex:1},art:{height:95,alignItems:'center',justifyContent:'center',overflow:'hidden'},artIcon:{fontSize:56,color:palette.muted,transform:[{rotate:'-15deg'}]},line:{height:5,width:'62%',borderRadius:5,transform:[{rotate:'-12deg'}]},body:{padding:16,gap:10},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:10},title:{color:palette.text,fontSize:17,fontWeight:'800',flex:1},difficulty:{fontSize:10,fontWeight:'900',textTransform:'uppercase'},subtitle:{color:palette.muted,fontSize:12},progress:{color:palette.muted,fontSize:11,fontWeight:'700'}});
