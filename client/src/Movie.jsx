import React from "react"
import moreInfo from "./media/more-info.png"

export default function Movie(props){
    const [style, setStyle] = React.useState("hide")
    const [imgStyle, setImgStyle] = React.useState("")
    const [windowSize, setWindowSize] = React.useState(window.innerWidth)

    window.addEventListener("resize", () => {
        setWindowSize(window.innerWidth)
    })

    let title = ''
    if (props.title.length > 22){
        title = props.title.substr(0,19) + '...'
    }
    else {
        title = props.title
    }
    return (
        <div className = "movie-container" onClick = {() => props.getMovieCast(props.id, props.movieList)} 
            onMouseEnter={() => {
                setImgStyle("hovered")
                setStyle("show-more-details")
            }} 
            onMouseLeave = {() => {
                setImgStyle("")
                setStyle("hide")
            }}>
            <div className="poster-container">
                <img className={`movie-poster ${imgStyle}`} src={props.poster} alt="movie poster"></img>
            </div>
            <h4 className="movie-title">{title}</h4>
            {windowSize > 500 && <img className={style} src={moreInfo} alt="more information"></img>}
        </div>
    )
}