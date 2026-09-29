import express from 'express';
const app=express(); app.use(express.json());
const {STRAVA_CLIENT_ID,STRAVA_CLIENT_SECRET,STRAVA_REDIRECT_URI,PORT=3000}=process.env;
app.get('/auth/strava',(req,res)=>{
  const u=new URL('https://www.strava.com/oauth/authorize');
  u.searchParams.set('client_id',STRAVA_CLIENT_ID); u.searchParams.set('response_type','code');
  u.searchParams.set('redirect_uri',STRAVA_REDIRECT_URI); u.searchParams.set('approval_prompt','auto');
  u.searchParams.set('scope','activity:read_all,profile:read_all'); res.redirect(u.toString());
});
app.get('/oauth/callback',async(req,res)=>{
  const code=req.query.code; if(!code)return res.status(400).send('Missing code');
  const r=await fetch('https://www.strava.com/oauth/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:STRAVA_CLIENT_ID,client_secret:STRAVA_CLIENT_SECRET,code,grant_type:'authorization_code'})});
  const data=await r.json(); if(!r.ok)return res.status(r.status).json(data);
  // Production: persist refresh token encrypted and issue a short-lived app session. Never send client_secret to the app.
  res.json({connected:true,athlete:data.athlete,expires_at:data.expires_at,has_refresh_token:!!data.refresh_token});
});
app.get('/health',(req,res)=>res.json({ok:true}));
app.listen(PORT,()=>console.log(`Arbi Run Coach backend on ${PORT}`));
