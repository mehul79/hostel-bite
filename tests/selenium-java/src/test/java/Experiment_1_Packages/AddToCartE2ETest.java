package Experiment_1_Packages;

import org.openqa.selenium.By;

public class AddToCartE2ETest extends BaseE2ETest {

  public static void main(String[] args) throws Exception {
    AddToCartE2ETest test = new AddToCartE2ETest();
    test.startBrowser();

    try {
      System.out.println("Running addToCart test...");
      test.clearSession();
      test.loginAsSeedUser();
      test.addFirstProductToCart();

      test.driver.get(test.baseUrl + "/cart");

      // wait for cart page header and at least one remove button
      test.wait.until(
          org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated(
              By.xpath("//h1[contains(normalize-space(), 'Your Cart')]")));
      test.wait.until(
          org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated(
              By.cssSelector("button[aria-label='Remove item']")));

      boolean inCartUrl = test.driver.getCurrentUrl().contains("/cart");
      int removeButtons = test.driver.findElements(By.cssSelector("button[aria-label='Remove item']")).size();

      if (!inCartUrl || removeButtons == 0) {
        System.out.println("Current URL: " + test.driver.getCurrentUrl());
        throw new RuntimeException("❌ addToCart failed: either not on /cart or no items found");
      }

      System.out.println("✅ addToCart passed");
    } finally {
      // comment this out while debugging to keep browser open
//      test.closeBrowser();
    }
  }
}
