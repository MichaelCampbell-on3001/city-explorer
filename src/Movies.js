import React from 'react';

class Movies extends React.Component {
  render() {
    return (
      <div> {this.props.movieresults.map((movie) => {
        return(
        <>
          <h3>{movie.title}</h3> 
         
        </>
        )
      })}


      </div>
    )
  }
}
export default Movies