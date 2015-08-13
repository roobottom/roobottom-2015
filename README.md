# roobottom.com
My personal site. **Currently in development**

## How this works
This site is hosted on Github pages. It's images (of which there are many) are (currently) hosted in my public dropbox folder. 

## Deploying
As there's a bit more going on here than just a simple Jekyll site hosted on Github pages, there's some pre-processing that goes on before deployment. A Gruntfile takes care of all the heavy lifting here.

To build the site locally:

`cd /Users/roobottom/git/roobottom.com`
`jekyll build --config _dev.yml --watch`

To process the site, read for deplyoment:

`grunt publish`

_more to follow here when site reaches v1.0_
