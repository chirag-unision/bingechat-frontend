import React, { useState, useEffect } from "react";
import { PrimaryButton, RedButton, ThemeButton } from "./Button";
import { sendReport } from "../services/Auth";

const ReportModal = ({userEmail= 'xyz@gmail.com'}) => {

    const submitReport = async (e) => {
        e.preventDefault();
        let jsonData = Object.fromEntries(new FormData(e.target).entries());
        console.log(jsonData)
        if(jsonData.reportedText == "" || jsonData.reportedEmail == "") return;

        try {
  
            const resp = await sendReport(jsonData);
            
            if(resp){
                if(resp.status_code!=200){
                    setErrMsg(resp.message)
                    return;
                }
                console.log(resp.data)
                window.location.reload();
            }
        } catch(err) {
            console.log(err);
        }
        e.target.reset();
        document.getElementById('accountdialog').close();
    } 

  return (
    // Modal with background blured
    <dialog id="accountdialog" className="modal  bg-slate-200 border rounded-lg p-4 px-6">
        <div className="flex flex-row border-b border-black pb-1">
            <h2 className="text-[1.25rem] mb-1 px-2 mx-auto text-center font-medium leading-[30px]">
                Report User
            </h2>
            <form method="dialog" className="modal-backdrop">
                <button type="submit">X</button>
            </form>
        </div>
    
        <div className="flex flex-col gap-2 pt-3 pb-1">
            <span>
            You are going to report <span
                className={'bg-[#d7d7d7] font-mono font-bold rounded-md py-1 px-2 w-max text-base' }>
                {userEmail}
            </span>
            </span>
            Tell us the cause of reporting:
            <form method="dialog" className=" text-base " onSubmit={submitReport}>
            <div className="p-2">
                <div>
                    <input type="radio" name="reportedText" value="Inappropriate Behavior" required />
                    <label for="reportedText" className="text-md font-medium px-2">Inappropriate Behavior</label>
                </div>
                <div>
                    <input type="radio" name="reportedText" value="Explicit Content" required />
                    <label for="reportedText" className="text-md font-medium px-2">Explicit Content</label>
                </div>
                <div>
                    <input type="radio" name="reportedText" value="Privacy Violations" required />
                    <label for="reportedText" className="text-md font-medium px-2">Privacy Violations</label>
                </div>
                <div>
                    <input type="radio" name="reportedText" value="Spam or Misuse" required />
                    <label for="reportedText" className="text-md font-medium px-2">Spam or Misuse</label>
                </div>
                <div>
                    <input type="radio" name="reportedText" value="Something Else" required />
                    <label for="reportedText" className="text-md font-medium px-2">Something Else</label>
                </div>
            </div>
                <input type="hidden" name="reportedEmail" value={userEmail} />
                <RedButton className="w-full mt-3 duration-150 hover:bg-[#aa00008f]"><button type="submit" className="w-full">Submit</button></RedButton>
            </form>
        </div>
      
    </dialog>
  );
};

export default ReportModal;