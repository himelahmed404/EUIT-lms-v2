import assert from 'node:assert/strict';
import test from 'node:test';
import { backendRequire } from './backend-runtime.mjs';
const express = backendRequire('express');
import {createVerifiedEmailMiddleware} from '../../../backend/dist/src/middleware/requireVerifiedEmail.js';

test('protected route checks missing, invalid, expired, revoked, disabled and unverified tokens', async () => {
  const app=express();
  app.get('/private', createVerifiedEmailMiddleware(async token => {
    if(token==='verified') return {uid:'test-uid',email_verified:true};
    if(token==='unverified') return {uid:'test-uid',email_verified:false};
    throw Object.assign(new Error('test'),{code:token});
  }), (req,res)=>res.json({uid:res.locals.firebaseUser.uid}));
  const server=app.listen(0,'127.0.0.1'); await new Promise(r=>server.once('listening',r));
  try {
    const url=`http://127.0.0.1:${server.address().port}/private`;
    for(const [token,status] of [[null,401],['auth/invalid-id-token',401],['auth/id-token-expired',401],['auth/id-token-revoked',401],['auth/user-disabled',401],['unverified',403],['auth/internal-error',503],['verified',200]]) {
      const res=await fetch(url,{headers:token?{Authorization:`Bearer ${token}`}:{}});
      assert.equal(res.status,status,token ?? 'missing');
      if(status===200) assert.deepEqual(await res.json(),{uid:'test-uid'});
    }
  } finally {await new Promise(r=>server.close(r));}
});
