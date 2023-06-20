import React, { useRef, useCallback, useMemo } from "react";
import fetchData from "../utils/fetchData";
import { useInfiniteQuery } from "react-query";
import typesArray from "../utils/typesArray";
import { useNavigate } from "react-router-dom";
const Card = React.lazy(() => import("./Card"));

const InfiniteScroll = () => {
    const navigate = useNavigate();

    const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
        useInfiniteQuery("data", fetchData, {
            getNextPageParam: (lastPage, pages) => lastPage.offset,
            staleTime: 0,
            cacheTime: 0,
        });

    const flattenedData = useMemo(
        () => (data ? data?.pages.flatMap((item) => item.results) : []),
        [data]
    );

    const observer = useRef();

    const lastElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                    fetchNextPage();
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasNextPage]
    );

    if (error) return <h1>Couldn't fetch data</h1>;

    return (
        <>
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
            <div className='grid self-center grid-cols-2 gap-2 mt-3 content lg:grid-cols-3 xl:grid-cols-4 sm:w-3/4 justify-items-center'>
                {flattenedData.map((pokemon, i) => (
                    <Card
                        index={i}
                        pokemon={pokemon}
                        lastElementRef={lastElementRef}
                        data={flattenedData}
                        key={pokemon.url
                            .replace("https://pokeapi.co/api/v2/pokemon/", "")
                            .replace("/", "")}
                        id={pokemon.url
                            .replace("https://pokeapi.co/api/v2/pokemon/", "")
                            .replace("/", "")}
                    />
                ))}
            </div>
            <div>
                {(isLoading || isFetching) && (
                    <div className='loader'>
                        LOADING...
                    </div>
                )}
            </div>
        </>
    );
};

export default InfiniteScroll;
