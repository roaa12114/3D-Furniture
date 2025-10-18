import {useState, useRef, useEffect} from 'react';
import Home from "./Home";
import Navbar from "./Navbar";
import Cards from "./Cards";
import Footer from "./Footer";

const Main = ()=>{
    const cardRef = useRef(null); // Create a reference for the Card section

    // Function to scroll to the Card section
    const scrollToCard = () => {
      cardRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the Card section
    };

    const [Products, setProducts] = useState()

    useEffect(()=>{
      
      fetch("http://localhost:8000/furniture/get-furnitures",{
        method:"GET",
        "Accept":"application/json",
        "Content-Type":"application/json",
      }).then((res)=>res.json()).
      then((data)=>setProducts(data))

    },[])

    return(
    <div className='Main'>
        <Navbar/>
        <Home scrollToCard={scrollToCard} />
        <div ref={cardRef}></div>
        <Cards Products={Products}/>
        <Footer id="footer"/>
    </div>
)}

export default Main;