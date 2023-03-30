import React from "react"

export default function Cast(props){
    return (
        <div className="cast">
            {/*eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
            <img className="cast-img" src={props.poster} alt="Cast member picture not available"></img>
            <p className="cast-name">{props.name}</p>
            <p className="cast-character">{props.character}</p>
        </div>
    )
}