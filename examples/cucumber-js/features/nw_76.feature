Feature: Google Search-76
Background: Background name
  Given I open the Rijksmuseum page
  And I dismiss the cookie dialog
  Then the title is "Rijksmuseum Amsterdam, home of the Dutch masters"
  
@a @b
Scenario: Searching the Rijksmuseum-151
  Given I search "night watch"
  Then Body contains "Operation Night Watch"
  
@a @b
Scenario: Searching the Rijksmuseum-152
  Given I search "night watch"
  Then Body contains "The Night Watch, Rembrandt van Rijn, 1642"
