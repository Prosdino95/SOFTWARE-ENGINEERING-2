package travlendarTest;

import java.io.IOException;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

import PreferenceTest.PreferenceTest;
import ProfileTest.ProfileTest;
import addEventTest.EventTest;

public class Main {

	/**
	 * Main Logger
	 */
	public static final Logger LOGGER = LogManager.getLogger("travlendar");
	/**
	 * Broswer driver used in the test
	 */
	public static FirefoxDriver driver;

	/**
	 * Set a timeout waiting asynchronous call of ajax
	 * 
	 * @return Wait<WebDriver> timer
	 */
	public static Wait<WebDriver> setTimeOut(int time) {
		return new FluentWait<WebDriver>(driver).withTimeout(time, TimeUnit.SECONDS).pollingEvery(500,
				TimeUnit.MILLISECONDS);
	}

	/**
	 * set a timeout for trying to find an element with id passed in DOM
	 * 
	 * @param id
	 * @return WebElement element
	 */
	public static WebElement getElement(String id) {
		Wait<WebDriver> timer = Main.setTimeOut(5);
		try {
			WebElement element = timer.until(new Function<WebDriver, WebElement>() {
				public WebElement apply(WebDriver driver) {
					return driver.findElement(By.id(id));
				}
			});
			return element;
		} catch (RuntimeException a) {
			Main.LOGGER.debug("Timeout ended: #" + id + " not found");
			return null;
		}
	}

	/**
	 * set a timeout for trying to find an element with class name passed in DOM
	 * 
	 * @param className
	 * @return WebElement element
	 */
	public static WebElement getClassName(String className) {
		Wait<WebDriver> timer = Main.setTimeOut(5);
		try {
			WebElement element = timer.until(new Function<WebDriver, WebElement>() {
				public WebElement apply(WebDriver driver) {
					return driver.findElement(By.className(className));
				}
			});
			return element;
		} catch (RuntimeException a) {
			Main.LOGGER.debug("Timeout ended: #" + className + " not found");
			return null;
		}
	}

	/**
	 * calls this to perform Travlendar test.
	 * 
	 * @param args
	 * @throws InterruptedException
	 * @throws SecurityException
	 * @throws IOException
	 */
	public static void main(String[] args) throws InterruptedException, SecurityException, IOException {

		// very important
		System.setProperty("webdriver.gecko.driver", "/home/archie/Travelandar+/RuggianoProsdocimiVercesi/implementation/test/webInterfaceTest/geckodriver");

		RegistrationTest.testRegistration();
		LoginTest.testLogIn();
		ProfileTest.mainTest();
		EventTest.mainTest();
		PreferenceTest.mainTest();

	}
}
