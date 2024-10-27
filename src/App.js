import React, { useEffect, useRef, useState } from 'react';
import Brisa_portada from './Brisa_portada.png';
import Brisa_foto2 from './Brisa_foto2_t_s.png';
import Brisa_relleno from './Brisa_box_relleno.png';
import brisa_foto4 from './Brisa_foto4_t.png';
import regalo from './regalo-pintado.png';
import ogg from './BensonBoone.ogg'
import mp3 from './BensonBoone.mp3'
import './App.css'; 
import CountdownTimer from './module';
import LazyImage from './Lazy'

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); 
  const [screenHeight, setScreenHeight] = useState(window.innerHeight); 

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); 

  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);

  const imgBoxRef1 = useRef(null);
  const imgBoxRef2 = useRef(null);
  const imgBoxRef3 = useRef(null);
  const imgBoxRef4 = useRef(null);
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
  
    const start1 = 2.77 * screenWidth - screenHeight * 0.9;  
    const end1 = 3.17 * screenWidth - screenHeight * 0.9;  
    
    const start2 = 3.35 * screenWidth - screenHeight * 0.9;  
    const end2 = 3.75 * screenWidth - screenHeight * 0.9;    
    // const start2 = 4.77 * screenWidth - screenHeight * 0.9;  
    // const end2 = 5.17 * screenWidth - screenHeight * 0.9;    
    console.log(start2,scrollY)  
  
    // const start3 = 3.59 * screenWidth - screenHeight * 0.9;

    // const end3 = 4.09 * screenWidth - screenHeight * 0.9;  
  
    // const start4 = 4.09 * screenWidth - screenHeight * 0.9;
    // const end4 = 4.59 * screenWidth - screenHeight * 0.9;
  
    let progress1 = (scrollY - start1) / (end1 - start1);
    progress1 = Math.max(0, Math.min(1, progress1));
  
    if (imgBoxRef1.current) {
      const translateY1 = 100 - (progress1 * 100); 
      const translateX1 = -(100 - (progress1 * 100));   
      imgBoxRef1.current.style.opacity = progress1;
      imgBoxRef1.current.style.transform = `translate(${translateX1}px, ${translateY1}px)`; // Mover en X y Y
  
      console.log(`Image 1 progress: ${progress1}, translateX: ${translateX1}, translateY: ${translateY1}`);
    }
  
    let progress2 = (scrollY - start2) / (end2 - start2);
    progress2 = Math.max(0, Math.min(1, progress2));
  
    if (imgBoxRef2.current) {
      const translateY2 = 100 - (progress2 * 100);
      const translateX2 = (33 - (progress2 * 33)); 
      imgBoxRef2.current.style.opacity = progress2;
      imgBoxRef2.current.style.transform = `translate(${translateX2}px, ${translateY2}px)`; // Mover en X y Y
  
      console.log(`Image 2 progress: ${progress2}, translateX: ${translateX2}, translateY: ${translateY2}`);
    }
  
    // let progress3 = (scrollY - start3) / (end3 - start3);
    // progress3 = Math.max(0, Math.min(1, progress3));
  
    // if (imgBoxRef3.current) {
    //   const translateY3 = 200 - (progress3 * 200);
    //   const translateX3 = -(200 - (progress3 * 200));
    //   imgBoxRef3.current.style.opacity = progress3;
    //   imgBoxRef3.current.style.transform = `translate(${translateX3}px, ${translateY3}px)`; // Mover en X y Y
  
    //   console.log(`Image 3 progress: ${progress3}, translateX: ${translateX3}, translateY: ${translateY3}`);
    // }
  
    // let progress4 = (scrollY - start4) / (end4 - start4);
    // progress4 = Math.max(0, Math.min(1, progress4));
  
    // if (imgBoxRef4.current) {
    //   const translateY4 = 200 - (progress4 * 200);
    //   const translateX4 = (200 - (progress4 * 200)); 
    //   imgBoxRef4.current.style.opacity = progress4;
    //   imgBoxRef4.current.style.transform = `translate(${translateX4}px, ${translateY4}px)`; // Mover en X y Y
  
    //   console.log(`Image 4 progress: ${progress4}, translateX: ${translateX4}, translateY: ${translateY4}`);
    // }
  };
  
  const handleResize = () => {
    setScreenWidth(window.innerWidth); 
    console.log('Ancho de la pantalla:', window.innerWidth);
    setScreenHeight(window.innerHeight); 
    console.log('Altura de la pantalla:', window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize); 

    window.scrollTo(0, 0); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize); 
    };
  }, [screenWidth]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = 0.3; 
      audioElement.play().then(() => {
        setIsPlaying(true); 
      }).catch(error => {
        console.log("El navegador bloqueó la reproducción automática", error);
      });
    }
  }, []);

  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play().catch(error => {
        console.log("Playback prevented by the browser:", error);
      });
      setIsPlaying(true); 
    }
  };

  // const [showTitle, setShowTitle] = useState(true); // Inicialmente el título es visible

  // const toggleVisibility = (e) => {
  //   e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
  //   setShowTitle(!showTitle); // Alterna entre mostrar/ocultar
  // };
  
  const [showTitle, setShowTitle] = useState(true); 
  const [showIntermediate, setShowIntermediate] = useState(false); 
  const [showFinal, setShowFinal] = useState(false); 
  
  // Alternar la visibilidad del mensaje intermedio
  const toggleVisibility = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    setShowTitle(false);
    setShowIntermediate(true); // Muestra el mensaje intermedio
  };
  
  // Mostrar los datos finales después de hacer clic en "Vamos"
  const showFinalData = (e) => {
  e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
  setShowIntermediate(false); // Ocultar el mensaje intermedio
  setShowFinal(true); // Mostrar los datos de CVU
};


