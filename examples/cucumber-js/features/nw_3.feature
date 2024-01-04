Feature: Google Search-3
Background: Background name
  Given I open the Rijksmuseum page
  And I dismiss the cookie dialog
  Then the title is "Rijksmuseum Amsterdam, home of the Dutch masters"

@a @b
Scenario: Searching the Rijksmuseum-5
  Given I search "night watch"
  Then Body contains "Operation Nigh"

@a @b
Scenario: Searching the Rijksmuseum-6
  Given I search "night watch"
  Then Body contains "The Night Watch, Rembrandt van Rijn, "
