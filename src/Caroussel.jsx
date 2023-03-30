
export default function Caroussel(props){

    return (
        <div className="movieList-container">
            <div className="movieList-wrapper">
                {props.movieList}
            </div> 
        </div>
    )
}