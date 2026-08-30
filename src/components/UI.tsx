import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts, palette, radius, spacing } from '../theme';

export function Screen({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  const body = <View style={styles.content}>{children}</View>;
  return <SafeAreaView style={styles.safe} edges={['top']}>{scroll ? <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>{body}</ScrollView> : body}</SafeAreaView>;
}
export function Header({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return <View style={styles.header}><View style={{flex:1}}>{eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}<Text style={styles.h1}>{title}</Text></View>{action}</View>;
}
export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) { return <View style={[styles.card, style]}>{children}</View>; }
export function Button({ title, onPress, variant='primary', icon }: { title: string; onPress?: () => void; variant?: 'primary'|'secondary'|'ghost'; icon?: string }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({pressed}) => [styles.button, styles[variant], pressed && {opacity:.75}]}>{icon ? <Text style={styles.buttonIcon}>{icon}</Text> : null}<Text style={[styles.buttonText, variant === 'primary' ? {color:palette.ink}:{color:palette.text}]}>{title}</Text></Pressable>;
}
export function Progress({ value, color=palette.accent, height=8 }: { value: number; color?: string; height?: number }) {
  return <View accessibilityRole="progressbar" accessibilityValue={{min:0,max:100,now:Math.round(value*100)}} style={[styles.track,{height}]}><View style={[styles.fill,{width:`${Math.max(0,Math.min(100,value*100))}%`,backgroundColor:color}]} /></View>;
}
export function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) { return <View style={styles.metric}><Text style={[styles.metricValue, accent && {color:palette.accent}]}>{value}</Text><Text style={styles.metricLabel}>{label}</Text></View>; }
export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) { return <View style={styles.sectionTitle}><Text style={styles.h2}>{title}</Text>{action ? <Pressable onPress={onAction}><Text style={styles.link}>{action}</Text></Pressable> : null}</View>; }
export function Chip({ label, selected, onPress }: { label: string; selected?: boolean; onPress?: () => void }) { return <Pressable accessibilityRole="button" accessibilityState={{selected}} onPress={onPress} style={[styles.chip,selected&&styles.chipSelected]}><Text style={[styles.chipText,selected&&{color:palette.ink}]}>{label}</Text></Pressable>; }

const styles=StyleSheet.create({
 safe:{flex:1,backgroundColor:palette.ink},scroll:{paddingBottom:120},content:{width:'100%',maxWidth:1180,alignSelf:'center',paddingHorizontal:spacing.md,paddingTop:spacing.sm,gap:spacing.md},
 header:{flexDirection:'row',alignItems:'center',marginBottom:4},eyebrow:{color:palette.accent,fontSize:12,fontWeight:'800',letterSpacing:1.5,textTransform:'uppercase',marginBottom:4},h1:{color:palette.text,fontFamily:fonts.display,fontSize:30,fontWeight:'800',letterSpacing:-1},h2:{color:palette.text,fontSize:20,fontWeight:'800'},
 card:{backgroundColor:palette.surface,borderRadius:radius.lg,borderWidth:1,borderColor:palette.line,padding:spacing.md},button:{minHeight:52,borderRadius:radius.md,paddingHorizontal:20,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:8},primary:{backgroundColor:palette.lime},secondary:{backgroundColor:palette.elevated,borderWidth:1,borderColor:palette.line},ghost:{backgroundColor:'transparent'},buttonText:{fontSize:15,fontWeight:'800'},buttonIcon:{fontSize:18},
 track:{backgroundColor:palette.line,borderRadius:radius.pill,overflow:'hidden',width:'100%'},fill:{height:'100%',borderRadius:radius.pill},metric:{flex:1,minWidth:72},metricValue:{color:palette.text,fontSize:23,fontWeight:'800'},metricLabel:{color:palette.muted,fontSize:11,textTransform:'uppercase',letterSpacing:.6,marginTop:3},sectionTitle:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:8},link:{color:palette.accent,fontWeight:'700'},chip:{paddingHorizontal:16,paddingVertical:10,borderRadius:radius.pill,backgroundColor:palette.elevated,borderWidth:1,borderColor:palette.line},chipSelected:{backgroundColor:palette.lime,borderColor:palette.lime},chipText:{color:palette.muted,fontWeight:'700'},
});