const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    // Aquí podrías añadir una condición para determinar cuándo las cajas deberían ser visibles
    const timeout = setTimeout(() => {
      setIsContentVisible(true);
    }, 1000); // Cambia el tiempo según tus necesidades

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      <audio 
        ref={audioRef} 
        loop 
        autoPlay
        onError={() => console.error("Error loading audio")} 
        onCanPlay={() => console.log("Audio is ready to play")}
      >
        <source src={mp3} type="audio/mpeg" />
        <source src={ogg} type="audio/ogg" />
        Tu navegador no soporta la etiqueta de audio.
      </audio>

      <button className={isPlaying ? 'button-music stop-music' : 'button-music play-music'} onClick={togglePlayPause}>
        </button>  
        <LazyImage src={Brisa_portada} className="App-img-1" alt="Brisa portada" />
        {/* <LazyImage src={Brisa_relleno} className="App-img-relleno" alt="Brisa relleno" /> */}

      {/* <img src={Brisa_portada} className="App-img-1" alt="logo" /> */}
      <img src={Brisa_relleno} className="App-img-relleno" alt="logo" />
      
      <div className={`App-box-1 ${isContentVisible ? 'visible-box box-transition' : 'hidden-box'}`}>
        <h2 style={{ textShadow: '-10px 10px 30px rgba(172, 144, 134, 1)' }}>LOS XV DE BRI</h2>
        <div className='App-box-child_hour-ajust'>
          <div className='App-box-child_hour'>
            <CountdownTimer onTimeUpdate={setTimeLeft} />
            <h3>{timeLeft.days}</h3>
            <h5>Días</h5>
          </div>
          <div className='App-box-child_hour'>
            <CountdownTimer onTimeUpdate={setTimeLeft} />
            <h3>{timeLeft.hours}</h3>
            <h5>Horas</h5>
          </div>
          <div className='App-box-child_hour'>
            <CountdownTimer onTimeUpdate={setTimeLeft} />
            <h3>{timeLeft.minutes}</h3>
            <h5>Minutos</h5>
          </div>
          <div className='App-box-child_hour'>
            <CountdownTimer onTimeUpdate={setTimeLeft} />
            <h3>{timeLeft.seconds}</h3>
            <h5>Segundos</h5>
          </div>
        </div>
      </div>
      <LazyImage src={Brisa_foto2} className="App-img-1 cuadro-sombra" alt="Brisa foto 2" />
      {/* <LazyImage src={brisa_foto4} className="App-img-1" alt="Brisa foto 4" /> */}

      {/* <img src={Brisa_foto2} className="App-img-1 cuadro-sombra" alt="logo" /> */}

      <div className='App-box-hour'>
      <a href="https://maps.app.goo.gl/KMiBq2sj7DmJ37Jo8" className='App-box-last-child'>
          <h4>UBICACIÓN</h4>
        </a>

      </div>

      <img src={Brisa_relleno} className="App-img-relleno" alt="logo" />
      {/* <LazyImage src={Brisa_foto2} className="App-img-1 cuadro-sombra" alt="Brisa foto 2" /> */}
      <LazyImage src={brisa_foto4} className="App-img-1" alt="Brisa foto 4" />

      {/* <img src={brisa_foto4} className="App-img-1" alt="logo" /> */}

      <div className='App-box-2'>
        <div ref={imgBoxRef1} className={`img-box img-1 ${isVisible1 ? 'visible' : ''}`}></div>
        <div ref={imgBoxRef2} className={`img-box img-2 ${isVisible2 ? 'visible' : ''}`}></div>
      </div>




      <div className='App-box-last'>
        <h4 className='text-confirmacion'>Es muy importante para mí que confirmes tu asistencia antes del 12/11/2024</h4>
        <a href="https://wa.me/5492923696700?text=%C2%A1Hola%21%20Quiero%20confirmar%20m%C3%AD%20asistencia%20%3A%20%29" className='App-box-last-child'>
          <h4>Confirmar Asistencia</h4>
        </a>
      </div>
     
    
