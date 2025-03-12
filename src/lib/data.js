export async function getSongs(){

    const songsSection = await fetch(
        `${import.meta.env.VITE_API_URL}/api/canciones`,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
            }
        }
    );

    const body  = await songsSection.json();
    console.log(body);

    return body;
}

export async function getSongsByName(buscador){

    const songsSection = await fetch(
        `${import.meta.env.VITE_API_URL}/api/canciones?buscador=` + buscador, 
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_CLIENT_API_KEY,
            }
        }
    );

    const body  = await songsSection.json();
    console.log(body);

    return body;
}

