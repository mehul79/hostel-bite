package Experiment_1_Packages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class SearchAndFilterE2ETest extends BaseE2ETest {

  public static void main(String[] args) throws Exception {
    SearchAndFilterE2ETest test = new SearchAndFilterE2ETest();
    test.startBrowser();

    try {
      System.out.println("Running searchAndFilter test...");
      test.clearSession();
      test.slowDown();

      test.loginAsSeedUser();
      test.slowDown();

      test.waitForProductsPage();
      test.slowDown();

      WebElement searchInput =
          test.wait.until(
              ExpectedConditions.visibilityOfElementLocated(
                  By.cssSelector("input[placeholder='Search products...']")));

    
      test.highlight(searchInput);
      searchInput.sendKeys("Oreo");
      test.slowDown();

      test.wait.until(
          ExpectedConditions.visibilityOfElementLocated(
              By.xpath("//h3[normalize-space()='Oreo Original']")));
      test.slowDown();

      searchInput.sendKeys(Keys.chord(Keys.CONTROL, "a"), Keys.DELETE);
      test.slowDown();

      test.wait.until(driver -> searchInput.getAttribute("value").isEmpty());
      test.slowDown();

      test.clickFilter("Drink", "Beverages");
      test.slowDown();

      test.wait.until(
          ExpectedConditions.visibilityOfElementLocated(
              By.xpath(
                  "//h3[normalize-space()='Coca-Cola' or normalize-space()='Pepsi' or normalize-space()='Sprite' or normalize-space()='Fanta Orange']")));
      test.slowDown();

      if (!test.driver.getCurrentUrl().contains("/products")) {
        System.out.println("Current URL = " + test.driver.getCurrentUrl());
        throw new RuntimeException("❌ searchAndFilter failed: not on /products");
      }

      System.out.println("✅ searchAndFilter passed");
    } finally {
//      test.closeBrowser();
    }
  }

  private void clickFilter(String primaryLabel, String fallbackLabel) {
    By primary = By.xpath("//button[normalize-space()='" + primaryLabel + "']");
    By fallback = By.xpath("//button[normalize-space()='" + fallbackLabel + "']");

    if (!driver.findElements(primary).isEmpty()) {
      WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(primary));
      highlight(btn);
      btn.click();
      return;
    }

    WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(fallback));
    highlight(btn);
    btn.click();
  }
}