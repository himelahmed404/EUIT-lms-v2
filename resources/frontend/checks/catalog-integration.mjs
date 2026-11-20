import assert from 'node:assert/strict';
// Uses the real Next proxy, Express, Prisma and disposable PostgreSQL fixtures.
export async function checkCatalogAdmin(page, base) {
  await page.goto(base + '/admin/courses');
  await page.getByRole('link', { name: 'Create course', exact: true }).click();
  await page.getByLabel('Course title', { exact: true }).fill('Browser Catalog Course');
  await page.getByLabel('Track', { exact: true }).fill('Browser Testing');
  await page.getByLabel('Summary', { exact: true }).fill('Course created through the frontend and real API.');
  await page.getByLabel('Online fee', { exact: true }).fill('9501');
  await page.getByLabel('3 parts', { exact: true }).check();
  await page.getByRole('button', { name: 'Save course draft', exact: true }).click();
  await page.getByText('Course draft saved.', { exact: true }).waitFor();
  const courseId = new URL(page.url()).searchParams.get('id'); assert.ok(courseId);
  await page.reload(); await page.getByLabel('Course title', { exact: true }).waitFor();
  assert.equal(await page.getByLabel('Online fee', { exact: true }).inputValue(), '9501');
  await page.getByLabel('Course title', { exact: true }).fill('Browser Catalog Course Edited');
  await page.getByRole('button', { name: 'Save course draft', exact: true }).click();
  await page.getByText('Course draft saved.', { exact: true }).waitFor();
  await page.goto(base + '/admin/batch-edit');
  await page.getByLabel('Course', { exact: true }).selectOption(courseId);
  await page.getByLabel('Batch name', { exact: true }).fill('Browser March Batch');
  await page.getByLabel('Lead mentor', { exact: true }).selectOption({ label: 'mentor fixture' });
  await page.getByLabel('Online meeting URL', { exact: true }).fill('https://meeting.example.test/browser');
  await page.getByLabel('Mon', { exact: true }).check(); await page.getByLabel('Thu', { exact: true }).check();
  await page.getByLabel('First class', { exact: true }).fill('2027-03-01');
  await page.getByLabel('Number of classes', { exact: true }).fill('4');
  await page.getByLabel('Batch status', { exact: true }).selectOption('OPEN');
  await page.getByLabel('Admission open', { exact: true }).check();
  await page.getByLabel('Show on website', { exact: true }).check();
  await page.getByRole('button', { name: 'Save batch', exact: true }).click();
  await page.getByText('Batch saved. Schedule and availability updated.', { exact: true }).waitFor();
  const batchId = new URL(page.url()).searchParams.get('id'); assert.ok(batchId);
  await page.reload(); await page.getByLabel('Batch name', { exact: true }).waitFor();
  assert.equal(await page.getByLabel('Batch fee (BDT)', { exact: true }).inputValue(), '9501');
  await page.getByLabel('Batch name', { exact: true }).fill('Browser March Batch Edited');
  await page.getByRole('button', { name: 'Save batch', exact: true }).click();
  await page.getByText('Batch saved. Schedule and availability updated.', { exact: true }).waitFor();
  await page.getByRole('link', { name: 'View batch and class schedule' }).click();
  await page.getByRole('heading', { name: 'Browser March Batch Edited', exact: true }).waitFor();
  assert.equal(await page.locator('.catalog-list > li').count(), 4);
  await page.screenshot({ path: '/tmp/euit-catalog-admin.png', fullPage: true });
  await page.goto(base + '/admin/mentors'); await page.getByRole('heading', { name: 'mentor fixture', exact: true }).waitFor();
  // Draft visibility is checked through the unauthenticated same-origin proxy.
  const privateDraft = await page.request.get(base + '/api/catalog/courses/' + courseId); assert.equal(privateDraft.status(), 404);
  console.log('PASS: browser creates/edits course and batch, reloads persisted data, and reads mentor choices and class schedule.');
}
export async function checkPublicCatalog(page, base) {
  await page.goto(base + '/enroll/course');
  await page.getByRole('heading', { name: 'Published Web Design', exact: true }).waitFor();
  assert.equal(await page.getByText('Unpublished Secret Draft', { exact: true }).count(), 0);
  for (const width of [360, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 2);
  }
  await page.getByLabel('Study format', { exact: true }).selectOption('OFFLINE');
  await page.getByText('This batch is full. Choose another batch when available.', { exact: true }).waitFor();
  assert.equal(await page.getByRole('link', { name: /^Continue with/ }).count(), 0);
  await page.getByLabel('Study format', { exact: true }).selectOption('ONLINE');
  await page.getByRole('link', { name: 'Continue with Public online batch', exact: true }).waitFor();
  await page.getByLabel('Payment plan for Published Web Design', { exact: true }).selectOption('3');
  await page.getByRole('link', { name: 'Continue with Public online batch', exact: true }).click();
  await page.waitForURL('**/enroll/checkout?**');
  await page.getByRole('heading', { name: 'Review your course selection', exact: true }).waitFor();
  await page.getByRole('heading', { name: 'Published Web Design', exact: true }).waitFor();
  assert.ok((await page.locator('.catalog-price').textContent()).includes('12,001'));
  assert.ok((await page.locator('body').textContent()).includes('৳4,001 + ৳4,000 + ৳4,000'));
  assert.equal(await page.getByText('Coupon or referral', { exact: true }).count(), 0);
  const valid = page.url();
  await page.goto(valid.replace('plan=3', 'plan=12') + '&total=1');
  await page.getByRole('alert').filter({ hasText: 'This selection is unavailable' }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Create account', exact: true }).count(), 0);
  await page.goto(base + `/enroll/checkout?course=${process.env.EUIT_CATALOG_COURSE_ID}&batch=${process.env.EUIT_FULL_BATCH_ID}&format=OFFLINE&plan=1`);
  await page.getByRole('alert').filter({ hasText: 'This selection is unavailable' }).waitFor();
  await page.goto(valid + '&total=1');
  await page.getByRole('heading', { name: 'Published Web Design', exact: true }).waitFor();
  assert.ok((await page.locator('.catalog-price').textContent()).includes('12,001'));
  await page.screenshot({ path: '/tmp/euit-catalog-public.png', fullPage: true });
  console.log('PASS: public catalog filters, real BDT pricing, full-batch rejection, URL tamper rejection and two viewport widths.');
}
