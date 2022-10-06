import React, {useState, useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import Photo from './components/Photo';
import './App.css';


const mainURL = `https://api.unsplash.com/photos/`
// const searchURL = `https://api.unsplash.com/search/photos/`


function App() {

  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  
  console.log(pageNumber);

    const fetchImages = async() => {
      setLoading(true);
        let url;
        url = `${mainURL}?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${pageNumber}`
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPhotos(prevData => {
              return ([...prevData, ...data])
            });
            setLoading(false);

        } catch(error) {
          alert(error);
          setLoading(false);
        }
    }

    useEffect(() => {
      fetchImages()
    }, [pageNumber])

    useEffect(() => {
      const event = window.addEventListener("scroll", () => {
          // console.log(`inner height: ${window.innerHeight}`);
          // scrollY returns the pixels a document has scrolled from the upper left corner of the window
          // console.log(`scrollY: ${window.scrollY}`);
          // console.log(`body height: ${document.body.scrollHeight}`);

          if(!loading && (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 10)) {
              console.log('it works');
              setPageNumber(prevState => prevState +1 )
          }
      })
      return () => window.removeEventListener('scroll', event);
    },[])

    const handleSubmit = (e) => {
      e.preventDefault();
    }

    return (
        <main className="App">
          <section className='form-container'>
                <div>
                  <h1>Unsplash API</h1>
                </div>
                <form>
                  <input type="text" placeholder='Search...'/>
                  <button onClick={handleSubmit}><FaSearch/></button>
                </form>
          </section>
          <section className='container'>
            <div className='imgs-container'>
              {photos.map((photo, index) => (
                <Photo key={index} {...photo}/>
              ))}
            </div>
            {loading && <span>Loading...</span>}
          </section>
        </main>
    );
}

export default App;
