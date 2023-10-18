import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Card from "./Card";

const Search = ({ searchTerm }) => {
    const { isLoading, error, data, isFetching } = useQuery(
        ["repoData", searchTerm],
        () =>
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
                .then((res) => {
                    return res.data;
                }),
        {
            retry: 1,
        }
    );

    return (
        <>
            {(isLoading || isFetching) && (
                <div className='mt-3 text-center text-slate-100'>
                    Loading
                </div>
            )}
            {error && (
                <div className='mt-3 text-center text-slate-100'>
                    No matches found
                </div>
            )}
            {data?.id && (
                <>
                    <div
                        className='grid self-center grid-cols-2 gap-2 mt-3 content lg:grid-cols-3 xl:grid-cols-4 sm:w-3/4 justify-items-center'
                        title={data.name}>
                        <Card
                            pokemon={{ name: data.name }}
                            data={[1, 2, 3]}
                            index={0}
                            key={data.id}
                            id={JSON.stringify(data.id)}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default Search;
