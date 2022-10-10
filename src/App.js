import React, {useState, useEffect, useRef} from 'react';
import {FaSearch} from 'react-icons/fa';
import Photo from './components/Photo';
import './App.css';
import BackgroundImg from './components/BackgroundImg';
import BackgroundImg2 from './components/BackgroundImg2';
import { IoDocumentTextOutline } from "react-icons/io5";


const mainURL = `https://api.unsplash.com/photos/`
const searchURL = `https://api.unsplash.com/search/photos/`


function App() {

  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [newImages, setNewImages] = useState(false);
  const mounted = useRef(false);
console.log(pageNumber);
    const fetchImages = async() => {
      setLoading(true);
        let url;

        if(query) {
          url = `${searchURL}?client_id=${process.env.REACT_APP_ACCESS_KEY}&query=${query}`
        } else{
          url = `${mainURL}?client_id=${process.env.REACT_APP_ACCESS_KEY}&page=${pageNumber}`
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            setPhotos((prevData) => {
            if(query && pageNumber === 1){
              return data.results
            }
              else if(query){
              // setPhotos([])
              return [...prevData, ...data.results]
            } else {
              return [...prevData, ...data]
            }
            });
            setNewImages(false);
            setLoading(false);
        } catch(error) {
          alert(error);
          setNewImages(false);
          setLoading(false);
        }
    }

    useEffect(() => {
      fetchImages()
    // eslint-disable-next-line
    }, [pageNumber])

    useEffect(() => {
      if(!mounted.current){
        mounted.current = true;
        return
      }
      
      if(!newImages) return
      if(loading) return
      setPageNumber((prevNumber) =>  prevNumber +1)
      
    // eslint-disable-next-line
    }, [newImages])
  
    const scrollEvent = () => {
      if((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 5)) {
                  console.log('scroll event works');
                  setNewImages(true)
              }
    }

    useEffect(() => {
      window.addEventListener('scroll', scrollEvent)
      return () => window.removeEventListener('scroll',scrollEvent)
    },[])

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!query) {
        alert('Please write a query before submitting');
        return;
      };
      if(pageNumber === 1) {
        fetchImages();
        return;
      }
      setPageNumber(1);
    }

    return (
        <main className="App">
          <BackgroundImg/>
          <BackgroundImg2/>
          <section className='form-container'>
                <div className='documentation-link'>
                  <a href="https://unsplash.com/documentation">
                  <IoDocumentTextOutline size={30}/> 
                  </a>
                  <span>Documentation</span> 
                  </div>
                <div>
                  <h1>Unsplash API</h1>
                </div>
                <form>
                  <input type="text" placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)}/>
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
