const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.post('/login', async (req, res) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true, // set to false to watch browser
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
    );

    await page.goto(
      'https://ctu.campusmanager.co.za/portal/student-login.php',
      { waitUntil: 'networkidle2' }
    );

    await page.waitForSelector('#username', { visible: true });
    await page.waitForSelector('#password', { visible: true });

    const username = String(process.env.CTU_USERNAME || '0307185248084');
    const password = String(process.env.CTU_PASSWORD || '0307185248084');

    await page.type('#username', username);
    await page.type('#password', password);

    await Promise.all([
      page.click('#btnlogin'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);

    const currentUrl = page.url();

    if (currentUrl.includes('student-login.php')) {
      throw new Error('Login failed');
    }


    // Extract assessments
const tasks = await page.evaluate(() => {
  const rows = document.querySelectorAll('table.table-hover tbody tr');
  const results = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll('td');

    // Only rows that have 3 columns (skip the schedule table)
    if (cols.length === 3) {
      results.push({
        module: cols[0].innerText.trim(),
        assessment: cols[1].innerText.trim(),
        due: cols[2].innerText.trim()
      });
    }
  });

  return results;
});

await browser.close();

res.json({
  success: true,
  count: tasks.length,
  tasks
});

  } catch (err) {
    if (browser) await browser.close();
    console.error(err);
    res.status(500).send('Login failed: ' + err.message);
  }
});

module.exports = router;