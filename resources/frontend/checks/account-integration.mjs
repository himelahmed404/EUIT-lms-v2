// Invoked by backend test:browser with disposable database/Auth emulator fixtures.
import assert from 'node:assert/strict';
import { checkCatalogAdmin, checkPublicCatalog } from './catalog-integration.mjs';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';
import { ROOT, frontendRequire, pages } from './check-utils.mjs';
import { getFirebaseAuth } from '../../../backend/dist/src/lib/firebase.js';
const { chromium } = frontendRequire('playwright');
assert.equal(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, 'demo-euit-profiles');
assert.ok(process.env.EUIT_API_BASE_URL?.startsWith('http://127.0.0.1:'));
const listener = createServer(); await new Promise((resolve,reject)=>{listener.once('error',reject);listener.listen(0,'127.0.0.1',resolve);});
const port = listener.address().port; await new Promise(r=>listener.close(r));
let logs = '';
const testDistDir = `.next-test-${process.pid}`;
const server = spawn(process.execPath,[frontendRequire.resolve('next/dist/bin/next'),'dev','--hostname','127.0.0.1','-p',String(port)],{cwd:ROOT,env:{...process.env,NODE_ENV:'development',EUIT_TEST_DIST_DIR:testDistDir,API_SERVER_URL:process.env.EUIT_API_BASE_URL},stdio:['ignore','pipe','pipe']});
server.stdout.on('data',b=>logs+=b);server.stderr.on('data',b=>logs+=b);
const base=`http://127.0.0.1:${port}`;
let browser;
try {
  let ready=false;for(let i=0;i<180;i++){try{if((await fetch(base,{signal:AbortSignal.timeout(1000)})).ok){ready=true;break;}}catch{}await delay(250);}
  assert.ok(ready,logs.slice(-3000));
  browser=await chromium.launch();
  const context=await browser.newContext({ reducedMotion: "reduce" });const page=await context.newPage();page.setDefaultTimeout(20000);page.setDefaultNavigationTimeout(60000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  async function login(name){
    await page.goto(base);await page.locator('#signin-email').fill(`${name}@example.test`);
    await page.locator('#signin-password').fill('Emulator-test-only-123!');
    await page.getByRole('button',{name:'Sign in',exact:true}).click();
  }
  async function uploadProfilePhoto() {
    const image = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAn0lEQVRoge2SQQkAQRDDqu981GXErYh7hIFCBKSh6cdpoht0A9ArdhfiLtENugHoFbsLcZfoBt0A9IrdhbhLdINuAHrF7kLcJbpBNwC9Ynch7hLdoBuAXrG7EHeJbtANQK/YXYi7RDfoBqBX7C7EXaIbdAPQK3YX4i7RDboB6BW7C3GX6AbdAPSK3YW4S3SDbgB6xe5C3CW6QTcAveIfHtPQsUuSNO8+AAAAAElFTkSuQmCC', 'base64');
    const response = page.waitForResponse(r=>r.url().endsWith('/api/me/photo/upload') && r.request().method()==='POST');
    await page.getByLabel('Choose profile photo').setInputFiles({name:'avatar.png',mimeType:'image/png',buffer:image});
    const result=await response;assert.equal(result.status(),201,await result.text());
    await page.getByText('Profile photo updated.',{exact:true}).waitFor();
    await page.reload();await page.getByRole('button',{name:'Remove photo',exact:true}).waitFor();
  }
  async function logout(){await page.goto(`${base}${page.url().includes('/admin')?'/admin/profile':page.url().includes('/mentor')?'/mentor/profile':'/student/profile'}`);await page.getByRole('button',{name:'Sign out',exact:true}).first().click();await page.getByRole('button',{name:'Sign in',exact:true}).waitFor();}
  if (process.env.EUIT_CATALOG_ONLY === '1') {
    await login('owner'); await page.waitForURL('**/admin/overview');
    await checkCatalogAdmin(page, base); await logout(); await checkPublicCatalog(page, base);
    assert.deepEqual(errors, []);
  } else {
  await page.goto(`${base}/student/profile`);await page.waitForURL(base+'/');
  await login('student');await page.waitForURL('**/student/dashboard');
  await page.goto(`${base}/student/profile`);await page.getByRole('heading',{name:'My profile',exact:true}).waitFor();
  if(process.env.CLOUDINARY_TEST_BASE_URL) await uploadProfilePhoto();
  await page.getByLabel('Full name',{exact:true}).fill('Browser Student');await page.getByLabel('Contact phone',{exact:true}).fill('+8801912345678');
  await page.getByRole('button',{name:'Save profile',exact:true}).click();await page.getByText('Profile saved.',{exact:true}).waitFor();
  await page.getByRole('navigation', {name:'Profile settings'}).getByRole('link', {name:'Notifications',exact:true}).click();
  await page.getByLabel('Show me on the leaderboard').check();await page.getByRole('button',{name:'Save preferences',exact:true}).click();await page.getByText('Preferences saved.',{exact:true}).waitFor();
  await page.reload();await page.getByLabel('Full name',{exact:true}).waitFor();assert.equal(await page.getByLabel('Full name',{exact:true}).inputValue(),'Browser Student');assert.ok(await page.getByLabel('Show me on the leaderboard').isChecked());
  await page.getByRole('navigation', {name:'Profile settings'}).getByRole('link', {name:'Security',exact:true}).click();
  await page.getByLabel('Current password', {exact:true}).fill('Emulator-test-only-123!');
  await page.getByLabel('New password', {exact:true}).fill('Changed-browser-password-123!');
  await page.getByLabel('Confirm new password', {exact:true}).fill('Changed-browser-password-123!');
  await page.getByRole('button',{name:'Update password',exact:true}).click();await page.getByText('Password updated.',{exact:true}).waitFor();
  await page.getByLabel('Current password', {exact:true}).fill('Changed-browser-password-123!');
  await page.getByLabel('New password', {exact:true}).fill('Emulator-test-only-123!');
  await page.getByLabel('Confirm new password', {exact:true}).fill('Emulator-test-only-123!');
  await page.getByRole('button',{name:'Update password',exact:true}).click();await page.getByText('Password updated.',{exact:true}).waitFor();
  await page.screenshot({path:'/tmp/euit-connected-profile.png',fullPage:true});
  await page.goto(`${base}/admin/roles`);await page.waitForURL('**/student/dashboard');
  if (process.env.EUIT_UI_CHECK === 'components') { const { checkStudentComponents } = await import('./student-components.mjs'); await checkStudentComponents(page, base); }
  if (process.env.EUIT_UI_CHECK === 'motion') { const { checkStudentMotion } = await import('./student-motion.mjs'); await checkStudentMotion(page, base); await page.emulateMedia({reducedMotion:'reduce'}); }
  // Route sweep uses real accounts for each portal, never a test bypass in the app.
  let visited=0; const routeIssues=[]; const destinations=new Set();
  for(const [name,prefix] of [['student','/student/'],['mentor','/mentor/'],['owner','/admin/']]){
    if(name!=='student'){await logout();await login(name);await page.waitForURL(name==='mentor'?'**/mentor/dashboard':'**/admin/overview');}
    if(name !== 'student') {
      await page.goto(base + prefix + 'profile');
      if(process.env.CLOUDINARY_TEST_BASE_URL) await uploadProfilePhoto();
      const originalStaffName = await page.getByLabel('Full name', {exact:true}).inputValue();
      await page.getByLabel('Full name', {exact:true}).fill(name === 'mentor' ? 'Restored Mentor' : 'Restored Owner');
      if(name === 'mentor') {
        await page.getByLabel('Job title', {exact:true}).fill('WordPress Instructor');
        await page.getByLabel('Add skill', {exact:true}).fill('WordPress');
        await page.getByRole('button', {name:'Add skill',exact:true}).click();
        const visibility = page.getByRole('switch', {name:'Show on website',exact:true});
        if(await visibility.getAttribute('aria-checked') !== 'true') await visibility.click();
      }
      await page.getByRole('button', {name:'Save profile',exact:true}).click();
      await page.getByText('Profile saved.',{exact:true}).waitFor();
      const preference = page.getByRole('switch', {name:'Email notifications',exact:true});
      const before = await preference.getAttribute('aria-checked');
      await preference.click();
      await page.getByRole('button', {name:'Save preferences',exact:true}).click();
      await page.getByText('Preferences saved.',{exact:true}).waitFor();
      await page.reload();
      await page.getByLabel('Full name', {exact:true}).waitFor();
      assert.equal(await page.getByLabel('Full name', {exact:true}).inputValue(), name === 'mentor' ? 'Restored Mentor' : 'Restored Owner');
      assert.equal(await page.getByRole('switch', {name:'Email notifications',exact:true}).getAttribute('aria-checked'), before === 'true' ? 'false' : 'true');
      if(name === 'mentor') {
        assert.equal(await page.getByLabel('Job title', {exact:true}).inputValue(), 'WordPress Instructor');
        await page.getByRole('button', {name:'Remove WordPress',exact:true}).waitFor();
        assert.equal(await page.getByRole('switch', {name:'Show on website',exact:true}).getAttribute('aria-checked'), 'true');
      }
      await page.screenshot({path:`/tmp/euit-restored-${name}-profile.png`,fullPage:true});
      await page.getByLabel('Full name', {exact:true}).fill(originalStaffName);
      await page.getByRole('button', {name:'Save profile',exact:true}).click();
      await page.getByText('Profile saved.',{exact:true}).waitFor();
    }
    for(const route of pages().filter(p=>p.startsWith(prefix)&&!['/student/login','/student/forgot-password'].includes(p))){
      await page.goto(base+route);await page.waitForFunction(()=>!document.body.textContent.includes('Loading your account…'));await page.evaluate(()=>document.fonts.ready);
      for(const width of [360,1280]){await page.setViewportSize({width,height:900});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);if(overflow>2)routeIssues.push(`${route} overflow ${overflow} at ${width}`);}
      for(const href of await page.locator('a[href]').evaluateAll(links=>links.map(a=>a.href))) if(href.startsWith(base))destinations.add(href.split('#')[0]);
      visited++; if(visited%10===0)console.log(`Checked ${visited} authenticated pages`);
    }
  }
  for(const href of destinations) assert.ok((await page.request.get(href)).ok(), href);
  await checkCatalogAdmin(page, base);
  await page.goto(`${base}/admin/roles`);await page.getByRole('heading',{name:'Owner',exact:true}).waitFor();
  await page.getByLabel('Target account ID').fill(process.env.EUIT_OTHER_PROFILE_ID);
  await page.locator('#access-role').selectOption({label:'Mentor'});await page.getByRole('button',{name:'Save access',exact:true}).click();
  await page.getByText('Access updated and recorded in the audit log.',{exact:true}).waitFor();
  await logout();await login('other');await page.waitForURL('**/mentor/dashboard');await logout();
  await login('unverified');await page.getByRole('heading',{name:'Verify your email',exact:true}).waitFor();
  await page.getByRole('button',{name:'Resend verification',exact:true}).click();await page.getByRole('status').filter({hasText:'Verification email requested'}).waitFor();
  await getFirebaseAuth().updateUser('test-unverified',{emailVerified:true});
  await page.getByRole('button',{name:'I have verified my email',exact:true}).click();await page.waitForURL('**/student/dashboard');await logout();
  await login('missing');await page.getByRole('alert').filter({hasText:'No LMS profile'}).waitFor();
  await page.getByRole('button',{name:'Sign out',exact:true}).click();
  await page.goto(base+'/forgot-password');await page.getByLabel('Email address',{exact:true}).fill('student@example.test');await page.getByRole('button',{name:'Send reset email'}).click();await page.getByRole('status').filter({hasText:'check its inbox'}).waitFor();
  await page.goto(base);await page.getByRole('button',{name:'Create a student account',exact:true}).click();await page.getByLabel('Full name',{exact:true}).fill('New Browser Student');await page.locator('#signup-email').fill('new-browser@example.test');await page.locator('#signup-password').fill('Browser-signup-only-123!');await page.getByRole('button',{name:'Create account',exact:true}).click();await page.getByRole('status').filter({hasText:'Account request accepted'}).waitFor();
  await checkPublicCatalog(page, base);
  await page.getByLabel('Full name',{exact:true}).fill('Checkout Student');
  await page.getByLabel('Mobile number',{exact:true}).fill('1712345678');
  await page.getByLabel('Create a password',{exact:true}).fill('Checkout-only-password-123!');
  await page.getByLabel('Email address',{exact:true}).fill('checkout-browser@example.test');
  await page.locator('input[name=terms]').check();
  await page.getByRole('button',{name:'Create account',exact:true}).click();
  await page.getByRole('status').filter({hasText:'No payment has been taken'}).waitFor();
  assert.equal(JSON.parse(await page.evaluate(()=>sessionStorage.getItem('euit.pending-enrollment'))).batch,process.env.EUIT_CATALOG_BATCH_ID);
  await page.goto(base+'/enroll/result?pay=bkash');
  await page.getByRole('heading',{name:'Enrollment payments are not available yet'}).waitFor();
  assert.deepEqual(errors,[]);
  assert.deepEqual(routeIssues,[]);
  console.log(`PASS: browser Firebase sign-in/out, verification refresh, signup, reset email, profile/preferences persistence, portal guards, Owner access changes, ${visited} authenticated routes at two widths; no page errors.`);
  }
  await context.close();
} catch(error){console.error(logs.slice(-2500));throw error;} finally {
  await browser?.close();
  server.kill('SIGTERM');
  await Promise.race([new Promise(r=>server.once('exit',r)),delay(5000)]);
  if(server.exitCode===null)server.kill('SIGKILL');
  try {
    const { rm, readFile, writeFile } = await import('node:fs/promises');
    const { join } = await import('node:path');
    await rm(join(ROOT, testDistDir), { recursive: true, force: true });
    const tsconfigPath = join(ROOT, 'tsconfig.json');
    const tsconfigContent = await readFile(tsconfigPath, 'utf8');
    if (tsconfigContent.includes(testDistDir)) {
      const cleaned = tsconfigContent.replace(new RegExp(`\\s*"\\.?${testDistDir}[^"]*",?`, 'g'), '');
      await writeFile(tsconfigPath, cleaned, 'utf8');
    }
  } catch {}
}