<div className='App-box-3'>
  
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h4 id='titulo' className={`fade ${showTitle ? 'visible' : 'hidden'}`} style={{ textShadow: '-10px 10px 30px rgba(172, 144, 134, 1)' }}>
      Si lo deseas, este es el lugar para tu regalo
      {/* Si te pinta, acá podés dejar tu regalo */}
      </h4>
      <a id='titulo' href="#" className={`App-box-3-button fade ${showTitle ? 'visible' : 'hidden'}`} style={{ width: '8vw' }} onClick={toggleVisibility}>
        <img src={regalo} className="regalo-icon" alt="logo" />
      </a>
    </div>

    <div className={`fade ${showIntermediate ? 'visible-inter' : 'hidden-inter'}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {/* <h4>Tu presencia es más que suficiente, pero si lo deseas, aquí te dejo mis datos</h4> */}
      <h4>Con estar alcanza, pero si querés, te dejo mis datos</h4>
      <a href="#" className='App-box-3-button' onClick={showFinalData}>
        <h4 style={{ color: '#faeae6' }}>Cuenta DNI</h4>
      </a>
    </div>
  
    <div className={`fade ${showFinal ? 'visible-final' : 'hidden-final'}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h4 id='datos' className='cvu'>
        Brisa Arroyo
      </h4>
      <h4 id='datos' className='cvu'>
        CBU: <strong>0140412203680150648726</strong>
      </h4>
      <h4 id='datos' className='cvu'>
        Alias: <strong>aliasc2</strong>
      </h4>
      <h4 id='datos' className='cvu'>
        CUIT/CUIL: <strong>27492492189</strong>
      </h4>
      <h4 id='datos' className='cvu'>
        Cuenta DNI
      </h4>
    </div>
  

</div>



    </div>
  );
}

export default App;

