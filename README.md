# Countries to Cities

A simple API to get list of country names and/or city names. Visit [Heroku page](https://countries-to-cities.herokuapp.com) for complete more details.

## How to use?

The API can be used to get country names and cities:

### To get Country names

Use _getCountry_ to get country

**type**
- `_url_/getCountry?type=array` to get as list of country names in single array.
- `_url_/getCountry?type=object` to get as list of country names as objects.

**contains**
- `_url_/getCountry?contains=<substring>` returns list of countries whose name contains _<substring>_.

### To get City names

Use _getCity_ to get country

**country**
- `_url_/getCountry?country=<name>` returns list of cities in country named _<name>_.

## Credits

Data is derived from  [David-Haim's repo](https://github.com/David-Haim/CountriesToCitiesJSON).
