// Contract-derived local-only Cloudinary subset. No real credentials or uploads.
const http = require('http');
const crypto = require('crypto');
let mode='ok', uploads=0, destroyed=[];
const server=http.createServer(async(req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  const reply=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data));};
  if(path==='/__control') {mode=new URL(req.url,'http://localhost').searchParams.get('mode') || 'ok';return reply(200,{uploads,destroyed});}
  if(req.method!=='POST' || !['/upload','/destroy'].includes(path)) return reply(501,{error:{message:'Not simulated'}});
  const chunks=[];
  for await(const chunk of req) chunks.push(Buffer.from(chunk));
  const raw=Buffer.concat(chunks).toString('latin1');
  const fields={};
  for(const match of raw.matchAll(/name="([^"]+)"\r\n\r\n([^\r]*)/g)) fields[match[1]]=match[2];
  if(!fields.public_id || !fields.timestamp || fields.api_key!=='test-key') return reply(400,{error:{message:'Invalid upload fields'}});
  const signed=Object.fromEntries(Object.entries(fields).filter(([k])=>!['api_key','signature','file'].includes(k)));
  const expected=crypto.createHash('sha256').update(Object.keys(signed).sort().map(k=>`${k}=${signed[k]}`).join('&')+'test-secret').digest('hex');
  if(fields.signature!==expected) return reply(401,{error:{message:'Invalid signature'}});
  if(mode==='failure') return reply(503,{error:{message:'Injected unavailable'}});
  if(path==='/destroy') {destroyed.push(fields.public_id);return reply(200,{result:'ok'});}
  if(!raw.includes('Content-Type: image/jpeg') || !raw.includes('filename="avatar.jpg"')) return reply(400,{error:{message:'Expected normalized JPEG'}});
  uploads++;
  return reply(200,{public_id:fields.public_id,resource_type:'image',format:'jpg',secure_url:`https://res.cloudinary.com/test/image/upload/v1/${fields.public_id}.jpg`});
});
server.listen(process.env.PORT || 4500);
