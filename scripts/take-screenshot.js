const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    try {
        // Set viewport size
        await page.setViewport({ width: 1280, height: 720 });
        
        // Navigate to app
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
        
        // Wait a bit more for React to render
        await page.waitForTimeout(3000);
        
        // Take full page screenshot
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join('screenshots', `app-${timestamp}.png`);
        
        await page.screenshot({ 
            path: screenshotPath,
            fullPage: true 
        });
        
        console.log(`✅ Screenshot saved: ${screenshotPath}`);
        
        // Take screenshot of specific components if they exist
        try {
            const commandCard = await page.$('.command-card, [class*="command"]');
            if (commandCard) {
                await commandCard.screenshot({
                    path: path.join('screenshots', `command-card-${timestamp}.png`)
                });
                console.log(`✅ Command card screenshot saved`);
            }
        } catch (e) {
            console.log('⚠️  Could not capture command card component');
        }
        
    } catch (error) {
        console.error('❌ Screenshot failed:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

takeScreenshot();
