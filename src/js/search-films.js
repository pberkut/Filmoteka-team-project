// функція пошуку та відображення фільмів

import { MovieAPI } from './MoviesApiServise';
import { createMarkupFilmsList } from './markup';
import { DataService } from './data-service';
import { pagination } from './pagination';
import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Spinner } from './spinner';

const spinner = new Spinner();
const dataService = new DataService();

const movieAPI = new MovieAPI();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const formValue = e.currentTarget.elements.searchQuery.value.trim();
  refs.notCorrectNotification.classList.remove(
    'films__not-correct-notification-show'
  );
  refs.noMoviesNotification.classList.remove(
    'films__no-movies-notification-show'
  );
  refs.noMoviesNotification.classList.add('visually-hidden');
  if (!formValue) {
    refs.notCorrectNotification.classList.add(
      'films__not-correct-notification-show'
    );
    return;
  }

  refs.moviesList.innerHTML = '';

  //   MovieAPI.resetPage();

  movieAPI.query = formValue;
  spinner.start();
  movieAPI
    .getSearchMovies()
    .then(data => {
      refs.notCorrectNotification.classList.remove(
        'films__not-correct-notification-show'
      );
      refs.noMoviesNotification.classList.remove(
        'films__no-movies-notification-show'
      );
      refs.searchErrorImg.classList.add('visually-hidden');
      if (data.results.length === 0) {
        refs.searchErrorImg.classList.remove('visually-hidden');
        refs.noMoviesNotification.classList.add(
          'films__no-movies-notification-show'
        );
        refs.noMoviesNotification.classList.remove('visually-hidden');
        refs.containerPagAll.classList.add('visually-hidden');
        return;
      }
      refs.containerPagAll.classList.remove('visually-hidden');
      pagination(data);

      const necessaryData = dataService.getDataTrendMovies(data.results);
      const markupTrendMovies = createMarkupFilmsList(necessaryData);
      refs.moviesList.innerHTML = markupTrendMovies;
    })
    .catch(err => Notify.failure(err))
    .finally(() => {
      spinner.stop();
    });
}

//////////filter////////////
refs.filterNowPlaying.addEventListener('click', getNowPlaying);

function getNowPlaying(e) {
  e.preventDefault();

  refs.moviesList.innerHTML = '';

  spinner.start();

  movieAPI
    .getNowPlaying()
    .then(data => {
      pagination(data);

      const necessaryData = dataService.getDataTrendMovies(data.results);
      const markupTrendMovies = createMarkupFilmsList(necessaryData);
      refs.moviesList.innerHTML = markupTrendMovies;
    })
    .catch(err => Notify.failure(err))
    .finally(() => {
      spinner.stop();
    });
}

refs.filterPopular.addEventListener('click', getPopular);

function getPopular(e) {
  e.preventDefault();

  refs.moviesList.innerHTML = '';

  spinner.start();

  movieAPI
    .getPopular()
    .then(data => {
      pagination(data);

      const necessaryData = dataService.getDataTrendMovies(data.results);
      const markupTrendMovies = createMarkupFilmsList(necessaryData);
      refs.moviesList.innerHTML = markupTrendMovies;
    })
    .catch(err => Notify.failure(err))
    .finally(() => {
      spinner.stop();
    });
}

refs.filterTopRated.addEventListener('click', getTopRated);

function getTopRated(e) {
  e.preventDefault();

  refs.moviesList.innerHTML = '';

  spinner.start();

  movieAPI
    .getTopRated()
    .then(data => {
      pagination(data);

      const necessaryData = dataService.getDataTrendMovies(data.results);
      const markupTrendMovies = createMarkupFilmsList(necessaryData);
      refs.moviesList.innerHTML = markupTrendMovies;
    })
    .catch(err => Notify.failure(err))
    .finally(() => {
      spinner.stop();
    });
}

refs.filterUpcoming.addEventListener('click', getUpcoming);

function getUpcoming(e) {
  e.preventDefault();

  refs.moviesList.innerHTML = '';

  spinner.start();

  movieAPI
    .getUpcoming()
    .then(data => {
      pagination(data);

      const necessaryData = dataService.getDataTrendMovies(data.results);
      const markupTrendMovies = createMarkupFilmsList(necessaryData);
      refs.moviesList.innerHTML = markupTrendMovies;
    })
    .catch(err => Notify.failure(err))
    .finally(() => {
      spinner.stop();
    });
}
