Feature: Select Cars Screen

  Scenario: Displaying the screen
    Given I see the "Select Cars" screen
    When I take a look at it
    Then I should see the "Select Cars" title
    Then I should see the a Selection list of 10 carst
    Then I should see a blank Selected list
    Then I should see a "Select" button that is inactive
    Then I should see a "Unselect" button that is inactive
    Then I should see a "Select Track" button inactive
    Then I should see a "Start" button that is inactive
    Then I should see a "Back" button that is inactive
    Then I should see a "Exit" button that is active
    Then I should see a "Pause" button that is inactive
    Then I should see a "Resume" button that is inactive
    Then I should see a "Cancel" button that is active

  Scenario: Clicking on a car in the Selection List
    Given I see the "Select Cars" screen
    When I select a car from the list
    Then I should see the "Select" button is active
    Then I should not see any car in the Selected list highlighted
    Then I should see the "Unselec" button is inactive

  Scenario: Selecting a car in the Selection List
    Given I see the "Select Cars" screen
    When I select a car from the list
    And I click on the "Select" button
    Then I should see the car in the selected cars list
    Then I should see the "Unselect" button is inactive
    Then I should see the "Select" button is inactive
    Then I should NOT see the car in the Selection cars list

  Scenario: Clicking on a car in the Selected List
    Given I have a car in the Selected List
    When I select a car from the selected list
    Then I should see the "Unselect" button is active
    Then I should see the "Select" button is inactive
    Then I should see no cars in the Selection list highlighted

  Scenario: Selecting a car in the Selected List
    Given I have a car in the Selected List
    When I select a car from the selected list
    And I click on the "Unselect" button
    Then I should see the car in the Selection list
    Then I should see the "Select" button is inactive
    Then I should see the "Unselect" button is inactive
    Then I should NOT see the car in the Selected cars list

  Scenario: Not able to continue due to too few cars selected
    Given I see the "Select Cars" screen
    When I have selected 1 car
    Then I should see the "Select Track" button inactive

  Scenario: Selecting minimum number of cars to continue
    Given I see the "Select Cars" screen
    When I have selected 2 cars
    Then I should see the "Select Track" button active

  Scenario: Selecting maximum number of cars to continue
    Given I see the "Select Cars" screen
    When I have selected 4 cars
    Then I should see the "Maximum number of cars selected" message appear
    Then I should NOT be able to click on any cars in the Selection list
    Then I should NOT be able to click on any cars in the Selected list

  Scenario: Continuing to the "Select Track" screen
    Given I see the "Select Cars" screen
    When I have selected 2 cars
    And I click on the "Select Track" button
    Then I should see the "Select Track" screen

