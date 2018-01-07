package PreferenceTest;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import travlendarTest.LoginTest;
import travlendarTest.Main;

public class PreferenceTest {
	/**
	 * init a new session to test preference
	 * 
	 * @param preferenceToSet
	 * @param preferenceWanted
	 * @param isValid
	 */
	@Test
	public static void testPreferenceSubmit(String[] preferenceToSet, String[] preferenceWanted, boolean isValid) {

		LoginTest.newSession(); // get a valid session

		Main.LOGGER.info("Starting Preference Submit Test");
		Main.driver.executeScript("document.querySelector('#preferences').click()");

		boolean result = PreferenceSubmit.testSubmitPreference(preferenceToSet, preferenceWanted);

		if (result) {
			Main.LOGGER.debug("PREFERENCES SUBMIT PASSED - ");
		} else {
			Main.LOGGER.error("PREFERENCES SUBMIT FAILED  - ");
		}
		// reset session
		Main.driver.manage().getCookies().clear();
		Main.driver.quit();
		assertEquals(isValid, result);
	}

	// default: "foot" "bike" "car" "public_transport" "train" "airplane"
	// default: "foot-like" "bike-like" "car-like" "atm-like" "train-like"
	// "airplane-like"

	public static final String[] TOSET01 = { "foot", "bike" };
	public static final String[] TOSET02 = { "foot", "bike", "car" };
	public static final String[] TOSET03 = { "airplane", "train" };
	public static final String[] TOSET04 = { "AAAAAAAAAAAAA", "AAAAAAAAAAAAAA" };
	public static final String[] TOSET05 = { "car", "train", "airplane" };
	public static final String[] TOSET06 = {};
	public static final String[] TOSET07 = { "bike" };

	public static final String[] WANT01 = { "foot-like", "bike-like" };
	public static final String[] WANT02 = { "foot-like", "bike-like", "car-like" };
	public static final String[] WANT03 = { "foot-like", "train-like" };
	public static final String[] WANT04 = { "atm-like", "train-like" };
	public static final String[] WANT05 = { "AAAAAAAAAAAAAAAAAAAAA", "AAAAAAAAAAAAAAAAAAA" };
	public static final String[] WANT06 = {};
	public static final String[] WANT07 = {};

	/**
	 * main caller of preference test
	 */
	public static void mainTest() {
		PreferenceTest.testPreferenceSubmit(TOSET01, WANT01, true);
		PreferenceTest.testPreferenceSubmit(TOSET02, WANT02, true);
		PreferenceTest.testPreferenceSubmit(TOSET03, WANT03, false);
		PreferenceTest.testPreferenceSubmit(TOSET04, WANT04, false);
		PreferenceTest.testPreferenceSubmit(TOSET05, WANT05, false);
		PreferenceTest.testPreferenceSubmit(TOSET06, WANT06, true);
		PreferenceTest.testPreferenceSubmit(TOSET07, WANT07, false);
	}
}
