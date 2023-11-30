#!/usr/bin/env node

/*
 *A terminal based application for finding information about movies 
 * 
 *
 */

import axios from "axios";
import chalk from "chalk";
import chalkAnimation from "chalk-animation"
import inquirer from "inquirer";

let movieName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));


async function welcome() {
  const movieTitle = chalkAnimation.neon(`
##   ##    # #    ##   ##  ##    ## ###            ## ###   ##    ##   ##  ## ##    ## ###   ## ###   
### ###   ## ##   ##   ##  ##    ## ###            ## ###   ##    ###  ##  ## ###   ## ###   ## ####  
 ######  ### ###   ## ##   ##    ##                ##       ##     ### ##  ##  ###  ##       ##   ##  
# #####  ##   ##   ##  #   ##    ## ###            ## ###   ##    # #####  ##   ##  ## ###   ## ####  
## # ##  ##   ##    ##     ##    ## ###            ## ###   ##    ## ####  ##   ##  ## ###   ## ###   
##   ##  ### ###    ###    ##    ##                ##       ##    ##  ###  ##  ###  ##       ##    #  
##   ##   ## ##      #     ##    ## ###            ##       ##    ##   ##  ## ###   ## ###   ##   ##  
##   ##    # #       #     ##    ## ###            ##       ##    ##    #  ## ##    ## ###   ##   ##
\n`);
  await sleep()
  movieTitle.stop()
  console.log(`${chalk.blue('Search Movies from your terminal')}`)

  askMovieName();
}

async function askMovieName() {
  const answers = await inquirer.prompt({
    name: 'movie_name',
    type: 'input',
    message: 'Name of the Movie or series?',
    default() {
      return "One piece"
    },
  });
  movieName = answers.movie_name;
  fetchMovieData(movieName, process.env.KEY);
}

async function fetchMovieData(name, key) {
  try {
    const { data } = await axios.get(`https://www.omdbapi.com/?t=${name}&apikey=${key}`)
    dataLogger(data)
  } catch (error) {
    if (error) {
      console.log(chalk.red(''))
    }
  }



}

async function dataLogger(data) {
  let { Title, Plot, Rated, Director, Year, Writer, BoxOffice, imdbRating } = await data
  console.log(`Name: ${chalk.green(Title)}`)
  console.log(`IMDB Rating: ${chalk.green(imdbRating)}`)
  console.log(`Description: ${chalk.blue(Plot)}`)
  console.log(`Writer: ${chalk.green(Writer)}`)
  console.log(`Rating: ${chalk.green(Rated)}`)
  console.log(`Year: ${chalk.green(Year)}`)
  console.log(`Director: ${chalk.green(Director)}`)

}






welcome();

