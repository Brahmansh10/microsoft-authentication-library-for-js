import { Screenshot } from "../../../../e2eTestUtils/TestUtils";
import { Page } from "puppeteer";

export async function enterCredentials(page: Page, screenshot: Screenshot, username: string, accountPwd: string): Promise<void> {
    await page.waitForSelector("#i0116");
    await screenshot.takeScreenshot(page, `loginPage`);
    await page.type("#i0116", username);
    await page.click("#idSIButton9");
    await new Promise(resolve => setTimeout(() => screenshot.takeScreenshot(page, 'afterEmailSubmission').then(() => resolve()), 5000));
    await page.waitForSelector("#idA_PWD_ForgotPassword");
    await screenshot.takeScreenshot(page, `pwdInputPage`);
    await page.type("#i0118", accountPwd);
    await page.click("#idSIButton9");
}

export async function clickSignIn(page: Page, screenshot: Screenshot): Promise<void> {
    await screenshot.takeScreenshot(page, "samplePageInit");
    await page.click("#SignIn");
    await screenshot.takeScreenshot(page, "signInClicked");
}

export async function enterCredentialsADFS(page: Page, screenshot: Screenshot, username: string, accountPwd: string): Promise<void> {
    await page.waitForSelector("#i0116");
    await screenshot.takeScreenshot(page, `loginPage`);
    await page.type("#i0116", username);
    await page.click("#idSIButton9");
    await page.waitForSelector("#userNameInput");
    await screenshot.takeScreenshot(page, `adfsUsernameInputPage`);
    await page.type("#passwordInput", accountPwd);
    await page.click("#submitButton");
}

export async function enterDeviceCode(page: Page, screenshot: Screenshot, code: string, deviceCodeUrl: string): Promise<void> {
    await page.goto(deviceCodeUrl);
    await page.waitForSelector("#otc");
    await screenshot.takeScreenshot(page, 'deviceCodePage');
    await page.type("#otc", code);
    await page.click("#idSIButton9");
}

export function extractDeviceCode(output: string): string | null {
    if ((/code (?<code>\w+)/).test(output)) {
        const matches = output.match(/code (?<code>\w+)/);
        return matches.groups.code;
    }

    return null;
}