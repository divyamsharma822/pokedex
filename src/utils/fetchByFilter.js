import axios from "axios";

const fetchByFilter = async ({ queryKey }) => {
    
    const data = await axios.get(`https://pokeapi.co/api/v2/type/${queryKey[1]}`);
    return data.results;
};

export default fetchByFilter;
