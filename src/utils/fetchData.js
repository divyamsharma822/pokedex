import axios from "axios";

const LIMIT = 10;

const fetchData = async ({ pageParam }) => {
    const offset = pageParam ? pageParam : 0;
    
    const data = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${LIMIT}`
    );
    return {
        results: data.data.results,
        offset: offset + LIMIT,
    };
};

export default fetchData;
