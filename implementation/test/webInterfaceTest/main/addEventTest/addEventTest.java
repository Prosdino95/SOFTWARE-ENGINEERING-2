package addEventTest;

import java.util.function.Function;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import travlendarTest.LoginTest;
import travlendarTest.Main;

public class addEventTest {
	/**
	 * test the adding of a event
	 * 
	 * @param event_title
	 * @param start_day
	 * @param end_day
	 * @param starting_location
	 * @param meeting_location
	 * @return boolean result
	 */
	public static boolean testSubmitEvent(String event_title, String start_day, String end_day,
			String starting_location, String meeting_location) {
		Main.LOGGER.info("Try to add Event: " + event_title);
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}

		Main.driver.findElement(By.id("add_event")).click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}

		Main.driver.findElement(By.id("event_title")).sendKeys(event_title);
		Main.driver.findElement(By.id("start_day")).sendKeys(start_day);
		Main.driver.findElement(By.id("end_day")).sendKeys(end_day);

		Main.driver.findElement(By.id("starting_location")).sendKeys(starting_location);
		Main.driver.findElement(By.id("meeting_location")).sendKeys(meeting_location);

		Main.driver.findElement(By.id("get_path")).click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
		}

		
	/*	Wait<WebDriver> timer = Main.setTimeOut(20);
		try {
			timer.until(new Function<WebDriver, WebElement>() {
				public WebElement apply(WebDriver driver) {
					return driver.findElement(By.id("route_table"));
				}
			});
		} catch (RuntimeException a) {
			Main.LOGGER.debug("Timeout ended: route_table not found");
			return false;
		}*/
		
		try{
			WebElement myDynamicElement = (new WebDriverWait(Main.driver, 10))
					  .until(ExpectedConditions.presenceOfElementLocated(By.id("route_table")));
		}catch(TimeoutException e){
			Main.LOGGER.debug("Timeout ended: route_table not found");
			return false;	
		}	
	
		try {
			Main.driver.executeScript("document.getElementById('route_0').parentNode.MaterialRadio.check();");
			Main.driver.executeScript("document.getElementById('route_0').click();");
		} catch (Exception e) {
			Main.LOGGER.debug("Bad arguments: impossible to calculate path");
			Main.driver.manage().getCookies().clear();
			Main.driver.quit();
			return false;
		}
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
		}
		Main.driver.findElement(By.id("event_form")).submit();

		Wait<WebDriver> timerTwo = Main.setTimeOut(20);
		try {
			Boolean dialogButton = timerTwo.until(new Function<WebDriver, Boolean>() {
				public Boolean apply(WebDriver driver) {
					return driver.findElement(By.className("close")).isDisplayed();
				}
			});
			Main.driver.findElement(By.className("close")).click();
		} catch (RuntimeException a) {
			Main.LOGGER.debug("Timeout ended: close button not found");
			return false;
		}

		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
		}
		// redirection

		try {
			Main.driver.findElement(By.id("event_title"));
		} catch (NoSuchElementException e) {
			Main.LOGGER.info("Event:" + event_title + " submitted");
		
			return true;
		}
		
		Main.LOGGER.debug("Redirection Failed: still on event submit page");
		return false;

	}
}
