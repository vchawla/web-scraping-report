# Scraping Dashboard

## Live URL

The dashboard is hosted at https://immutable-web-scraping.web.app/

## Section 1

Section 1 shows aggregate comparison and Leaderboard of different blockchain.<br/>
The data is extracted from Firebase Firestore which is saved by scripts that are part of [web-scraping-scripts](https://github.com/vchawla/web-scrpaing-scripts).<br />



## Section 2

Section 2 shows difference in sales, buyers and transactions by Projects.<br/>
Currently data is collected for only 3 projects - Immutaswap.io, Illuvium, Gods Unchained

## Future enhancements

### Section 1
1.] Add comma in the numbers in the leaderboard table for better readability. Currently comma is skipped because of table sort functionality <br />
2.] The UI can be enhanced with more elegant templates <br/>
3.] Powerful visualizations can be implemented by using [D3.js](https://d3js.org/)
4.] Data fetch timestamp to be made dynamic
5.] Security aspects to be reviewed and addressed if needed

### Section 2
1.] Currently only 3 project data is available. But the scraper script can be run for any number of projects as needed
2.] Numbers in tables can be properly formatted


## Disclaimer

These crawlers have been implemented for assignment/education purposes. Legal teams of respective websites should be consulted with for any production implementation

### References

[https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb) <br/>
[https://www.youtube.com/watch?v=w7xKZ5PWizs](https://www.youtube.com/watch?v=w7xKZ5PWizs) <br/>
[http://tabulator.info/](http://tabulator.info/)