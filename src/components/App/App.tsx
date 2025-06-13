import css from './App.module.css';

const App = () => {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
        <button className={css.button}>Create note +</button>
      </header>

      {/* Компонент NoteList */}
    </div>
  );
};

export default App;