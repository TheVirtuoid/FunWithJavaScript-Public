Feature: Game Flow - Begin
  Tests the beginning of the game

  Scenario: Start the game
    Given I navigate to the "begin" page
    When The first screen appears
    Then I should see the header menu
    Then I should see the main
    Then I should see the footer
    Then I should see the "racing game" title
    Then I should not see the "select cars" screen
    Then I should not see the "venue" screen

  Scenario: What buttons are displayed
    Given I have launched the racing game
    When The first screen appears
    Then I should see the "New" button
    Then I should see the "Exit" button
    Then I should see the "Back" button
    Then I should see the "Start" button
    Then I should see the "Pause" button
    Then I should see the "Resume" button
    Then I should see the "Cancel" button
    Then I should see no other buttons than the ones mentioned

  Scenario: What buttons are active
    Given I have launched the racing game
    When The first screen appears
    Then I should see the "New" button is active
    Then I should see the "Exit" button is active
    Then I should see the "Back" button is inactive
    Then I should see the "Start" button is inactive
    Then I should see the "Pause" button is inactive
    Then I should see the "Resume" button is inactive
    Then I should see the "Cancel" button is inactive

  Scenario: Activating the "New" button
    Given I have launched the racing game
    When The first screen appears
    And I click on the "New" button
    Then I should see the "Select Cars" screen

  Scenario: Activating the "Exit" button
    Given I have launched the racing game
    When The first screen appears
    And I click on the "Exit" button
    Then I should see the "Confirm Exit" dialog box























