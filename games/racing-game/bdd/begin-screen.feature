Feature: Game Flow - Begin
  Tests the beginning of the game

  Scenario: Start the game
    Given I navigate to the "begin" page
    When The first screen appears
    Then I should see the header menu
    Then I should see the main
    Then I should see the footer
    Then I should see the "racing game" title
    Then I should see the "Begin" screen
    Then I should not see the "Select cars" screen
    Then I should not see the "Select Venue" screen
    Then I should not see the "Venue" screen

  Scenario: What buttons are displayed
    Given I have launched the racing game
    When The first screen appears
    Then I should see the "Select Cars" button
    Then I should see the "Exit" button
    Then I should not see the "Back" button
    Then I should not see the "Select Venue" button
    Then I should not see the "Race" button
    Then I should not see the "Pause" button
    Then I should not see the "Resume" button




















