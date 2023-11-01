## Roll Tracker

This website was created to cater to the coin roll hunting community as a way to track their CRH journey. It allows the user to log each hunt, keep track of the total dollar value of coins searched, and earn points for each find.  After each logged hunt, users can navigate to their profile to view their total coin inventory and updated score.

## Tech Stack
- Frontend
	- React, Javascript, css, Material UI
- Backend
	- Django
	- Database: Postgres
- Other
	- Docker for containerization
	- AWS for deployment
### Website Tour
Pages:
- Start Here
	- Provides users with a starting point for learning how to coin roll hunt and offers guidance on what to collect.
- Scoring 
	- Displays scores for various coin categories, offering users a clear reference to understand the scoring system.
- Hunt Log
	- Offers a user-friendly interface for documenting coin hunts. Begin by specifying the total dollar value of the coins searched. Then, easily search for coins by criteria such as year, mint mark, and type. As users discover and add coins to their log, the system continuously updates the total hunt score.
- Profile
	- Showcases the user's complete coin collection, providing an overview of their cumulative dollar value searched and the total collection score. Each entry is accompanied by clickable link leading to a more detailed page for a selected coin, although not all coins have available data. 

### Installation
To run this on your local machine please follow the instructions below:

- This project is containerized using docker to reduce dependency issues so docker must be installed on your local machine. [Docker installation](https://www.docker.com/get-started/)
- An API Key is required to access detailed coin information and can be acquired from the PCGS API documentation. [PCGS documentation](https://www.pcgs.com/publicapi/documentation)

1. Run the command below from the projects root directory to allow execute permissions

```
chmod 755 run-commpose-dev.sh
```

2. Run the file that execute permissions were given to in the first step and pass in the API key from PCGS as the first parameter

```
./run-compose-dev.sh <API_key_here>
```

3. Navigate to `localhost:80` in your browser


## Challenges

- Due to the niche nature of coin roll hunting, obtaining comprehensive data posed a challenge. To address this, I leveraged the [Numista API](https://en.numista.com/api/doc/index.php) to collect initial data. However, the data required some adjustments, including the addition of specific fields and formatting to make it suitable for seeding the database. These modifications necessitated a database setup that deviated from my initial preferences, which in turn presented some complexities in executing certain queries. This could cause scaling issues and may need to be re-designed.

## Features Wish List 

Once I finalize the new database design and establish a strategy for acquiring and seeding the complete dataset, here are some additional features I would like to add:

- Provide users with the ability to browse through other collectors' collections
- Add a leaderboard with a ranking system
- Present users with analytics on their profile, illustrating their collection's growth and progress since they started
- Enhance coin detail pages by including a list of collectors who own the same coin, with clickable usernames for quick profile access
- Facilitate user-driven content by allowing the upload of coin photos
- Enrich the user experience with an expanded collection of educational resources
- Expand the scope by incorporating more coin denominations
- Authentication using JSON web tokens
