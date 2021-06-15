//🍅Тут импорт стилей:
import './sass/main.scss';
//🍅Тут импорт js файлов:
import './js/components/theme-switcher.js';
import './js/components/localStorage';
import './js/components/team-modal';
import './js/components/librery-render-marcup';
import { featchFilmsByIdWatched } from './js/components/librery-render-marcup';
import { featchFilmsByIdQueue } from './js/components/librery-render-marcup';
featchFilmsByIdWatched();
featchFilmsByIdQueue();
