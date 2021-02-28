import React, { useState } from 'react';

import SearchButton from './components/SearchButton';
import MovieInput from './components/MovieInput';

const App = () => {
    const [ movie, setMovie]  = useState( "" );

    const submit = () => {
        if ( !movie ) {
            alert( "You didn't choose any movie!" );
        } else {
            alert( "Your movie of interest is: " + movie );
        }
    };

    const setMovieName = ( name ) => {
        setMovie( name );
    };

    return (
        <div id="app">
            <div className="wrapper">
                <div className="content">
                    <div className="module d-flex align-items-center">
                        <form onSubmit={ submit } spellCheck="false" autoComplete="off">
                            <div className="form-row d-flex align-items-center pl-5 pr-5">
                                <div className="col position-relative">
                                    <div className="movie-icon"></div>

                                    <MovieInput action={ setMovieName }/>
                                    
                                </div>

                                <div className="col-auto">
                                    <SearchButton />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
