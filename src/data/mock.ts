import type { Challenge, Journey, LeaderboardEntry } from '../domain/models';

export const journeys: Journey[] = [
  { id: 'dubai-marina', title: 'Dubai Marina Loop', subtitle: 'Skylines, sea air & city lights', city: 'Dubai, UAE', distanceKm: 12.4, completedKm: 7.8, rewardXp: 1200, color: '#FF6B45', difficulty: 'Moderate', route: [{latitude:25.075,longitude:55.13},{latitude:25.083,longitude:55.142},{latitude:25.09,longitude:55.135},{latitude:25.085,longitude:55.124},{latitude:25.075,longitude:55.13}], checkpoints: [{id:'marina','name':'Marina Walk','distanceKm':3.2,'kind':'landmark'},{id:'ain','name':'Ain Dubai View','distanceKm':8.6,'kind':'checkpoint'},{id:'harbour','name':'Dubai Harbour','distanceKm':11.2,'kind':'landmark'}] },
  { id: 'london-paris', title: 'London to Paris', subtitle: 'A legendary cross-channel adventure', city: 'United Kingdom → France', distanceKm: 470, completedKm: 46, rewardXp: 8500, color: '#4DDBE8', difficulty: 'Epic', route: [{latitude:51.507,longitude:-.128},{latitude:51.13,longitude:.9},{latitude:50.95,longitude:1.85},{latitude:49.7,longitude:2.1},{latitude:48.857,longitude:2.352}], checkpoints: [{id:'kent','name':'Kent Downs','distanceKm':82,'kind':'landmark'},{id:'calais','name':'Calais','distanceKm':164,'kind':'checkpoint'},{id:'amiens','name':'Amiens','distanceKm':328,'kind':'landmark'}] },
  { id: 'central-park', title: 'Central Park Explorer', subtitle: 'Discover New York’s green heart', city: 'New York, USA', distanceKm: 9.8, completedKm: 0, rewardXp: 900, color: '#B7F36B', difficulty: 'Easy', route: [{latitude:40.768,longitude:-73.981},{latitude:40.785,longitude:-73.969},{latitude:40.8,longitude:-73.958},{latitude:40.789,longitude:-73.955},{latitude:40.768,longitude:-73.981}], checkpoints: [{id:'lake','name':'The Lake','distanceKm':2.4,'kind':'landmark'},{id:'reservoir','name':'Reservoir','distanceKm':5.6,'kind':'checkpoint'}] },
];

export const challenges: Challenge[] = [
  { id:'august-50', title:'August 50K', description:'Move 50 km before the month ends.', target:50, progress:34.6, unit:'km', endsIn:'2 days', participants:18420, rewardXp:1500, color:'#FF6B45' },
  { id:'seven-day', title:'Seven Day Spark', description:'Move every day for a full week.', target:7, progress:5, unit:'days', endsIn:'4 days', participants:7210, rewardXp:700, color:'#B7F36B' },
  { id:'explorer', title:'Landmark Hunter', description:'Reach checkpoints across any journey.', target:10, progress:6, unit:'checkpoints', endsIn:'12 days', participants:4892, rewardXp:1000, color:'#4DDBE8' },
];

export const leaderboard: LeaderboardEntry[] = [
  {id:'1',rank:1,name:'Maya Chen',initials:'MC',distanceKm:128.4,xp:12420,streak:31,verification:'verified'},
  {id:'2',rank:2,name:'Omar Khan',initials:'OK',distanceKm:119.7,xp:11880,streak:18,verification:'verified'},
  {id:'3',rank:3,name:'Sofia Rossi',initials:'SR',distanceKm:104.2,xp:10320,streak:22,verification:'verified'},
  {id:'you',rank:18,name:'Alex Morgan',initials:'AM',distanceKm:68.7,xp:6840,streak:12,isCurrentUser:true,verification:'verified'},
  {id:'19',rank:19,name:'Theo James',initials:'TJ',distanceKm:66.1,xp:6510,streak:8,verification:'verified'},
];
