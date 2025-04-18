Feature: Exit the Game

  Scenario: Displaying the Exit screen
    Given I have launched the racing game
    When I have moved to the "Exit Game" screen
    Then I should see the "Exit Game" screen
    Then I should see the Thank You For Playing message
    Then I should see the "New" button is inactive
    Then I should see the "Exit" button is inactive
    Then I should see the "Back" button is inactive
    Then I should see the "Start" button is inactive
    Then I should see the "Pause" button is inactive
    Then I should see the "Resume" button is inactive
    Then I should see the "Cancel" button is inactive
