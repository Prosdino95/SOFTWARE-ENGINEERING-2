package addEventTest;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import travlendarTest.LoginTest;
import travlendarTest.Main;

public class EventTest {

	/**
	 * Test of submitting a new event on calendar page
	 * 
	 * @param event_title
	 * @param start_day
	 * @param end_day
	 * @param starting_location
	 * @param meeting_location
	 * @param isValid
	 */
	@Test
	static public void testCalendarEvent(String event_title, String start_day, String end_day, String starting_location,
			String meeting_location, boolean isValid) {

		LoginTest.newSession(); // get a valid session

		Main.LOGGER.info("Starting add Calendar Event");
		Main.driver.executeScript("document.querySelector('#calendar').click()");

		boolean result = addEventTest.testSubmitEvent(event_title, start_day, end_day, starting_location,
				meeting_location);

		if (result) {
			Main.LOGGER.debug("CALENDAR EVENT SUBMIT PASSED - " + "event_title: " + event_title);
		} else {
			Main.LOGGER.error("CALENDAR EVENT SUBMIT FAILED  - " + "event_title: " + event_title);
		}
		Main.driver.manage().getCookies().clear();
		Main.driver.quit();
		assertEquals(isValid, result);
	}

	/**
	 * Testing of submitting a new event on map page
	 * 
	 * @param event_title
	 * @param start_day
	 * @param end_day
	 * @param starting_location
	 * @param meeting_location
	 * @param isValid
	 */
	@Test
	static public void testMapEvent(String event_title, String start_day, String end_day, String starting_location,
			String meeting_location, boolean isValid) {

		LoginTest.newSession(); // get a valid session
		Main.driver.executeScript("document.querySelector('#maps').click()");

		Main.LOGGER.info("Starting add Map Event");
		boolean result = addEventTest.testSubmitEvent(event_title, start_day, end_day, starting_location,
				meeting_location);
		if (result) {
			Main.LOGGER.debug("MAP EVENT SUBMIT PASSED - " + "event_title: " + event_title);
		} else {
			Main.LOGGER.error("MAP EVENT SUBMIT FAILED  - " + "event_title: " + event_title);
		}
		Main.driver.manage().getCookies().clear();
		Main.driver.quit();
		assertEquals(isValid, result);
	}

	/**
	 * main event test function callers
	 */
	public static void mainTest() {

		testMapEvent("Birthday", "2018-01-11", "2018-01-12", "9.207509460449218,45.46289837036133",
				"9.20798225402832,45.47058094177246", true);
		testMapEvent("Dinner", "AAAAAAAAAA", "AAAAAAAA", "9.207509460449218,45.46289837036133",
				"9.20798225402832,45.47058094177246", true); 
		testMapEvent("Swimming Pool", "2018-01-30", "2018-01-31", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
				"9.20798225402832,45.47058094177246", false);
		testCalendarEvent("Pub", "2018-01-10", "2018-01-11", "9.207509460449218,45.46289837036133",
				"9.20798225402832,45.47058094177246", true);
		testCalendarEvent("Beer", "2018-01-31", "2018-01-31", "9.222615661621093,45.485729333496096",
				"9.143523406982421,45.48989284667969", true);
		testCalendarEvent("Vodka", "2018-01-10", "2018-01-11", "aaaaaaaaaaaa,aaaaaaaaaaaa", "aaaaaaaaaaaa,aaaaaaaaa",
				false);
	}
}
