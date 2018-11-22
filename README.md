# Takes a screenshot of the given page

A simple web service that takes screenshot of the given URL

## API

### URL parameters:

* `url`: The URL of the website to screenshot

Example: `/?url=https://steren.fr`

## Running the server locally

* Build with `docker build . -t screenshot`
* Start with `docker run -p 8080:8080 screenshot`
* Open in your browser at `http://localhost:8080/?url=https://steren.fr`