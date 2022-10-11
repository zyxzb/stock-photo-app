import React, {useState, useEffect, useRef} from 'react';
import {FaSearch} from 'react-icons/fa';
import Photo from './components/Photo';
import './App.css';
import BackgroundImg from './components/BackgroundImg';
import BackgroundImg2 from './components/BackgroundImg2';
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";

const mainURL = `https://api.unsplash.com/photos/`
const searchURL = `https://api.unsplash.com/search/photos/`


//save theme preferences in local storage
const storageTheme = () => {
      let theme = 'dark-theme';
      if(localStorage.getItem('theme')){
        theme = localStorage.getItem('theme');
      }
      return theme
}

function App() {

  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [newImages, setNewImages] = useState(false);
  const [theme, setTheme] = useState(storageTheme())
  const mounted = useRef(false);
console.log(pageNumber);

    const handleChangeTheme = () => {
      if(theme === 'light-theme') {
            setTheme('dark-theme')
          } else {
            setTheme('light-theme')
          }
    }
    useEffect(() => {
      document.documentElement.className = theme

//save theme preferences in local storage
      localStorage.setItem('theme', theme);
// eslint-disable-next-line
    }, [theme])

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
                <div className="theme-section" onClick={handleChangeTheme}>
                  <span>Theme</span>
                  {theme === 'light-theme' ? <BsFillSunFill/> : <BsFillMoonStarsFill/>}
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
