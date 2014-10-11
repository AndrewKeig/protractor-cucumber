Feature: Homepage 
  As a user
  I want to visit the homepage
  So that I can access the various features on offer

  Scenario: Visit Homepage
    Given I am on the homepage
    Then I should see a "navbar"
    And I should see a "login" link
    And I should see a "register" link
