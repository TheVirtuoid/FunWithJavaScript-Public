Feature: Exit Dialog Box

  Scenario: Displaying the Exit dialog box
    Given I have launched the racing game
    When I click on the "Exit" button
    Then I should see the "Confirm Exit" dialog box
    Then I should see the "Yes" button
    Then I should see the "No" button
    Then The "No" button should have focus

  Scenario: Answering "Yes" to the Exit dialog box
    Given I have activated the Exit dialog box
    When I click on the "Yes" button
    Then I should see the dialog box disappear
    Then I should be on the "Begin" screen

  Scenario: Answering "No" to the Exit dialog box
    Given I have activated the Exit dialog box
    When I click on the "No" button
    Then I should see the dialog box disappear
