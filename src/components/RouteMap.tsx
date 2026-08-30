import { StyleSheet, Text, View } from 'react-native';
import { clamp } from '../domain/engine';
import type { Journey } from '../domain/models';
import { palette, radius } from '../theme';

export function RouteMap({ journey, progress, compact=false, homeAreaLabel }: { journey: Journey; progress: number; compact?: boolean; homeAreaLabel?: string }) {
  const pct = clamp(progress) * 100;
  const routeHeight = pct * 0.8;
  const positionTop = 10 + routeHeight;
  return <View style={[styles.map, compact && {height:190}]} accessibilityLabel={`Map of ${journey.title}, ${Math.round(progress*100)} percent complete`}>
    <View style={[styles.grid, {top:'24%'}]} /><View style={[styles.grid, {top:'54%',transform:[{rotate:'-9deg'}]}]} /><View style={[styles.grid,{top:'78%',transform:[{rotate:'12deg'}]}]} />
    <View style={[styles.road,{left:'20%',transform:[{rotate:'66deg'}]}]} /><View style={[styles.road,{left:'68%',transform:[{rotate:'-45deg'}]}]} />
    <View style={styles.routeBase}/><View style={[styles.routeDone,{height:`${routeHeight}%`}]}/>
    <View style={[styles.position,{top:`${positionTop}%`}]}><Text style={styles.walker}>➤</Text></View>
    <View style={[styles.start,homeAreaLabel&&styles.homeStart]}><Text style={styles.dotText}>{homeAreaLabel?'⌂':'S'}</Text></View><View style={styles.finish}><Text style={styles.dotText}>★</Text></View>
    <View style={styles.badge}><Text style={styles.badgeTitle}>{journey.city}</Text><Text style={styles.badgeText}>{Math.round(progress*100)}% explored</Text></View>
    {homeAreaLabel ? <View style={styles.homeBadge}><Text style={styles.homeBadgeTitle}>⌂ HOME START · PRIVATE</Text><Text style={styles.homeBadgeText}>{homeAreaLabel}</Text></View> : null}
    <View style={styles.attribution}><Text style={styles.attributionText}>STRIDEQUEST MAP · DEMO</Text></View>
  </View>;
}
const styles=StyleSheet.create({map:{height:290,backgroundColor:'#101F30',borderRadius:radius.lg,overflow:'hidden',position:'relative',borderWidth:1,borderColor:palette.line},grid:{position:'absolute',left:'-10%',width:'120%',height:3,backgroundColor:'#1D3448'},road:{position:'absolute',top:'-25%',width:3,height:'150%',backgroundColor:'#1D3448'},routeBase:{position:'absolute',left:'49%',top:'10%',height:'80%',width:8,borderRadius:9,backgroundColor:'#415069',transform:[{rotate:'-10deg'}]},routeDone:{position:'absolute',left:'49%',top:'10%',width:8,maxHeight:'80%',borderRadius:9,backgroundColor:palette.accent,transform:[{rotate:'-10deg'}]},position:{position:'absolute',left:'45%',marginTop:20,width:38,height:38,borderRadius:19,backgroundColor:palette.lime,borderWidth:5,borderColor:'#23384A',alignItems:'center',justifyContent:'center'},walker:{fontSize:16,color:palette.ink,transform:[{rotate:'35deg'}]},start:{position:'absolute',left:'47%',top:'7%',width:26,height:26,borderRadius:13,backgroundColor:palette.cyan,alignItems:'center',justifyContent:'center'},homeStart:{backgroundColor:palette.lime},finish:{position:'absolute',left:'53%',bottom:'6%',width:30,height:30,borderRadius:15,backgroundColor:palette.accent,alignItems:'center',justifyContent:'center'},dotText:{color:palette.ink,fontWeight:'900',fontSize:11},badge:{position:'absolute',left:14,top:14,backgroundColor:'rgba(7,17,31,.88)',paddingHorizontal:13,paddingVertical:10,borderRadius:12},badgeTitle:{color:palette.text,fontWeight:'800',fontSize:12},badgeText:{color:palette.muted,fontSize:10,marginTop:2},homeBadge:{position:'absolute',left:14,bottom:14,backgroundColor:'rgba(7,17,31,.9)',paddingHorizontal:12,paddingVertical:8,borderRadius:10,maxWidth:'44%'},homeBadgeTitle:{color:palette.lime,fontSize:8,fontWeight:'900',letterSpacing:.7},homeBadgeText:{color:palette.text,fontSize:10,fontWeight:'700',marginTop:3},attribution:{position:'absolute',right:8,bottom:7},attributionText:{color:'#70839A',fontSize:7,fontWeight:'700'}});
