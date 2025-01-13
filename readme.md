# URL Shortener

## Overview
This project is a URL shortener service that allows users to shorten long URLs into shorter, more manageable links. It provides a simple and efficient way to share links on social media, emails, and other platforms where space is limited.

## Features
- Shorten long URLs
- Redirect to the original URL using the shortened link
- Track the number of clicks on each shortened URL
- View the list of shortened URLs (not by user, but by current session of user)

### Additional Features
- Rate limiting to prevent abuse
- In memory cache to improve performance
- Dockerized application for easy deployment

## Installation
1. Clone the repository:
    ```
    git clone https://github.com/hanumanum/url-shortener.git
    ```
2. Navigate to the project directory:
    ```
    cd url-shortener
    ```
3. Run docker:
    ```
    docker compose up
    ```
4. Access the application:

Open your browser and navigate to `http://localhost:9999`

## Desclaimer
This project is for educational purposes only. It is not intended for production use.
This project has some incomplete features and ideas to implement, see TODOs and comments in the code.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.