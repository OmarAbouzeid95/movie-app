import React from "react"
import hamburgerIcon from "./media/hamburger-icon.png"
import closeIcon from "./media/close-icon.png"
import magnifyingGlass from "./media/magnifying-glass-solid.svg"
import logo from "./media/logo.png"

export default function Header(props){

    const [text, setText] = React.useState("")
    const [width, setWidth] = React.useState(window.innerWidth)
    const [headerData, setHeaderData] = React.useState(null)
    const [navShow, setNavShow] = React.useState(false)

    React.useEffect(()=> {

        function toggleNavShow(){
            setNavShow(prevNavShow => !prevNavShow)
        }
        window.addEventListener("resize", ()=>{
            setWidth(window.innerWidth)})
        if(width < 700){
            setHeaderData(<div className="mobile-nav-icon">
            <div className="hamburger-icon"><img  src={hamburgerIcon} alt="hamburger-icon" onClick = {toggleNavShow}></img></div>
            <div className = {`mobile-nav ${navShow ? "mobile-nav-show" : "mobile-nav-hide"}`}>
                <button className="mobile-nav-btn" onClick = {()=> {
                    props.updateCurrentPage('popular')
                    toggleNavShow()
                }}>Popular</button>
                <button className="mobile-nav-btn" onClick = {()=> {
                    props.updateCurrentPage('topRated')
                    toggleNavShow()
                }}>Top Rated</button>
                {(props.mode === 'movie') && <button className="mobile-nav-btn" onClick = {()=> {
                    props.updateCurrentPage('upcoming')
                    toggleNavShow()
                }}>Upcoming</button>}
                {(props.mode === 'tv') && <button className="mobile-nav-btn" onClick = {()=> {
                    props.updateCurrentPage('trending')
                    toggleNavShow()
                }}>Trending</button>}
                <button className="mobile-nav-btn" onClick = {()=> {
                    props.toggleMode()
                    props.updateCurrentPage('homepage')
                    toggleNavShow()
                }}>{props.mode === 'movie' ? "TV" : "Movies"}</button>
            <button className="mobile-nav-btn" onClick={() => {
                (props.userData === null) ? props.updateCurrentPage('signIn') : props.updateCurrentPage('profile')
                toggleNavShow()
            }}>{(props.userData === null) ? "Sign in" : props.userData.firstName + ' ' + props.userData.lastName}</button>
            </div>
        </div>)
        }else {
            setHeaderData(null)
        }
    },[width, navShow, props, text])

    function handleChange(e) {
        setText(e.target.value)
    }
    

    return (
        <div className ="header-container">
            <div className="header-nav">
                <div className="main-logo" onClick = {() => props.updateCurrentPage('homepage')}>
                    <img className="logo-img" src={logo} alt="website logo"></img>
                    <h2>TV Guide</h2>
                </div>
                <div className="header-nav-buttons">
                    <button className="header-nav-button" onClick = {()=> props.updateCurrentPage('popular')}>Popular</button>
                    <button className="header-nav-button" onClick = {()=> props.updateCurrentPage('topRated')}>Top rated</button>
                    {(props.mode === 'movie') && <button className="header-nav-button" onClick = {()=> props.updateCurrentPage('upcoming')}>Upcoming</button>}
                    {(props.mode === 'tv') && <button className="header-nav-button" onClick = {()=> props.updateCurrentPage('trending')}>Trending</button>}
                    <button className="header-nav-button" onClick = {()=> {
                        props.toggleMode()
                        props.updateCurrentPage('homepage')
                    }}>{props.mode === 'movie' ? "TV" : "Movies"}</button>
                    <button className="header-nav-button" onClick={() => {(props.userData === null) ? props.updateCurrentPage('signIn') : props.updateCurrentPage('profile')}}>
                        {(props.userData === null) ? "Sign in" : props.userData.firstName + ' ' + props.userData.lastName}
                    </button>
                </div>
                {headerData}
            </div>
            <div className="header-search-container">
                <div className="header-searchbar-container">
                    <input className="header-search-bar" type="text" onChange={handleChange} value={text}
                        onKeyDown={(e) => { if(e.key === 'Enter'){
                            props.search(text)
                            if (e.repeat)
                                return
                        }}}/>
                    <div className="searchbar-icons">
                        {text !== "" && <img className="clear-icon" src={closeIcon} alt="clear icon" onClick={() => setText("")}></img>}
                        <img className="search-icon" src={magnifyingGlass} alt="search icon" onClick={() => props.search(text)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}