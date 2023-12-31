import { React, useState, useEffect } from "react";
import { Container, Table, Image, Button } from "react-bootstrap";
import { AiFillApple, AiFillDelete } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

//component that displays the collection of items the have been marked as favorite
function Favorites() {
  // state holds a list of objects retrieved from favorite.json
  const [favs, setFavs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getFavorite = () => {
    try {
      const res = localStorage.getItem("mediaScoutFavorites");
      if (res !== null) {
        const data = JSON.parse(res);
        setFavs(data);
      } else {
        const data = [];
        setFavs(data);
      }
    } catch (error) {
      localStorage.setItem("mediaScoutFavorites", "[]");
      console.log(error);
      setFavs([]);
    }
    // const res = await fetch("/favorite");
    // const data = await res.json();
    // setFavs(data); //set favorite.json to state
  };

  const removeFavorite = (index) => {
    const data = favs;
    data.splice(index, 1);
    setFavs(data);
    setRefresh(!refresh);
    localStorage.setItem("mediaScoutFavorites", JSON.stringify(data));
  };

  //only set load favorite.json on first render
  useEffect(() => {
    getFavorite();
  }, []);

  // loop through all objects in the list of the "favs" state and render a bootstrap table
  const displayFavorites = () => {
    let list = <div></div>;
    if (favs.length !== 0) {
      list = (
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th> </th>
              <th>Kind</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Price USD</th>
              <th>Store</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {favs.map((item, index) => (
              <tr key={item.trackId}>
                <td>
                  <Image src={item.artworkUrl100} />
                </td>
                <td>{item.kind}</td>
                <td>{item.trackName}</td>
                <td>{item.primaryGenreName}</td>
                <td>{item.trackPrice}</td>
                <td>
                  <Button variant="dark" href={item.trackViewUrl}>
                    <AiFillApple />
                  </Button>
                </td>
                <td>
                  <Button
                    key={index}
                    variant="dark"
                    onClick={(e) => {
                      removeFavorite(e.target.key);
                    }}
                  >
                    <AiFillDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return list;
  };

  return (
    <div>
      <Container>
        <h1 style={{ color: "#FAF0E6" }}>Favorites</h1>
        <Button variant="dark" href="/">
          <BiSearchAlt />
        </Button>
        {displayFavorites()}
      </Container>
    </div>
  );
}

export default Favorites;
