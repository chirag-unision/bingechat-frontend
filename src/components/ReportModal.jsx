import React, { useState, useEffect } from "react";
import { PrimaryButton, RedButton, SecondaryButton } from "./Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ReportModal = () => {

  return (
    // Modal with background blured
    <dialog id="accountdialog" className="modal md:w-1/4 bg-slate-300 border rounded-lg p-3">
        <div className="flex flex-row ">
            <h2 className="text-[1.25rem] mb-1 px-2 mx-auto text-center font-medium  leading-[30px]">
                Report User
            </h2>
            <form method="dialog" className="modal-backdrop">
                <button type="submit"><PrimaryButton >X</PrimaryButton></button>
            </form>
        </div>
    
        <div className="flex flex-col gap-2">
            Tell us the cause of reporting:
            <div>
                <div>
                    <input type="radio" name="a" value="a" />
                    <label for="html">Inappropriate Behavior</label>
                </div>
                <div>
                    <input type="radio" name="a" value="a" />
                    <label for="html">Explicit Content</label>
                </div>
                <div>
                    <input type="radio" name="a" value="a" />
                    <label for="html">Privacy Violations</label>
                </div>
                <div>
                    <input type="radio" name="a" value="a" />
                    <label for="html">Spam or Misuse</label>
                </div>
                
            </div>
            
            <form method="dialog" className=" text-base ">
                <RedButton><button className="w-full" type="submit">Submit</button></RedButton>
            </form>
        </div>
      
    </dialog>
  );
};

export default ReportModal;