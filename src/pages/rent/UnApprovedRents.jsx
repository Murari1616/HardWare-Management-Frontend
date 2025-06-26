//@ts-nocheck
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2, Copy } from "lucide-react";
import { getAllUnApprovedRents } from "@/redux/features/rentSlice";

const UnApprovedRents = ({ onClose}) => {
    const dispatch = useDispatch();
    const { rents } = useSelector((state) => state.rent);

    const handleSubmit = () => {
        // if (isConfirmed) {
        //     onSubmit();
        // }
    };
    useEffect(() => {
        dispatch(getAllUnApprovedRents());
    }, []);

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            

                {/* Submit button */}
                <button
                    onClick={handleSubmit}
                    className={`w-full mt-6 py-2 px-4 rounded-md text-white font-semibold transition `}
                >
                    Submit
                </button>
        </div>,
        document.body
    );
};

export default UnApprovedRents;
