package Experiment_1_Packages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class CheckoutE2ETest extends BaseE2ETest {

  private static final int STEP_DELAY = 1500; // 1.5 second pause between steps

  public static void main(String[] args) throws Exception {
    CheckoutE2ETest test = new CheckoutE2ETest();
    test.startBrowser();

    try {
      System.out.println("Running checkout test...");
      test.pause();

      test.clearSession();
      test.loginAsSeedUser();
      test.pause();

      System.out.println("Adding first product to cart...");
      test.addFirstProductToCart();
      test.pause();

      System.out.println("Navigating to cart...");
      test.driver.get(test.baseUrl + "/cart");
      test.pause();

      System.out.println("Clicking 'Proceed to Checkout'...");
      WebElement proceedButton =
          test.wait.until(ExpectedConditions.elementToBeClickable(
              By.linkText("Proceed to Checkout")));

      test.scrollIntoView(proceedButton);
      test.pause();
      proceedButton.click();
      test.pause();

      System.out.println("Waiting for Checkout page...");
      test.wait.until(ExpectedConditions.visibilityOfElementLocated(
          By.xpath("//h1[contains(normalize-space(), 'Checkout')]")));
      test.pause();

      System.out.println("Entering room number...");
      WebElement roomInput = test.wait.until(
          ExpectedConditions.visibilityOfElementLocated(By.id("room")));

      test.scrollIntoView(roomInput);
      test.pause();

      roomInput.clear();

      // Slow typing effect
      for (char c : "A-101".toCharArray()) {
        roomInput.sendKeys(String.valueOf(c));
        Thread.sleep(300);
      }

      test.pause();

      System.out.println("Clicking 'Place Order'...");
      WebElement placeOrderBtn = test.submitButtonByText("Place Order");

      test.scrollIntoView(placeOrderBtn);
      test.pause();
      placeOrderBtn.click();
      test.pause();

      System.out.println("Waiting for Order Confirmation...");
      test.wait.until(ExpectedConditions.visibilityOfElementLocated(
          By.xpath("//h1[contains(normalize-space(), 'Order Confirmed!')]")));
      test.pause();

      if (!test.driver.getCurrentUrl().contains("/checkout")) {
        System.out.println("Current URL: " + test.driver.getCurrentUrl());
        throw new RuntimeException("❌ Checkout failed: not on checkout confirmation");
      }

      System.out.println("✅ checkout passed");

    } finally {
      // Comment this out while debugging to keep browser open
      // test.closeBrowser();
    }
  }

  // =========================
  // Helper: Pause execution
  // =========================
  private void pause() throws InterruptedException {
    Thread.sleep(STEP_DELAY);
  }

  // =========================
  // Helper: Scroll into view
  // =========================
  private void scrollIntoView(WebElement element) {
    JavascriptExecutor js = (JavascriptExecutor) driver;
    js.executeScript(
        "arguments[0].scrollIntoView({behavior:'smooth', block:'center'});",
        element);
  }
}
