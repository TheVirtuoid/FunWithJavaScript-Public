Feature: Working with the Final Results Dialog Box

  Scenario: Displaying the dialog box
    Given I have launched the racing game
    And the racing game has completed a track run
    When the race has finished
    Then I should see the "Final Results" dialog box
    Then I should see final times for each car
    Then I should see the "OK" button

  Scenario: Pressing the "OK" button
    Given The dialog box has appeared on the screen
    When I click on the "OK" button
    Then I should see the dialog box disappear
