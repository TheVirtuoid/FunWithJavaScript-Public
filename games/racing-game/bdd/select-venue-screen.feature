Feature: Select Venue Screen

  Scenario: Displaying the screen
    Given I am on the website
    When I navigate to the "Select Venue" page
    Then I should see the "Select Venue" screen
    Then I should see the "Select Venue" title
    Then I should see the a Selection list of 3 venues
    Then I should see a blank Selected list
    Then I should see a "Select Venue" button that is disabled
    Then I should see the "Back" button
    Then I should see the "Exit" button
    Then I should not see the "Select Venue" button
    Then I should not see the "Select Cars" button
    Then I should not see the "Start" button
    Then I should not see the "Pause" button
    Then I should not see the "Resume" button

  Scenario: Clicking on a venue in the Selection List
    Given I am on the "Select Venue" screen
    When I select a venue from the list
    Then I should see a "Select Venue" button that is enabled
    Then I should see the selected venue highlighted

  Scenario: Deselecting a venue
    Given I am on the "Select Venue" screen
    When I select a venue from the list
    And I select the same venue from the list
    Then The venue should be deselected

  Scenario: Selecting a venu then another
    Given I am on the "Select Venue" screen
    When I select a venue from the list
    And I select another venue from the list
    Then The first venue should be deselected
    Then The second venue should be selected

  Scenario: Selecting a venue in the Selection List
    Given I am on the "Select Venue" screen
    When I select a venue from the list
    And I click on the "Select Venue" button
    Then I should go to the Racing screen


