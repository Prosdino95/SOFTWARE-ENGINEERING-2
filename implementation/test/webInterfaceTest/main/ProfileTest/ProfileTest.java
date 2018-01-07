package ProfileTest;

import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.logging.LogEntries;
import org.junit.Test;
import org.openqa.selenium.support.ui.Wait;

import travlendarTest.LoginTest;
import travlendarTest.Main;

import static org.junit.Assert.assertEquals;

import java.util.function.Function;

public class ProfileTest {

	/**
	 * Test if the user name is updated correctly
	 * 
	 * @param firstName
	 * @param lastName
	 */
	@Test
	public static void testProfile(String firstName, String lastName) {

		LoginTest.newSession(); // get a valid session

		// open
		Main.driver.executeScript("document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()");
		Main.driver.executeScript("document.querySelector('#profile').click()");

		Boolean result = ProfileSubmit.firstNameTest(firstName, lastName);
		if (result) {
			Main.LOGGER.debug("PROFILE FIRST NAME PASSED - " + "NewfirstName: " + firstName);
		} else {
			Main.LOGGER.error("PROFILE FIRST NAME FAILED - " + "NewfirstName: " + firstName);
		}
		Main.driver.manage().deleteAllCookies();
		Main.driver.quit();
		assertEquals(true, result);
	}

	/**
	 * test if the user password is updated correctly
	 * 
	 * @param currentPassword
	 * @param newPassword
	 * @param retypePassword
	 * @param isValid
	 */
	@Test
	public static void testPassword(String currentPassword, String newPassword, String retypePassword,
			boolean isValid) {

		LoginTest.newSession(currentPassword); // get a valid session

		try {
			// open
			Main.driver.executeScript("document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()");
		} catch (JavascriptException e) { // blocked on login page
			Main.LOGGER.error("CHANGE PASSWORD FAILED - " + "currentPassword: " + currentPassword + " newPassword: "
					+ newPassword + " retypePassword: " + retypePassword);
			Main.driver.manage().deleteAllCookies();
			Main.driver.quit();
			assertEquals(isValid, false);
			return;
		}

		Main.driver.executeScript("document.querySelector('#profile').click()");

		Boolean result = ProfilePassword.passwordTest(currentPassword, newPassword, retypePassword);
		if (result) {
			Main.LOGGER.debug("CHANGE PASSWORD PASSED - " + "currentPassword: " + currentPassword + " newPassword: "
					+ newPassword + " retypePassword: " + retypePassword);
		} else {
			Main.LOGGER.error("CHANGE PASSWORD FAILED - " + "currentPassword: " + currentPassword + " newPassword: "
					+ newPassword + " retypePassword: " + retypePassword);
		}
		Main.driver.manage().deleteAllCookies();
		Main.driver.quit();
		assertEquals(isValid, result);
	}

	/**
	 * Testing Registration. please remember to change password to 'a' for
	 * test@test.it
	 */

	public static void mainTest() {
		testProfile("Jhonny", "Erdinger");
		testProfile("Vladimir", "Smirnoff");
		testProfile("Kathiusha", "McFarland");
		testProfile("Kevin", "Pilsner");

		testPassword("a", "beer", "beer", true);
		testPassword("a", "beer", "beer", false);
		testPassword("beer", "vodka", "beer", false); // not same
		testPassword("beer", "vodka", "vodka", true);

		testPassword("vodka", "tequila", "rhum", false);
		testPassword("vodka", "a", "a", true); // reset to defualt password
	}
}