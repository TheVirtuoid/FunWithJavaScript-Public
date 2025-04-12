Feature: Start Race Screen

  Scenario: Displaying the initial screen
    Given I had landed on the "Start Race" screen
    When I gaze lovingly upon the work of art I have created
    Then I should see the scroreboard displayed
    Then I should see the track displayed
    Then I should see the cars placed on the track at the starting line
    Then I should see the "Start" button that is active
    Then I should see the "Back" button that is active
    Then I should see the "Exit" button that is active
    Then I should see the "Pause" button that is inactive
    Then I should see the "Resume" button that is inactive
    Then I should see the "Cancel" button that is inactive

  Scenario: Starting the Race
    Given I have handed on the "Start Race" screen
    When I activate the "Start" button
    Then I should see the countdown timer begin counting down
    Then I should see the "Start" button is inactive
    Then I should see the "Back" button is active
    Then I should see the "Exit" button is active
    Then I should see the "Pause" button is active
    Then I should see the "Resume" button is inactive
    Then I should see the "Cancel" button is active

  Scenario: The race has begun
    Given I see the "Start Race" screen
    When The countdown timer has reached zero
    Then I should see the race timer starting
    Then I sholld see the starting gate open
    Then I should see the cars begin to move down the track

  Scenario: The race is paused
    Given The race has been started
    When I activate the "Pause" button
    Then I should see the Pause Message on the screen
    Then I should see the cars stop
    Then I should see the race timer stop
    Then I should see the "Start" button is inactive
    Then I should see the "Back" button is active
    Then I should see the "Exit" button is active
    Then I should see the "Pause" button is inactive
    Then I should see the "Resume" button is active
    Then I should see the "Cancel" button is active

  Scenario: The race is resumed
    Given The race has been paused
    When I active the "Resume" button
    Then I should see the Pause Message disappear
    Then I should see the race timer resume
    Then I shuold see the motion of the cars resume
    Then I should see the "Start" button is inactive
    Then I should see the "Back" button is active
    Then I should see the "Exit" button is active
    Then I should see the "Pause" button is active
    Then I should see the "Resume" button is inactive
    Then I should see the "Cancel" button is active

  Scenario: A car has crossed the finish line
    Given The race has begun
    When A car crosses the finish line
    Then I should see the car ID and the car's time posted in the scoreboard

  Scenario: The race has been determined to be finished
    Given The race has begun
    When All four cars have crossed the finish line or have remained motionless for 5 seconds
    Then I should see any cars that did not cross the finish line get posted to the scoreboard as a DNF
    Then I should see the results of the scoreboard posted to localStorage
    Then I should see the "Final Result" dialog box

  Scenario: The "Final Result" dialog box has clicked OK
    Given The race has been run
    And The "Final Results" dialog box is displayed
    And I have clicked on the "OK" button
    Then I should see the "Begin" screen.


