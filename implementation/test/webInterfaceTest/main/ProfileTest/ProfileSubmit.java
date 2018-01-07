package ProfileTest;

import java.util.function.Function;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Wait;

import travlendarTest.Main;

public class ProfileSubmit {

	/**
	 * test if new first name is displayed correctly on the drawer
	 * 
	 * @param firstName
	 * @param lastName
	 * @return boolean result
	 */
	public static boolean firstNameTest(String firstName, String lastName) {

		Main.LOGGER.info("Profile submit information");
		// close
		Main.driver.executeScript("document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}

		Main.driver.findElement(By.id("first_name")).clear();
		Main.driver.findElement(By.id("last_name")).clear();
		Main.driver.findElement(By.id("first_name")).sendKeys(firstName);
		Main.driver.findElement(By.id("last_name")).sendKeys(lastName);
		if (Main.driver.findElement(By.id("email")).isEnabled()) {
			Main.LOGGER.debug("Email form is Enabled - NOT BY DEFAULT");
			return false;
		}

		Main.driver.findElement(By.id("information-panel")).submit();
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

		// open
		Main.driver.executeScript("document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}

		WebElement welcome = Main.getElement("welcome");
		if (welcome == null) {
			return false;
		}
		welcome.click();
		// close
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}
		// close
		Main.driver.executeScript("document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()");

		// name in drawer
		WebElement drawerName = Main.getElement("first_name_drawer");
		if (drawerName == null) {
			return false;
		}

		Main.driver.executeScript("document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}

		WebElement profile = Main.getElement("profile");
		if (profile == null) {
			return false;
		}
		profile.click();

		Main.driver.executeScript("document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()");
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
		}
		// name updated
		WebElement firstNameText = Main.driver.findElement(By.id("first_name"));
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
		}

	
		if (!firstName.equals(drawerName.getText())) {
			Main.LOGGER.info("Drawer First name and Profile first name: not equal");
			Main.LOGGER.debug(
					"Drawer First name: " + drawerName.getText() + " Profile first name: " + firstNameText.getText());
			Main.LOGGER.debug("Drawer First name and Profile first name: not equal");

			return false;
		}
		Main.LOGGER.info("Drawer First name and Profile first name: equal");
		return true;
	}
}
