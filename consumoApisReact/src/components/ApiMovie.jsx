import {useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const ApiMovie = () => {
  const [peliculas, setPelicula] = useState("Barbie"); //estado para el termino de busqueda
  const [infoApi, setInfoApi] = useState([]); //Estados para los datos de la API
  const apiImagen = "https://image.tmdb.org/t/p/w500";

  const InformacionApi = () => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=38d603f072fdc4722f7d2ae08b7af4b4&query=${peliculas}`;
    axios /* error 500 dispara de una vez al catch (key=38d603f072fdc4722f7d2ae08b7af4b4)*/
      .get(apiUrl)
      .then((response) => {
        //si hay exito,nos convierte la respuesta en un json, sino al catch
        console.log("respuesta", response);
        setInfoApi(response.data.results);
      })
      .catch((error) => {
        console.log("Error al obtener datos de la API:", error);
       
      });
     
      
  };
  useEffect(() => {
    //funcion que react ejecutara despues que se haya renderizado y se haya actualizado en el DOM
    InformacionApi();
  }, [peliculas]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPelicula(e.target.value); //se colocaca aca para evitar que al escribir busque  las imagenes, sino que sea controlado por el formulario, es decir por el boton al darle click
  };

  return (
    <Container>
      <h1>BUSCAR PELICULAS</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>search PELICULAS</Form.Label>
          <Form.Control type="text" placeholder="Enter super hero" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <div className="mt-5 d-flex justify-content-center gap-3">
        {infoApi ? (
          infoApi.map((item) => (
            <Card key={item.id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`${apiImagen}${item.poster_path}`} />
              {/* se crea una variable apiImagen y se concatena con el resto de la url de la img */}
              <Card.Body>
                <Card.Title>{item.original_title}</Card.Title>
                <Card.Text>
                  <span className="skills">resumen: </span>
                  {item.overview} <br />
                  <span className="skills">fecha: </span>
                  {item.release_date}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h1>Not found</h1>
         
        )}
      </div>
    </Container>
  );
};

export default ApiMovie;
