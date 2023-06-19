import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Bookmarks from "./Bookmarks";
import InfiniteScroll from "./InfiniteScroll";
import Search from "./Search";

function App() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    return (
        <div className='flex flex-col items-center h-screen'>
            <div className='text-center bg-[#526D82] text-2xl text-white py-3 cursor-pointer w-screen flex justify-between px-5'>
                <div>PokeDex</div>
                <div className='flex gap-2'>
                    <div className='navlink' onClick={() => navigate("/")}>
                        Home
                    </div>
                    <div
                        className='navlink'
                        onClick={() => navigate("/bookmarks")}>
                        Bookmarks
                    </div>
                    <div
                        className='navlink'
                        onClick={() => navigate("/search")}>
                        Search
                    </div>
                </div>
            </div>
            <div className='flex-col items-center'>
                <div className='search bg-slate-400 flex h-[40px] rounded-md w-[300px] xl:w-[400px] mt-10 shadow-md'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 30 30'
                        width='50px'
                        height='35px'
                        fill='#ffffff'>
                        <path d='M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z' />
                    </svg>
                    <form className='w-full h-[40px]'>
                        <input
                            onFocus={() => navigate("/search")}
                            type='text'
                            placeholder='Type Name of Pokemon'
                            className='w-full rounded-r-md p-3 h-[40px] border-transparent focus:border-transparent focus:ring-0'
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>
            <Routes>
                <Route
                    path='/search'
                    element={<Search searchTerm={searchTerm} />}
                />
                <Route path='/bookmarks' element={<Bookmarks />} />
                <Route path='/*' element={<InfiniteScroll />} />
            </Routes>
        </div>
    );
}

export default App;
