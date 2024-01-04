Feature: Google Search-74
Background: Background name
  Given I open the Rijksmuseum page
  And I dismiss the cookie dialog
  Then the title is "Rijksmuseum Amsterdam, home of the Dutch masters"
  
@a @b
Scenario: Searching the Rijksmuseum-147
  Given I search "night watch"
  Then Body contains "Operation Night Watch"
  
@a @b
Scenario: Searching the Rijksmuseum-148
  Given I search "night watch"
  Then Body contains "The Night Watch, Rembrandt van Rijn, 1642"
