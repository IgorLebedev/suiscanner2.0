import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import cn from "classnames";
import { useRouter } from 'next/router'
import fetchSuiObjs from "./api/api";
import { useAppDispatch } from '../hooks/hooks'
import { addPics } from "../slicers/picsSlice";
import Spinner from "../components/Spinner";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useAppDispatch();
  const input: any = useRef(null);
  const router = useRouter()
  useEffect(() => {
    if (input.current !== null) {
    input.current.focus();
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      wallet: '',
    },
    onSubmit: async ({ wallet }) => {
      try {
        const result = await fetchSuiObjs(wallet);
        dispatch(addPics(result));
        router.push('/showcase');
      } catch (e) {
        throw e;
      }
    },
  });
  return (
    <div className="flex justify-center h-screen items-center">
      <form className="w-full max-w-md" onSubmit={formik.handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            ref={input}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            id="wallet"
            value={formik.values.wallet}
            placeholder="Wallet"
            aria-label="wallet"
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex justify-end py-2">
        <button
          className={cn("text-sm", "text-white", "py-1", "px-4", "rounded-lg", {
            "hover:bg-teal-700": formik.values.wallet !== '' || !formik.isSubmitting,
            "bg-teal-500": formik.values.wallet !== '' || !formik.isSubmitting,
            "opacity-50": formik.values.wallet === '' || formik.isSubmitting,
          })}
          type="submit"
          disabled={formik.values.wallet === '' || formik.isSubmitting}
        >
          {formik.isSubmitting ? <Spinner /> : 'Get'}
        </button>
        <button
          className="border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2"
          type="button"
          onClick={() => formik.resetForm()}
          disabled={formik.values.wallet === '' || formik.isSubmitting}
        >
          Clear
        </button>
        </div>
      </form>
    </div>
  )
}
