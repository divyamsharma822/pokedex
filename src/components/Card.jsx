import React, { useState } from "react";
import { bookmark, bookmarked } from "../utils/bookmark";
import { ReactComponent as Heart } from "../assets/bookmark.svg";
import { ReactComponent as HeartFilled } from "../assets/filled.svg"
;
const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const Card = ({ pokemon, lastElementRef, data ,id, index}) => {
    
    const [ flag , setFLag ] = useState(bookmarked(id));

    return (
        <div
            className='card relative flex flex-1 flex-col content-center justify-center max-h-[300px] rounded-lg p-4 bg-slate-300 m-4 w-[150px] border-8 border-teal-800'
            key={"num" + id}
            ref={data.length === index+1 ? lastElementRef : null}
            title={pokemon.name}
            onClick={() => {
                bookmark(id);
                setFLag(!flag);
            }}
            >
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                height={30}
                width={30}
                loading='lazy'
                className='object-contain w-full'
                alt={pokemon.name}
            />
            <div className='font-bold text-center'> {Capitalize(pokemon.name)} </div>
            { flag && <HeartFilled className="absolute top-0 right-0 m-2 transition ease-in-out cursor-pointer fill-red-500 hover:scale-95 delay-50" /> }
            { !flag && <Heart className="absolute top-0 right-0 m-2 transition ease-in-out cursor-pointer hover:scale-95 delay-50" /> }
        </div>
    );
};

export default Card;
