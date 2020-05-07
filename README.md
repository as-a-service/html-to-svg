# Saves the given URL to an SVG file

A simple web service that saves the given URL to an SVG immage.

Run with `docker run -p 8080:8080 gcr.io/as-a-service-dev/html-to-svg`

[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://deploy.cloud.run)

## API

### URL parameters:

* `url`: The URL of the website to capture

Example: `/?url=https://steren.fr`

## Running the server locally

* Build with `docker build . -t html-to-svg`
* Start with `docker run -p 8080:8080 html-to-svg`
* Open in your browser at `http://localhost:8080/?url=https://steren.fr`
