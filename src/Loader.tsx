
function Loader() {
    const loadingPhrases = [
        "Loading vocabulary...",
        "Laddar ordförråd...",
         "Cargando vocabulario...", 
         "Puni vokabular..."
    ]

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }
    // TODO - setTimeout with interval, useEffect, shuffle phrases
    // function loadingText() {
    //     loadingPhrases[getRandomInt(loadingPhrases.length)];
    // } 
        
    // useEffect(() => {
    // })
    //  use counter+ until loadingPhrases.length, then restart

    const loadingText = loadingPhrases[getRandomInt(loadingPhrases.length)];

    
    return (
        <div>
            <h3>{loadingText}</h3>
        </div>
    )
}

export default Loader;