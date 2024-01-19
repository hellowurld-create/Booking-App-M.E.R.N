import { expect, test } from '@playwright/test';

const UI_URL ="http://localhost:5173"

test('should allow user to log in', async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
   await page.getByRole("link", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Login to your Account " })).toBeVisible();

  await page.locator("[name=emailOrPhone]").fill("akpagodswill2@outlook.com");
  await page.locator("[name=password]").fill("12345678");

  await page.getByRole("button", { name: "Log In" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
});


test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("link", { name: "Register" }).click();
  

  await page.locator("[name=firstName]").fill("test_firstName")
  await page.locator("[name=lastName]").fill("test_lastName")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=phoneNo]").fill("1234901667")
  await page.locator("[name=password]").fill("password123")
  await page.locator("[name=confirmPassword]").fill("password123")

  await page.getByRole("button", { name: "Create an account" }).click();

   await expect(page.getByText("Registration Success!")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();

})

