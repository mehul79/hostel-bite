package Experiment_1_Packages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class CheckoutE2ETest extends BaseE2ETest {

  public static void main(String[] args) throws Exception {
    CheckoutE2ETest test = new CheckoutE2ETest();
    test.startBrowser();

    try {
      System.out.println("Running checkout test...");
      test.clearSession();
      test.loginAsSeedUser();
      test.addFirstProductToCart();

      test.driver.get(test.baseUrl + "/cart");

      WebElement proceedButton =
          test.wait.until(org.openqa.selenium.support.ui.ExpectedConditions.elementToBeClickable(By.linkText("Proceed to Checkout")));
      proceedButton.click();

      test.wait.until(org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated(
          By.xpath("//h1[contains(normalize-space(), 'Checkout')]")));

      WebElement roomInput = test.wait.until(org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated(By.id("room")));
      roomInput.clear();
      roomInput.sendKeys("A-101");

      test.submitButtonByText("Place Order").click();

      test.wait.until(org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated(
          By.xpath("//h1[contains(normalize-space(), 'Order Confirmed!')]")));

      if (!test.driver.getCurrentUrl().contains("/checkout")) {
        System.out.println("Current URL: " + test.driver.getCurrentUrl());
        throw new RuntimeException("❌ Checkout failed: not on checkout confirmation");
      }

      System.out.println("✅ checkout passed");
    } finally {
      // comment this out while debugging to keep browser open
//      test.closeBrowser();
    }
  }
}
