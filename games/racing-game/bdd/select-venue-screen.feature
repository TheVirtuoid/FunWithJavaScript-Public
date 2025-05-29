Feature: Select Track Screen

  Scenario: Displaying the screen
    Given I see the "Select Track" screen
    When I take a look at it
    Then I should see the "Select Track" title
    Then I should see the a Selection list of 5 layouts
    Then I should see a blank Selected Track
    Then I should see a "Select" button that is inactive
    Then I should see a "Unselect" button that is inactive
    Then I should see a "Start Race" button inactive
    Then I should see a "Start" button that is inactive
    Then I should see a "Back" button that is active
    Then I should see a "Exit" button that is active
    Then I should see a "Pause" button that is inactive
    Then I should see a "Resume" button that is inactive
    Then I should see a "Cancel" button that is active

  Scenario: Clicking on a track in the Selection List
    Given I see the "Select Track" screen
    When I select a track from the list
    Then I should see the "Select" button is active
    Then I should see the "Unselect" button is inactive

  Scenario: Selecting a track in the Selection List
    Given I see the "Select track" screen
    When I select a track from the list
    And I click on the "Select" button
    Then I should see the track in the selected track space
    Then I should see the "Unselect" button is active
    Then I should see the "Select" button is inactive
    Then I should NOT see the track in the Selection track list

  Scenario: Selecting a track to be Unselected
    Given I have a track in the Selected Space
    When I click on the "Unselect" button
    Then I should see the track in the Selection list
    Then I should see the "Select" button is inactive
    Then I should see the "Unselect" button is inactive
    Then I should NOT see any track in the Selected space

  Scenario: Continuing to the "Start Race" screen
    Given I see the "Select track" screen
    When I have selected a track
    And I click on the "Start Race" button
    Then I should see the "Start Race" screen
