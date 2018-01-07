package PreferenceTest;

import java.util.function.Function;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Wait;

import travlendarTest.Main;

public class PreferenceSubmit {
/**
 * test the submit of preference
 * @param preferenceToSet
 * @param preferenceWanted
 * @return
 */
	public static boolean testSubmitPreference(String[] preferenceToSet, String[] preferenceWanted) {
		// wait
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}
		// clear
		Main.driver.executeScript("document.querySelector('#foot').MaterialIconToggle.uncheck()");
		Main.driver.executeScript("document.querySelector('#bike').MaterialIconToggle.uncheck()");
		Main.driver.executeScript("document.querySelector('#car').MaterialIconToggle.uncheck()");
		Main.driver.executeScript("document.querySelector('#public_transport').MaterialIconToggle.uncheck()");
		Main.driver.executeScript("document.querySelector('#train').MaterialIconToggle.uncheck()");
		Main.driver.executeScript("document.querySelector('#airplane').MaterialIconToggle.uncheck()");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}

		for (String preference : preferenceToSet) {
			try {
				Main.driver.findElement(By.id(preference));
				Main.driver.executeScript("document.querySelector('#" + preference + "').MaterialIconToggle.check()");
				Main.LOGGER.info("Preference to submit: " + preference + " SELECTED");
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
				}
			} catch (Exception e) {
				Main.LOGGER.debug("Preference to submit: " + preference + " INVALID");
				return false;
			}
		}

		Main.driver.findElement(By.id("submit-preferences")).click();
		// handles dialog button
		try {
			Wait<WebDriver> timer = Main.setTimeOut(10);
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

		// refresh page
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
		}
		Main.driver.executeScript("document.querySelector('#welcome').click()");
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
		}
		Main.driver.executeScript("document.querySelector('#preferences').click()");
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
		}

		if (preferenceWanted.length != preferenceToSet.length) {
			Main.LOGGER.debug("Preference desired and wanted are not same number....aborting");
			return false;
		}

		for (String preference : preferenceWanted) {
			try {
				if (!Main.driver.findElement(By.id(preference)).isSelected()) {
					Main.LOGGER.debug("Preference desidered not submitted: " + preference + " ....aborting");
					return false;
				}
				;
			} catch (Exception e) {
				Main.LOGGER.debug("Preference wanted: " + preference + " INVALID");
				return false;
			}
			Main.LOGGER.info("Preference wanted: " + preference + " is SELECTED");
		}
		return true;
	}
}
