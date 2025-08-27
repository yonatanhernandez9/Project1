const { test, expect } = require('@playwright/test');

// Save employee data in variables
    const firstName = "Yona";
    const lastName = "Hernandez";
    const dependents = "8";
    const EditfirstName = "Rodrigo";
    const EditlastName = "Oviedo";
    const Editdependents = "1";

test('Login test for Paylocity demo app', async ({ page }) => {
  // Go to login page
  await page.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');
  // Filled username and password
  await page.fill('#Username', 'TestUser784')
  await page.fill('#Password', 'D[Xm@2aFe?oe')

  //Click login button
  await page.click('//button[@type="submit" and text()="Log In"]')

  //Add new employee
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('button#add', { state: 'visible' });
  await page.click('button#add');


  //Fill employee form
  await page.fill('#firstName', firstName);
  await page.getByRole('textbox', { name: 'Last Name:' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Dependents:' }).fill(dependents);
  await page.click('//button[@id="addEmployee" and text()="Add"]');
  console.log(`User Added: ${firstName} ${lastName} with ${dependents} dependents`);

  await page.waitForLoadState('networkidle');
  

// Locate the row with the specific first name and last name
  const row = await page.locator(`xpath=//tr[td[text()="${firstName}"] and td[text()="${lastName}"]]`);

// Click the edit button within that row
  const editButton = row.locator('i.fas.fa-edit');
  await editButton.click();
  await page.waitForLoadState('networkidle');

//Edit employee form
  await page.fill('#firstName', EditfirstName)
  await page.fill('#lastName', EditlastName)
  await page.fill('#dependants', Editdependents)
  await page.click('//button[@id="updateEmployee" and text()="Update"]');
  console.log(`User: ${firstName} ${lastName} was edited to: ${EditfirstName} ${EditlastName} with ${Editdependents} dependents`);
  await page.waitForLoadState('networkidle');

//locate the row with the specific first name and last name
  const row1 = await page.locator(`xpath=//tr[td[text()="${EditfirstName}"] and td[text()="${EditlastName}"]]`);
  await page.waitForLoadState('networkidle');


// Click the delete button within that row
  await row.locator('i.fas.fa-times').click();
  await page.click('//button[@id="deleteEmployee" and text()="Delete"]');
  console.log(`User Deleted: ${EditfirstName} ${EditlastName} with ${Editdependents} dependents`);

 await page.pause();

})