import React, {useState, useEffect } from 'react';
import './LeafAnimation.css';


const BackgroundMusic = () => {
    useEffect(() => {
        const audio = new Audio(require("./SongFromSecretGarden.mp3")); // Relative path to your audio file
        audio.loop = true;
        audio.play();
        audio.volume = 0.1;

        return () => {
            audio.pause();
        };
    }, []);

    return null;
};

const LeafAnimation = () => {
    
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
      
        const autumnColors = ['#8dc63f', '#e68a00', '#b35900', '#ff9900', '#cc6600'];
        const newLeaves = [];

        for (let i = 0; i < 20; i++) { // Adjust the number of leaves as needed
            const delay = Math.random() * 10; 
            const randomPosition = Math.random() * 100;
            const randomColorIndex = Math.floor(Math.random() * autumnColors.length);
     
            newLeaves.push({
                delay: `${delay}s`,
                left: `${randomPosition}%`,
                backgroundColor: autumnColors[randomColorIndex],
            });
        }

        setLeaves(newLeaves);
    }, []); 

    

    return (
        <div className="leaf-container">
         
            {leaves.map((leaf, index) => (
                <div
                    key={index}
                    className="leaf"
                    style={{
                        animationDelay: leaf.delay,
                        left: leaf.left,
                        backgroundColor: leaf.backgroundColor,
                    }}
                ></div>
            ))}
          
            <BackgroundMusic />
        </div>
    );
};

export default LeafAnimation;