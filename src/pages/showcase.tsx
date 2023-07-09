import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { useAppDispatch } from "../hooks/hooks";
import { clearPics } from "../slicers/picsSlice";
import { useRouter } from 'next/router'
import Card from "../components/NftCard";
const uniqueId = require('lodash.uniqueid');

const ShowCase = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pics } = useAppSelector(state => state.pics);
  const handleReset = () => {
    dispatch(clearPics());
    router.replace('/');
  };
  return (
    <div className="container grid grid-cols-12 gap-4 mt-3 mx-auto h-auto p-3">
      <div className="mb-2 flex col-span-12 justify-between items-center">
        <h1 className="text-center text-4xl text-red-300 font-semibold">SHOWCASE</h1>
        <button
          className="col-span-2 px-5 py-2 bg-red-500 text-slate-100 rounded-lg hover:bg-red-400"
          onClick={handleReset}  
        >
          Reset Nfts
        </button>
      </div> 
      {pics.map((link: string) => (
        <Card key={uniqueId()} link={link}/>
      ))}
    </div>
  )
};

export default ShowCase;
