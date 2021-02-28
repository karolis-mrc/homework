import React, { Component, Fragment } from 'react';
import { Fade } from 'react-bootstrap';

// Please put yor own Api Key here !
const API_KEY = process.env.REACT_APP_API_KEY;

class MovieInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFocused : false,
            matchedList : [],
            userInput: "",
            value : "",
        };
    };

    componentDidMount() {
        window.addEventListener( "keydown", (e) => {
            if ( e.keyCode === 27 ) {
                this.blur();
        }}, false);
    };

    focus = () => {
        this.setState( { isFocused: true } );
        setTimeout( () => { document.getElementById( "main_input" ).focus() }, 500);
    };

    blur = () => {
        this.setState( { isFocused: false } );
    };

    handleChange = ( e ) => {
        this.setState( { userInput: e.target.value }, () => this.searchMovies() );
    };

    handleClick = ( name ) => {
        this.setState( { value: name }, () => this.props.action( this.state.value ) );
        this.blur();
    };

    searchMovies = () => {
        let input = this.state.userInput;
        
        if ( input.length > 2 ) {
            this.getMatchedMovies( input );
        } else {
            this.setState( { matchedList: [] } );
        }
    };

    getMatchedMovies = async ( value ) => {
        const res = await fetch( `https://api.themoviedb.org/3/search/movie?api_key=${ API_KEY }&language=en-US&query=${ value }`  );
        const movies = await res.json();

        this.outputMovieList ( movies.results );
    };

    outputMovieList = ( movies ) => {
        this.setState( { matchedList: movies } );
    };

    focusOut = () => {
        if ( this.state.isFocused && !this.state.userInput ) {
            this.blur();
        }
    };
    
    render() {
        return (
            <Fragment>
                <input readOnly name="module_input" id="module_input" onFocus={ this.focus } value={ this.state.value } placeholder="Enter movie name"/>
               
                <Fade in={ this.state.isFocused } timeout={ 800 }>
                    <div id="main-input-container" onBlur={ this.focusOut } style={ { display: this.state.isFocused ? "block" : "none" } }>
                        <div className="main-movie-icon"></div>

                        <label className="main-input-label" htmlFor="main_input">Enter movie name</label>

                        <input name="main_input" id="main_input" onChange={ this.handleChange } />

                        <div id="suggestion_list">
                            { this.state.matchedList.slice( 0, 8 ).map( ( movie, key ) => {
                                return(
                                    <div key={ key } onClick={ (e) => this.handleClick( movie.original_title ) } className="suggestion_item">
                                        <div className="suggestion-name">{ movie.original_title }</div>
                                        <div className="suggestion-description">{ movie.vote_average + " Rating, " + ( movie.release_date && movie.release_date.split( "-" )[0] ) }</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Fade>
            </Fragment>
        );
    };
};

export default MovieInput;
