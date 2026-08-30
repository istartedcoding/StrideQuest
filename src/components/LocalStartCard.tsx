import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { requestLocalArea } from '../services/localArea';
import { useApp } from '../state/AppContext';
import { palette } from '../theme';
import { Button, Card } from './UI';

export function LocalStartCard() {
  const { homeArea, setHomeArea } = useApp();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string>();

  const locate = async () => {
    setPending(true);
    setMessage(undefined);
    try {
      const result = await requestLocalArea();
      if (result.status === 'denied') {
        setMessage('Location permission was not granted. You can enable it in device or browser settings.');
        return;
      }
      setHomeArea(result.area);
      setMessage('Private home start updated.');
    } catch {
      setMessage('Your local area could not be detected. Check location services and try again.');
    } finally {
      setPending(false);
    }
  };

  return <Card style={styles.card}>
    <View style={styles.pin}><Text style={styles.pinText}>⌂</Text></View>
    <View style={styles.copy}>
      <Text style={styles.eyebrow}>PRIVATE LOCAL START</Text>
      <Text style={styles.title}>{homeArea?.label ?? 'Start from your home area'}</Text>
      <Text style={styles.description}>{homeArea ? 'Your approximate area marks the start of every virtual journey.' : 'Allow foreground location once to place a privacy-safe home marker on your map.'}</Text>
      {message ? <Text accessibilityLiveRegion="polite" style={[styles.message, message.includes('not') || message.includes('could') ? styles.error : null]}>{message}</Text> : null}
    </View>
    <View style={styles.actions}>
      <Button title={pending ? 'Locating…' : homeArea ? 'Refresh area' : 'Use my location'} icon="⌖" variant={homeArea ? 'secondary' : 'primary'} onPress={pending ? undefined : locate}/>
      {homeArea ? <Button title="Remove" variant="ghost" onPress={()=>{setHomeArea(undefined);setMessage('Private home start removed.')}}/> : null}
    </View>
  </Card>;
}

const styles=StyleSheet.create({card:{flexDirection:'row',alignItems:'center',gap:14,flexWrap:'wrap'},pin:{width:50,height:50,borderRadius:25,backgroundColor:`${palette.cyan}22`,alignItems:'center',justifyContent:'center'},pinText:{color:palette.cyan,fontSize:25,fontWeight:'900'},copy:{flex:1,minWidth:210},eyebrow:{color:palette.cyan,fontSize:9,fontWeight:'900',letterSpacing:1.1},title:{color:palette.text,fontSize:16,fontWeight:'900',marginTop:4},description:{color:palette.muted,fontSize:11,lineHeight:16,marginTop:4},message:{color:palette.lime,fontSize:10,marginTop:5},error:{color:palette.warning},actions:{minWidth:156,gap:2}});
