

export default function Review(props){
    return(
        <div className="reviewWrapper">
            <h5>{props.name}</h5>
            <p>{props.comment}</p>
        </div>
    )
}