const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch({
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage'
    ]
  })

  const browserVersion = await browser.version()
  console.log(`Started ${browserVersion}`);

  const page = await browser.newPage();
  const response = await page.goto('http://google.com');

  if (response.ok()) {
    await page
    .screenshot({ path: `../output/google.png` })
    .catch(err => console.log(err));
  }

  await page.close();
  await browser.close();

  console.log("Done");
})();