package travlendarTest;

import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.logging.LogEntries;
import org.junit.Test;
import org.openqa.selenium.support.ui.Wait;

import static org.junit.Assert.assertEquals;

import java.util.function.Function;

public class RegistrationTest {
	/**
	 * test the registration of user
	 * 
	 * @param firstName
	 * @param lastName
	 * @param email
	 * @param password
	 * @param retypePassword
	 * @return
	 */
	private static boolean testThis(String firstName, String lastName, String email, String password,
			String retypePassword) {

		Main.LOGGER.info("Testing registration");

		Main.driver.findElement(By.id("first_name")).sendKeys(email);
		Main.driver.findElement(By.id("last_name")).sendKeys(password);
		Main.driver.findElement(By.id("email")).sendKeys(email);
		Main.driver.findElement(By.id("password")).sendKeys(password);
		Main.driver.findElement(By.id("retype_password")).sendKeys(retypePassword);

		Main.driver.findElement(By.tagName("form")).submit();

		Wait<WebDriver> timer = Main.setTimeOut(10);
		try {
			timer.until(new Function<WebDriver, Boolean>() {
				public Boolean apply(WebDriver driver) {
					return driver.findElement(By.className("close")).isDisplayed();
				}
			});
			Main.driver.findElement(By.className("close")).click();
		} catch (RuntimeException a) {
			Main.LOGGER.debug("Timeout ended: close button not found");
			return false;
		}

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
			Main.LOGGER.debug("Timeout ended: not redirected on localhost/index.html");
			return false;
		}
	}

	/**
	 * init a new session to perform test registration
	 * 
	 * @param firstName
	 * @param lastName
	 * @param email
	 * @param password
	 * @param retypePassword
	 * @param isValid
	 */
	@Test
	public static void registrate(String firstName, String lastName, String email, String password,
			String retypePassword, Boolean isValid) {

		Main.driver = new FirefoxDriver();
		Main.driver.get("http://localhost/registration.html");
		Boolean result = testThis(firstName, lastName, email, password, retypePassword);
		Main.driver.quit();
		if (result) {
			Main.LOGGER.debug("REGISTRATION PASSED - " + "firstName: " + firstName + " lastName: " + lastName
					+ " email: " + email + " password: " + password + " retypePassword: " + retypePassword);
		} else {
			Main.LOGGER.error("REGISTRATION FAILED - " + "firstName: " + firstName + " lastName: " + lastName
					+ " email: " + email + " password: " + password + " retypePassword: " + retypePassword);
		}
		assertEquals(isValid, result);
	}

	/**
	 * Testing Registration. please remember to run
	 * "r.db('nome_db').table('nome_tabella').delete()" to refresh the user data
	 * on the db.
	 */

	public static void testRegistration() {
		registrate("tester", "tester_surname", "test@test.it", "a", "a", true); // creates
																				// new
																				// user
																				// test@test.it
		registrate("tester", "tester_surname", "test@test.it", "a", "abssdafasdfasd", false);
		registrate("tester", "tester_surname", "test@test.it", "a", "", false);
		registrate("tester", "", "test@test.com", "a", "a", true); // creates
																	// new user
																	// a@a.it
		registrate("tester", "", "test@test.com", "a", "", false);
		registrate("", "", "", "", "", false);

		registrate("tester", "tester_surname", "test@test.it", "a", "a", false);
	}
}