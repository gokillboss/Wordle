import React, { useEffect } from 'react';
import './LeafAnimation.css';


const BackgroundMusic = () => {
    useEffect(() => {
        const audio = new Audio(require("./SongFromSecretGarden.mp3")); 
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



    const autumnColors = ['#8dc63f', '#e68a00', '#b35900', '#ff9900', '#cc6600'];

    useEffect(() => {
        // Create falling animation for each leaf with random positions
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach((leaf, index) => {
            const delay = Math.random() * 10; 
            leaf.style.animationDelay = `${delay}s`;

            const randomPosition = Math.random() * 100; 
            leaf.style.left = `${randomPosition}%`; 
        });
    }, []);

    return (
        <div className="leaf-container">

           
            {[...Array(20)].map((_, index) => (
                <div key={index} className="leaf" style={{ backgroundColor: autumnColors[index % autumnColors.length] }}></div>
            ))}
            <BackgroundMusic />
        </div>
    );
};

export default LeafAnimation;
