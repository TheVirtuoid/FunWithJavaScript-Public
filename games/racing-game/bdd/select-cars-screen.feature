Feature: Select Cars Screen

  Scenario: Displaying the screen
    Given I am on the website
    When I navigate to the "Select Cars" page
    Then I should see the "Select Cars" screen
    Then I should see the "Select Cars" title
    Then I should see the a Selection list of 8 cars
    Then I should see a blank Selected list
    Then I should see a "Select Car" button that is disabled
    Then I should see a "Unselect Car" button that is disabled
    Then I should see the "Back" button
    Then I should see the "Exit" button
    Then I should not see the "Select Venue" button
    Then I should not see the "Select Cars" button
    Then I should not see the "Start" button
    Then I should not see the "Pause" button
    Then I should not see the "Resume" button
    Then I should NOT see the "Maximum number of cars selected" message appear

  Scenario: Clicking on a car in the Selection List
    Given I am on the "Select Cars" screen
    When I select a car from the list
    Then I should see a "Select Car" button that is enabled
    Then I should see a "Unselect Car" button that is disabled
    Then I should see the selected car highlighted
    Then I should not see any car in the Selected list highlighted
    Then I should NOT see the "Maximum number of cars selected" message appear

  Scenario: Selecting a car in the Selection List
    Given I am on the "Select Cars" screen
    When I select a car from the list
    And I click on the "Select Car" button
    Then I should see the car in the selected cars list
    Then I should see a "Select Car" button that is disabled
    Then I should see a "Unselect Car" button that is disabled
    Then I should NOT see the car in the Selection cars list
    Then I should NOT see the "Maximum number of cars selected" message appear

  Scenario: Clicking on a car in the Selected List
    Given I am on the "Select Cars" screen
    And I have a car in the Selected List
    When I select a car from the selected list
    Then I should see a "Select Car" button that is disabled
    Then I should see a "Unselect Car" button that is enabled
    Then I should see the car in the selected list highlighted
    Then I should NOT see the "Maximum number of cars selected" message appear

  Scenario: Selecting a car in the Selected List
    Given I am on the "Select Cars" screen
    And I have a car in the Selected List
    When I select a car from the selected list
    And I click on the "Unselect Car" button
    Then I should see the car in the Selection list
    Then I should see a "Select Car" button that is disabled
    Then I should see a "Unselect Car" button that is disabled
    Then I should NOT see the car in the Selected cars list
    Then I should NOT see the "Maximum number of cars selected" message appear

  Scenario: Not able to continue due to too few cars selected
    Given I am on the "Select Cars" screen
    When I have selected 1 car
    Then I should not see the "Select Venue" button
    Then I should NOT see the "Maximum number of cars selected" message appear

  Scenario: Selecting minimum number of cars to continue
    Given I am on the "Select Cars" screen
    When I have selected 2 cars
    Then I should see the "Select Venue" button
    Then I should NOT see the "Maximum number of cars selected" message appear

  Scenario: Selecting maximum number of cars to continue
    Given I am on the "Select Cars" screen
    When I have selected 4 cars
    Then I should see the "Maximum number of cars selected" message appear
    Then I should NOT be able to click on any cars in the Selection list

  Scenario: Going to the Home screen
    Given I am on the "Select Cars" screen
    When I click on the "Back" button
    Then I should be on the "Begin" screen

  Scenario: Going to the Select Venue screen
    Given I am on the "Select Cars" screen
    When I have selected 4 cars
    And I click on the "Select Venue" button
    Then I should be on the "Select Venue" screen
