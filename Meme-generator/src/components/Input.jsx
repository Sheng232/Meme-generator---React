
import { useState, useEffect } from 'react';
function Input(){
    const [formState, setFormState] = useState({
        topText: "",
        bottomText: "",    
        randomImage: 'https://i.imgflip.com/21tqf4.jpg'});
    
        useEffect(() => {
            async function fetchData (){
                try {
                    const images = await fetch("https://api.imgflip.com/get_memes");
                    const imageCollection = await images.json();
                    setFormState(prevState =>{
                       return {...prevState, API: imageCollection}
                    }
                    )
                } catch (error) {
                    console.log("error", error);
                }
            };
            
            fetchData(); 
        }, []);
        

        function linkState(event){
            const {name, value} = event.target;
            setFormState(prevState =>{
                return(
                    {
                        ...prevState,
                        [name]: value
                    }
                )
            })
        }
        function getImg(){
            const length = formState.API.data.memes.length
            const randomId = Math.floor(Math.random()*length);
            let imageURL = formState.API.data.memes[randomId].url;
            setFormState(prevURL =>{
                return {
                    ...prevURL, 
                    randomImage: imageURL
                }
            });
    }
    return(
        <>
            <div id="input-field">
                <div>
                    <label htmlFor = "top-text">Top text</label>
                    <input 
                        id = "top-text" 
                        name = "topText"
                        value = {formState.topText}
                        onChange = {linkState}
                    />
                </div>
                <div>
                    <label htmlFor = "bottom-text">Bottom text</label>
                    <input 
                        id = "bottom-text" 
                        name = "bottomText"
                        value = {formState.bottomText}
                        onChange = {linkState}
                    />
                </div>
                <button onClick={getImg} className="button">Get a new meme image</button>
            </div>
            <div className = "image-holder">
                <img id="meme" src={formState.randomImage}/>
                <div className="top-text">{formState.topText}</div>
                <div className="bottom-text">{formState.bottomText}</div>
            </div>
        </>
    )
}
export default Input