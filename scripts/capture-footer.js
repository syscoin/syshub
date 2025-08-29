const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function ensureDirectory(dirPath) {
	await fs.promises.mkdir(dirPath, { recursive: true });
}

async function main() {
	const baseUrl = process.env.SCREENSHOT_URL || 'http://localhost:3000';
	const outDir = path.resolve(__dirname, '..', 'artifacts');
	await ensureDirectory(outDir);
	const outPath = path.join(outDir, `footer-${Date.now()}.png`);

	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	try {
		const page = await browser.newPage();
		await page.setViewport({ width: 1366, height: 1000, deviceScaleFactor: 1 });
		await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 120000 });
		await page.waitForSelector('body', { timeout: 60000 });

		// Scroll to the bottom to ensure footer is rendered
		await page.evaluate(async () => {
			window.scrollTo(0, document.body.scrollHeight);
		});
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Try common footer selectors
		let footer = await page.$('footer.footer');
		if (!footer) footer = await page.$('footer');

		if (footer) {
			await footer.screenshot({ path: outPath });
			console.log(`Saved footer screenshot to: ${outPath}`);
		} else {
			const fullPagePath = outPath.replace(/footer-/, 'page-');
			await page.screenshot({ path: fullPagePath, fullPage: true });
			console.warn('Footer element not found; saved full page screenshot instead:', fullPagePath);
		}
		console.log(`Saved footer screenshot to: ${outPath}`);
	} finally {
		await browser.close();
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

