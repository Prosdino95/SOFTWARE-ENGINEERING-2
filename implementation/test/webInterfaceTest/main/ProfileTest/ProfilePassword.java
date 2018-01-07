package ProfileTest;

import java.util.function.Function;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Wait;

import travlendarTest.LoginTest;
import travlendarTest.Main;

public class ProfilePassword {
	/**
	 * tries to imitate the behavior of a user who is changing is password
	 * 
	 * @param currentPassword
	 * @param newPassword
	 * @param retypePassword
	 * @return boolean testResult
	 */
	public static boolean passwordTest(String currentPassword, String newPassword, String retypePassword) {

		Main.LOGGER.info("Profile change password");
		// close
		Main.driver.executeScript("document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer()");
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
		}

		// click password menu
		Main.driver.executeScript("document.querySelector('#profile_password_link').click()");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}

		Main.driver.findElement(By.id("current_password")).clear();
		Main.driver.findElement(By.id("new_password")).clear();
		Main.driver.findElement(By.id("retype_new_password")).clear();

		Main.driver.findElement(By.id("current_password")).sendKeys(currentPassword);
		Main.driver.findElement(By.id("new_password")).sendKeys(newPassword);
		Main.driver.findElement(By.id("retype_new_password")).sendKeys(retypePassword);

		Main.driver.findElement(By.id("submit_password")).click();
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

		Main.driver.manage().getCookies().clear();
		Main.driver.quit();

		Main.LOGGER.debug("Trying to reconnect with new password: " + newPassword);
		boolean result = LoginTest.newSession(newPassword);
		if (result) {
			Main.LOGGER.info("New Password is Valid");
			return true;
		}
		Main.LOGGER.debug("New Password is not Valid");
		return false;
	}
}