import { createContext, useContext, useState } from "react";

const AmendmentContext = createContext<any>(null);

interface Documents {
  request_letter: File | null;
  foreign_leave_approval_letter: File | null;
  flight_details: File | null;
  request_confirmation_document: File | null;
}

export const AmendmentProvider = ({children}: any) => {
    const [amendmentData, setAmendmentData] = useState({
        'application_id' : "",
        'new_leave_start_date' : "",
        'new_leave_end_date' : "",
        'reason_for_change' : "",

        documents: {
            request_letter: null,
            foreign_leave_approval_letter: null,
            flight_details: null,
            request_confirmation_document: null,
        } as Documents,
    });

    return (
        <AmendmentContext.Provider
            value={{amendmentData, setAmendmentData}}
        >
            {children}
        </AmendmentContext.Provider>
    );
};

export const useAmendment = () => useContext(AmendmentContext);
