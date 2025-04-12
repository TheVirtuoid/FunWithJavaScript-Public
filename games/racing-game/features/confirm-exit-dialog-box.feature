Feature: Exit Dialog Box

  Scenario: Displaying the Exit dialog box
    Given I have launched the racing game
    When I have activated the "Exit" button
    Then I should see the "Confirm Exit" dialog box
    Then I should see the "Yes" button
    Then I should see the "No" button

  Scenario: Answering "Yes" to the Exit dialog box
    Given I have activated the Exit dialog box
    When I click on the "Yes" buton
    Then I should see the dialog box disappear
    Then I should go to the "Exit" screen

  Scenario: Answering "No" to the Exit dialog box
    Given I have activated the Exit dialog box
    When I click on the "No" button
    Then I should see the dialog box disappear
    Then I should go back to the previous screen
