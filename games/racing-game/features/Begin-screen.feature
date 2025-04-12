Feature: Game Flow - Begin
  Tests the beginning of the game

  Scenario: Start the game
    Given I have launched the racin game
    When The first screen appeaars
    Then I should see the header menu
    Then I should see the footer
    Then I should see the "Racing Game" title

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
    When I click on the "New" button
    Then I should see the "Select Cars" screen

  Scenario: Activating the "Exit" button
    Given I have launched the racing game
    When I click on the "Exit" button
    Then I should see the "Confirm Exit" dialog box

