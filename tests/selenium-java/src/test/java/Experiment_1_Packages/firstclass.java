package Experiment_1_Packages;
import org.openqa.selenium.WebDriver;

// Import ChromeDriver class to control Google Chrome
import org.openqa.selenium.chrome.ChromeDriver;

public class firstclass {
    public static void main(String[] args) {

        // Creating WebDriver object and launching Chrome browser
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.google.com");
        System.out.println(driver.getTitle());
        driver.quit();
    }
}