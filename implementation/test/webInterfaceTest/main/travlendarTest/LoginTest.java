package travlendarTest;

import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.junit.Test;
import org.openqa.selenium.support.ui.Wait;

import static org.junit.Assert.assertEquals;

import java.util.function.Function;

public class LoginTest {

	/**
	 * Standard user behavior in attempting a login
	 * 
	 * @param email
	 * @param password
	 * @return boolean result of the login
	 */
	public static boolean testThis(String email, String password) {

		Main.LOGGER.info("Testing login");

		Main.driver.findElement(By.id("email")).sendKeys(email);
		Main.driver.findElement(By.id("password")).sendKeys(password);
		Main.driver.findElement(By.tagName("form")).submit();
		;

		Wait<WebDriver> timer = Main.setTimeOut(10);
		try {
			Boolean dialogButton = timer.until(new Function<WebDriver, Boolean>() {
				public Boolean apply(WebDriver driver) {
					return driver.findElement(By.className("close")).isDisplayed();
				}
			});
			Main.driver.findElement(By.className("close")).click();
		} catch (RuntimeException a) {
			Main.LOGGER.debug("Timeout ended: close button not found");
			return false;
		}

		if (Main.driver.manage().getCookies().isEmpty()) {
			Main.LOGGER.debug("Cookie not saved: aborting");
			return false;
		}

		Main.driver.manage().getCookies().forEach(cookie -> {
			Main.LOGGER.info("Cookie Saved: " + cookie);
		});

		Wait<WebDriver> timerTest = Main.setTimeOut(10);
		try {
			timerTest.until(new Function<WebDriver, Boolean>() {
				public Boolean apply(WebDriver driver) {
					return Main.driver.getTitle().equals("Travlendar+");
				}
			});
			Main.LOGGER.info("Redirection OK!");
			return true;
		} catch (RuntimeException a) {
			Main.LOGGER.debug("Timeout ended: not found title page Travlendar+");
			return false;
		}
	}

	/**
	 * Test Assertion function in which an user with email and password is
	 * trying to login in
	 * 
	 * @param email
	 * @param password
	 * @param isValid
	 */

	@Test
	public static void login(String email, String password, Boolean isValid) {

		Main.driver = new FirefoxDriver();
		Main.driver.get("http://localhost/login.html");
		Boolean result = testThis(email, password);
		Main.driver.manage().deleteAllCookies();
		Main.driver.quit();
		if (result) {
			Main.LOGGER.debug("LOGIN PASSED - email: " + email + " password: " + password);
		} else {
			Main.LOGGER.error("LOGIN FAILED - email: " + email + " password: " + password);
		}
		assertEquals(isValid, result);
	}

	/**
	 * Used to log in and test other modules
	 */
	public static void newSession() {
		Main.driver = new FirefoxDriver();
		Main.driver.get("http://localhost/login.html");
		testThis("test@test.it", "a"); // current driver is on travlendar main
										// page
	};

	public static boolean newSession(String password) {
		Main.driver = new FirefoxDriver();
		Main.driver.get("http://localhost/login.html");
		return testThis("test@test.it", password); // current driver is on
													// travlendar main page
	};

	/**
	 * Main test caller
	 */
	public static void testLogIn() {
		login("test@test.it", "a", true);
		login("adfasdf123t", "1341", false);
		login("a@a.it", "", false);
		login("", "", false);
		login("asdf 8	ysfaspfdksfsdf", "121adfsfd", false);
		login("test@test.it", "a", true);
		login("a@a.it", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", false);
		login("AAAAAAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAAAAAAAAAAAAAAA", false);
	}
}