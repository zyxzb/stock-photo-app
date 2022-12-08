import React,{useState} from 'react';
import { AiOutlineLink } from "react-icons/ai";
import { MdStarOutline, MdStar, MdStarHalf } from "react-icons/md";
import './photo.css';


const Photo = ({urls:{regular}, alt_description, likes, user:{name, portfolio_url, profile_image:{medium}}}) => {
    const [hover, setHover] = useState(false)
    const [changeSize, setChangeSize] = useState(false);
    const starsRange = likes / 10;

    const starsQty = Array.from({
        length: 5
    }, (_, index) => {
        const number = index + 0.5
        console.log(number);
        return (
            <span>
                {starsRange >= index + 1 ? <MdStar/> : starsRange >= number ? <MdStarHalf/> : <MdStarOutline/>}
            </span>
        )
    })

    return (
        <> 
        {changeSize && <div className='blur'></div>}
        <div 
        className={hover ? 'photo-wrapper active' : 'photo-wrapper'}
        onClick={() => setChangeSize(!changeSize)}
        >
            <img 
            className={changeSize ? 'image active':'image'}
            src={regular} 
            alt={alt_description} 
            onMouseOver={()=> setHover(true)}
            onMouseOut={()=> setHover(false)}
            />
            <div className='info'>
                <div className='likes-info'>
                    <h4>{name}</h4>
                    <p>{starsQty}</p>
                </div>
                <a href={portfolio_url} target="_blank" rel="noopener noreferrer">
                    {portfolio_url && <AiOutlineLink size={25}/>}
                    <img src={medium} alt={name} />
                </a>
            </div>
        </div>
        </>
    );
}

export default Photo;
