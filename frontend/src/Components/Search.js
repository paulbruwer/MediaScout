import { React, useState } from "react";
import { Container, Row, Form, InputGroup, Button } from "react-bootstrap";
import Results from "./Results";
import { AiFillHeart } from "react-icons/ai";

//search function takes a search term and media category and sends it off to 
// our proxy server to request a list of items from 3rd party website
function Search(){

    const [search, setSearch] = useState(""); //state defines our search term
    const [mediaCheck, setMedia] = useState("software"); //state defines our media category as set by radios
    const [displayMedia, setDisplayMedia] = useState("software"); // also defines media category, but does not change unless search button is clicked. this makes sure the rendered list doesn't update on radio click
    const [refresh, setRefresh] = useState(true); //state is handed down to Results component as prop to force a refresh

    // initiates response from 3rd party server and response.json to be populated
    const getSearch = async(term=search, media=mediaCheck) => {
        try {
            await fetch(`/search?term=${term}&media=${media}`)
            setDisplayMedia(mediaCheck);
            setRefresh(!refresh);
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <div>
            <Container style={{backgroundColor: "#B9B4C7", borderRadius:"20px", color:"rgb(53, 47, 68)"}}>
                <Row>
                    <h1>HackemTunes</h1>
                </Row>
                <Row>
                    <Container style={{paddingLeft:"10%", paddingRight:"10%"}}>
                        <Form style={{color: "rgb(53, 47, 68, 0.7)"}}>
                            <InputGroup style={{paddingBottom:"3%"}}>
                                <Form.Control placeholder="Search by keyword" onChange={(e)=>setSearch(e.target.value)} />
                                <Button variant="secondary" onClick={()=>getSearch()}>Search</Button>
                                <Button variant="secondary" href="/favorites"><AiFillHeart /></Button>
                            </InputGroup>
                            <Form.Group>
                                <Form.Check
                                    inline
                                    label="App"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-app'}
                                    defaultChecked
                                    onClick={()=>{setMedia("software")}}
                                />
                                <Form.Check
                                    inline
                                    label="iBooks"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-iBooks'}
                                    onClick={()=>setMedia("ebook")}
                                />
                                <Form.Check
                                    inline
                                    label="Movies"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-movies'}
                                    onClick={()=>setMedia("movie")}
                                />
                                <Form.Check
                                    inline
                                    label="Podcast"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-podcast'}
                                    onClick={()=>setMedia("podcast")}
                                />
                                <Form.Check
                                    inline
                                    label="Music"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-music'}
                                    onClick={()=>setMedia("music")}
                                />
                                <Form.Check
                                    inline
                                    label="Music videos"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-musicVideos'}
                                    onClick={()=>setMedia("musicVideo")}
                                />
                                <Form.Check
                                    inline
                                    label="Audio Books"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-audioBooks'}
                                    onClick={()=>setMedia("audiobook")}
                                />
                                <Form.Check
                                    inline
                                    label="TV-shows"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-tvShows'}
                                    onClick={()=>setMedia("tvShow")}
                                />
                                <Form.Check
                                    inline
                                    label="Short Film"
                                    type={'radio'}
                                    name="media"
                                    id={'inline-radio-shortFilm'}
                                    onClick={()=>setMedia("shortFilm")}
                                />
                            </Form.Group>
                        </Form>
                    </Container>
                </Row>
            </Container>
            <Results mediaType={displayMedia} refresh={refresh}/>
        </div>
)}

export default Search