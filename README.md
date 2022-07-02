# 1. Project 1 : Operations Monitoring System (OMS)
The OMS is a webapp for companies to manage their operations with features such as:
- Address Search
- Location Services
- Real-time weather data
- Incident logging and tracking


## Link to access:
https://lunfy.github.io/OMS/index.html

<br>

# 2. Built With
- HTML
- CSS (Local, Bootstrap, OneMap-leafletjs
- Javascript (Local, Bootstrap, OneMap-leafletjs

<br>

# 3.Concepts and Features Used
- Arrow Functions
- Callback Functions
- Switch Cases
- If-Else
- For loops, forEach
- DOM Manipulation
- Marquee
- Events + Handlers (Click, Load, Change)
- Fetch (async-await)
- localStorage (setItem, getItem, removeItem, key)

- Fetch OneMap REST API for location data and services
  - Navigator.Geolocation (Show current position)
  - Search (Returns address details and location coordinates from specified parameters)
  
- Fetch Data.gov.sg for weather+location data
  - 2-hour Weather Forecast API for real-time weather, island-wide locations
  - 4-day Weather Forecast API for current general forecast
  
- OneMap-leafletjs functions to translate fetched location data to display on map
  - Markers:
    - Location Pins
    - Customized Icons for weather forecast page
  - Layers:
    - Applied layer groups as overlays to toggle marker groups on/off the map
    - Basemap for other map themes (Dark, Light, Sattelite)

- Bootstrap:
  - Dynamic pagination (populated via fetched REST API)
  - Form Control:
    - Modals
    - Dynamic datalists (populated via fetched REST API)
  - Tables (populated via fetched REST API or localStorage)
  
<br>

# 4. Challenges
- Unable to implement Previous, Next buttons for dynamic pagination beyond set 20 pages (got stuck for 1 day)
- Writing and repeating code that could be refactored
- Reading the leafletjs documentation. Eventually realized they had tutorials which were really helpful in figuring out the syntax and structure

<br>

# 5. Things I Would Like to Improve On/Implement with more time
- Implement Next and Previous for dynamic pagination
- Light/Dark mode theme changes
- More baselayers for OneMap to switch to (Light, Street, Sattelite)
- More weather data that can be toggled on/off on weather page
- Incident location marking with custom icons
- Complete resource management page
- Make it mobile-responsive
- Use a database instead of localStorage
- Use advanced functions from OneMap with POST requests and authentication service
  - Destination routing, map object themes (schools, food centres, etc)
- Refactor alot of code
- Consistency with how I write code (switched styles midway but did not change the previous ones)
  - Example: Using .then, async/await, onclick vs eventlistener vs setAttribute(click,fn)...
