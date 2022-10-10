import React,{useState} from 'react';
import { AiOutlineLink } from "react-icons/ai";
import { MdStarOutline, MdStar } from "react-icons/md";
// MdStarHalfe 1/2 star
import './photo.css';


const Photo = ({urls:{regular}, alt_description, likes, user:{name, portfolio_url, profile_image:{medium}}}) => {
    const [hover, setHover] = useState(false)
    const [changeSize, setChangeSize] = useState(false);

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
                    <p 
                    // className={likes < 15 ? "red" : likes <50 ? "orange" : "green"}
                    >
                        {/* {likes}  */}
                        {/* {`likes`} {likes < 15 ? "😪" : likes <50 ? "🤨" : "😍"} */}
                        {likes < 10 ?(
                        <>
                        <MdStar/> 
                        <MdStarOutline/> 
                        <MdStarOutline/> 
                        <MdStarOutline/> 
                        <MdStarOutline/> 
                        </> 
                        )
                        :likes < 20 ?(
                            <>
                            <MdStar/> 
                            <MdStar/> 
                            <MdStarOutline/> 
                            <MdStarOutline/> 
                            <MdStarOutline/> 
                            </> 
                            )
                        :likes < 30 ?(
                            <>
                            <MdStar/> 
                            <MdStar/> 
                            <MdStar/>
                            <MdStarOutline/> 
                            <MdStarOutline/> 
                            </> 
                            )
                        :likes < 50 ?(
                            <>
                            <MdStar/> 
                            <MdStar/> 
                            <MdStar/>
                            <MdStar/>
                            <MdStarOutline/> 
                            </> 
                            )
                        : (
                            <>
                            <MdStar/> 
                            <MdStar/> 
                            <MdStar/>
                            <MdStar/>
                            <MdStar/>
                            </> 
                            )
                    }
                        </p>
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
