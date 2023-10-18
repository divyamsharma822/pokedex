import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Bookmarks = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const bkArray = JSON.parse(sessionStorage.getItem("bkArray"));

    useEffect(() => {
        fetchAll();

        return () => {
            setData([]);
        };
    }, []);

    const fetchAll = async () => {
        setLoading(true);

        let promiseArray = [];
        bkArray?.forEach((curr) => {
            const promise = axios
                .get(`https://pokeapi.co/api/v2/pokemon/${curr}`)
                .then((res) => res);
            promiseArray.push(promise);
        });
        await Promise.all(promiseArray).then(function (values) {
            setData(values);
            setLoading(false);
        });
    };

    if (isLoading) return <div className='mt-2 loader'>Loading...</div>;

    return (
        <>
            {data?.length === 0 && (
                <div className='mt-2 loader'>No Bookmarks Found!</div>
            )}
            <div className='grid self-center grid-cols-2 gap-2 mt-3 content lg:grid-cols-3 xl:grid-cols-4 sm:w-3/4 justify-items-center'>
                {data?.map(({ data }, index) => (
                    <Card
                        pokemon={{ name: data.name }}
                        index={index}
                        id={JSON.stringify(data.id)}
                        data={data}
                        key={data.id}
                    />
                ))}
            </div>
        </>
    );
};

export default Bookmarks;
