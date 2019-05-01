# Takes a screenshot of the given page

A simple web service that takes screenshot of the given URL.

Run with `docker run -p 8080:8080 gcr.io/as-a-service-dev/screenshot`

[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.png)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=https://github.com/as-a-service/screenshot.git)

## API

### URL parameters:

* `url`: The URL of the website to screenshot

Example: `/?url=https://steren.fr`

## Running the server locally

* Build with `docker build . -t screenshot`
* Start with `docker run -p 8080:8080 screenshot`
* Open in your browser at `http://localhost:8080/?url=https://steren.fr`
