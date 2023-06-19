import React from "react";
import { useQuery } from "react-query";
import typesArray from "../utils/typesArray";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

const FilteredData = () => {
    const navigate = useNavigate();
    let { type } = useParams();

    const { isLoading, error, data, isFetching, refetch } = useQuery(
        ["filteredData", type],
        ({ queryKey }) =>
            axios
                .get(`https://pokeapi.co/api/v2/type/${queryKey[1]}`)
                .then((res) => {
                    return res.data.pokemon;
                }),
        {
            staleTime: 0,
            cacheTime: 0,
        }
    );

    if (error) return "An error has occurred: " + error.message;

    return (
        <>
            <div
                className='text-center bg-[#526D82] text-2xl text-white py-3 cursor-pointer w-screen flex justify-between px-5'
                onClick={() => navigate("/")}>
                <div>PokeDex</div>
                <div className='flex gap-2'>
                    <Link
                        to={"/"}
                        className='navlink '
                        onClick={() => navigate("/")}>
                        Home
                    </Link>
                    <Link
                        to={"/bookmarks"}
                        className='navlink '
                        onClick={() => navigate("/bookmarks")}>
                        Bookmarks
                    </Link>
                    <Link
                        to={"/search"}
                        className='navlink '
                        onClick={() => navigate("/search", { replace: true })}>
                        Search
                    </Link>
                </div>
            </div>
            <div className='flex flex-wrap justify-center py-3 m-3 gap-y-2'>
                {typesArray.map(({ type, css }, index) => (
                    <span
                        className={`btn ${css}`}
                        key={index}
                        onClick={() =>
                            navigate(`/filter/${type.toLowerCase()}`)
                        }>
                        {type}
                    </span>
                ))}
            </div>
            <div className='grid self-center w-3/4 grid-cols-2 gap-2 mx-auto mt-3 content lg:grid-cols-3 xl:grid-cols-4 justify-items-center'>
                {data &&
                    data.map(({ pokemon }, index) => (
                        <Card
                            pokemon={pokemon}
                            data={data}
                            index={index}
                            key={pokemon.url
                                .replace(
                                    "https://pokeapi.co/api/v2/pokemon/",
                                    ""
                                )
                                .replace("/", "")}
                            id={pokemon.url
                                .replace(
                                    "https://pokeapi.co/api/v2/pokemon/",
                                    ""
                                )
                                .replace("/", "")}
                        />
                    ))}
            </div>
            {(isLoading || isFetching) && (
                <div className='pokemonName w-full text-center text-2xl text-[#ffffff] font-bold'>
                    LOADING...
                </div>
            )}
        </>
    );
};

export default FilteredData;
