import { React, useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Image,
  Table,
} from "react-bootstrap";
import { AiFillApple, AiFillHeart } from "react-icons/ai";

//resulted renders the list of objects in response.json to webpage
function Results(props) {
  const mediaType = props.mediaType; //different media categories have different types of information to be displayed. so each is rendered differently according to this prop
  const refresh = props.refresh; //when props updates, useEffect is triggered to render list
  const [response, setResponse] = useState({});
  const [renderList, setRenderList] = useState(<div></div>);

  const getFavorite = () => {
    try {
      const res = localStorage.getItem("mediaScoutFavorites");
      if (res !== null) {
        const data = JSON.parse(res);
        return data;
      } else {
        const data = [];
        return data;
      }
    } catch (error) {
      localStorage.setItem("mediaScoutFavorites", "[]");
      console.log(error);
      return [];
    }
  };

  //retrieve list of items from response.json
  const getResponse = async () => {
    const res = await fetch("/api");
    const resJson = await res.json();
    setResponse(resJson);
  };

  //post new item to local storage
  const setFavorite = (index) => {
    const item = response.results[index];
    const data = getFavorite();
    let alreadyExists = false;
    if (data.length !== 0) {
      data.map((element) => {
        if (element.trackId === item.trackId) {
          alreadyExists = true;
        }
      });
    }
    if (alreadyExists) {
      alert("This item is already in your list of favorites.");
    } else {
      try {
        data.push(item);
        localStorage.setItem("mediaScoutFavorites", JSON.stringify(data));
        alert("Successfully added to favorites");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // get search response on refresh prop update to avoid infinite loop
  useEffect(() => {
    getResponse();
  }, [refresh]);

  // use of switch statement to render search results differently depending on media category
  const displayResults = () => {
    const result = response.results;
    try {
      let list = <div></div>;
      switch (mediaType) {
        case "software":
          if (result.length !== 0) {
            list = result.map((item, index) => (
              <Col
                lg={4}
                sm={6}
                xs={12}
                key={item.trackId}
                style={{ paddingTop: "20px" }}
              >
                <Card style={{ width: "18rem", backgroundColor: "#B9B4C7" }}>
                  <Card.Img variant="top" src={item.screenshotUrls[0]} />
                  <Card.Body>
                    <Card.Title>
                      <Image src={item.artworkUrl60} /> {item.trackName}
                    </Card.Title>
                    <hr />
                    <p>{item.sellerName}</p>
                    <hr />
                    <h6>
                      {item.price} {item.currency}
                    </h6>
                    <Button variant="dark" href={item.trackViewUrl}>
                      <AiFillApple />
                    </Button>{" "}
                    <Button
                      value={index}
                      variant="dark"
                      onClick={(e) => setFavorite(e.target.value)}
                    >
                      <AiFillHeart style={{ pointerEvents: "none" }} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ));
          }
          break;

        case "ebook":
          if (result.length !== 0) {
            list = result.map((item, index) => (
              <Col
                lg={4}
                sm={6}
                xs={12}
                key={item.trackId}
                style={{ paddingTop: "20px" }}
              >
                <Card style={{ width: "18rem", backgroundColor: "#FAF0E6" }}>
                  <Card.Body>
                    <Image
                      src={item.artworkUrl100}
                      style={{ paddingBottom: "10px" }}
                    />
                    <Card.Title>{item.trackName}</Card.Title>
                    <Card.Text>
                      <hr />
                      <p>{item.artistName}</p>
                      <hr />
                      <h6>
                        {item.price} {item.currency}
                      </h6>
                    </Card.Text>
                    <Button variant="dark" href={item.trackViewUrl}>
                      <AiFillApple />
                    </Button>{" "}
                    <Button
                      value={index}
                      variant="dark"
                      onClick={(e) => setFavorite(e.target.value)}
                    >
                      <AiFillHeart style={{ pointerEvents: "none" }} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ));
          }
          break;

        case "movie":
          if (result.length !== 0) {
            list = result.map((item, index) => (
              <Col
                lg={4}
                sm={6}
                xs={12}
                key={item.trackId}
                style={{ paddingTop: "20px" }}
              >
                <Card style={{ width: "18rem", backgroundColor: "#FAF0E6" }}>
                  <Card.Body>
                    <Image
                      src={item.artworkUrl100}
                      style={{ paddingBottom: "10px" }}
                    />
                    <Card.Title>{item.trackName}</Card.Title>
                    <hr />
                    <h6>{item.contentAdvisoryRating}</h6>
                    <p>{item.shortDescription}</p>
                    <hr />
                    <h6>
                      {item.trackPrice} {item.currency}
                    </h6>
                    <Button variant="dark" href={item.trackViewUrl}>
                      <AiFillApple />
                    </Button>{" "}
                    <Button
                      value={index}
                      variant="dark"
                      onClick={(e) => setFavorite(e.target.value)}
                    >
                      <AiFillHeart style={{ pointerEvents: "none" }} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ));
          }
          break;

        case "podcast":
          if (result.length !== 0) {
            list = result.map((item, index) => (
              <Col
                lg={4}
                sm={6}
                xs={12}
                key={item.trackId}
                style={{ paddingTop: "20px" }}
              >
                <Card style={{ width: "18rem", backgroundColor: "#FAF0E6" }}>
                  <Card.Body>
                    <Card.Img src={item.artworkUrl600} />
                    <Card.Title>{item.trackName}</Card.Title>
                    <hr />
                    <h6>{item.contentAdvisoryRating}</h6>
                    <hr />
                    <h6>
                      {item.trackPrice} {item.currency}
                    </h6>
                    <Button variant="dark" href={item.trackViewUrl}>
                      <AiFillApple />
                    </Button>{" "}
                    <Button
                      value={index}
                      variant="dark"
                      onClick={(e) => setFavorite(e.target.value)}
                    >
                      <AiFillHeart style={{ pointerEvents: "none" }} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ));
          }
          break;

        case "music":
          if (result.length !== 0) {
            list = (
              <Table responsive striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Artist</th>
                    <th>Track</th>
                    <th>Album</th>
                    <th>Genre</th>
                    <th>Price USD</th>
                    <th>Store</th>
                    <th>Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item, index) => (
                    <tr key={item.trackId}>
                      <td>
                        <Image src={item.artworkUrl100} />
                      </td>
                      <td>{item.artistName}</td>
                      <td>{item.trackName}</td>
                      <td>{item.collectionName}</td>
                      <td>{item.primaryGenreName}</td>
                      <td>{item.trackPrice}</td>
                      <td>
                        <Button variant="dark" href={item.trackViewUrl}>
                          <AiFillApple />
                        </Button>
                      </td>
                      <td>
                        <Button
                          value={index}
                          variant="dark"
                          onClick={(e) => setFavorite(e.target.value)}
                        >
                          <AiFillHeart style={{ pointerEvents: "none" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            );
          }
          break;

        case "musicVideo":
          if (result.length !== 0) {
            list = (
              <Table responsive striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Artist</th>
                    <th>Track</th>
                    <th>Album</th>
                    <th>Genre</th>
                    <th>Price USD</th>
                    <th>Store</th>
                    <th>Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item, index) => (
                    <tr key={item.trackId}>
                      <td>
                        <Image src={item.artworkUrl100} />
                      </td>
                      <td>{item.artistName}</td>
                      <td>{item.trackName}</td>
                      <td>{item.collectionName}</td>
                      <td>{item.primaryGenreName}</td>
                      <td>{item.trackPrice}</td>
                      <td>
                        <Button variant="dark" href={item.trackViewUrl}>
                          <AiFillApple />
                        </Button>
                      </td>
                      <td>
                        <Button
                          value={index}
                          variant="dark"
                          onClick={(e) => setFavorite(e.target.value)}
                        >
                          <AiFillHeart style={{ pointerEvents: "none" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            );
          }
          break;

        case "audiobook":
          if (result.length !== 0) {
            list = (
              <Table responsive striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Artist</th>
                    <th>Track</th>
                    <th>Album</th>
                    <th>Genre</th>
                    <th>Price USD</th>
                    <th>Store</th>
                    <th>Favorite</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item, index) => (
                    <tr key={item.trackId}>
                      <td>
                        <Image src={item.artworkUrl100} />
                      </td>
                      <td>{item.artistName}</td>
                      <td>{item.collectionName}</td>
                      <td>{item.collectionName}</td>
                      <td>{item.primaryGenreName}</td>
                      <td>{item.collectionPrice}</td>
                      <td>
                        <Button variant="dark" href={item.trackViewUrl}>
                          <AiFillApple />
                        </Button>
                      </td>
                      <td>
                        <Button
                          value={index}
                          variant="dark"
                          onClick={(e) => setFavorite(e.target.value)}
                        >
                          <AiFillHeart style={{ pointerEvents: "none" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            );
          }
          break;

        case "tvShow":
          if (result.length !== 0) {
            list = result.map((item, index) => (
              <Col
                lg={4}
                sm={6}
                xs={12}
                key={item.trackId}
                style={{ paddingTop: "20px" }}
              >
                <Card style={{ width: "18rem", backgroundColor: "#FAF0E6" }}>
                  <Card.Body>
                    <Image
                      src={item.artworkUrl100}
                      style={{ paddingBottom: "10px" }}
                    />
                    <Card.Title>{item.trackName}</Card.Title>
                    <hr />
                    <h6>{item.contentAdvisoryRating}</h6>
                    <hr />
                    <h6>{item.collectionName}</h6>
                    <h6>Episode {item.trackNumber}</h6>
                    <hr />
                    <p>{item.shortDescription}</p>
                    <hr />
                    <h6>
                      {item.trackPrice} {item.currency}
                    </h6>
                    <Button variant="dark" href={item.trackViewUrl}>
                      <AiFillApple />
                    </Button>{" "}
                    <Button
                      value={index}
                      variant="dark"
                      onClick={(e) => setFavorite(e.target.value)}
                    >
                      <AiFillHeart style={{ pointerEvents: "none" }} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ));
          }
          break;

        case "shortFilm":
          if (result.length !== 0) {
            list = result.map((item, index) => (
              <Col
                lg={4}
                sm={6}
                xs={12}
                key={item.trackId}
                style={{ paddingTop: "20px" }}
              >
                <Card style={{ width: "18rem", backgroundColor: "#FAF0E6" }}>
                  <Card.Body>
                    <Image
                      src={item.artworkUrl100}
                      style={{ paddingBottom: "10px" }}
                    />
                    <Card.Title>{item.trackName}</Card.Title>
                    <hr />
                    <h6>{item.contentAdvisoryRating}</h6>
                    <p>{item.shortDescription}</p>
                    <hr />
                    <h6>
                      {item.trackPrice} {item.currency}
                    </h6>
                    <Button variant="dark" href={item.trackViewUrl}>
                      Go To Store
                    </Button>{" "}
                    <Button
                      value={index}
                      variant="dark"
                      onClick={(e) => setFavorite(e.target.value)}
                    >
                      <AiFillHeart style={{ pointerEvents: "none" }} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ));
          }
          break;

        default:
          break;
      }
      setRenderList(list);
    } catch (error) {
      console.log("No result yet.");
    }
  };

  //only when response updates does displayed list rerender
  useEffect(() => {
    displayResults();
  }, [response]);

  return (
    <div style={{ paddingTop: "30px" }}>
      <Container>
        <Row>{renderList}</Row>
      </Container>
    </div>
  );
}

export default Results;
