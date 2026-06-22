import { createContext, useContext, useState } from "react";

const ApplicationContext = createContext<any>(null);

interface PreviousTravel {
  year: string;
  purpose: string;
  period: string;
  country: string;
}

interface Documents {
  invitation_letter: File | null;
  service_confirmation: File | null;
  southern_absorption: File | null;
  duty_cover_letter: File | null;
  passport_copy: File | null;
  flight_details: File | null;
  request_letter: File | null;
  disciplinary_clearance: File | null;
  agreement: File | null;
}

export const ApplicationProvider = ({children}: any) => {
    const [applicationData, setApplicationData] = useState({
        // 1
        name: "",
        position: "",
        service_id: "",

        // 2
        dob: "",
        nic: "",

        // 3
        ministry_id: "",
        institute_id: "",

        // 4
        arrangement_made_to_cover_duty: "",

        // 5
        purpose: "",
        nature_of_trip: "",
        awarding_agency: "",
        expenses_mainly_to_be_met: "",
        goslFunds: {
            air_travel: {
                selected: false,
                amount: ""
            },
            subsistence: {
                selected: false,
                amount: ""
            },
            course_fees: {
                selected: false,
                amount: ""
            },
            additional_expenses: {
                selected: false,
                amount: ""
            },
            other_personal_expenses: {
                selected: false,
                amount: ""
            }
        },
        foreign_loan_project_particulars_thereof: "",
        commencement_date_of_trainig: "",
        completion_date_of_trainig: "",
        departure_date: "",
        return_date: "",
        country: "",
        foreign_address: "",
        foreign_phone: "",
        foreign_fax: "",
        foreign_email: "",
        has_previous_trip_report_submitted: false,

        // 6
        previousTravels: [
            {
                year: "",
                purpose: "",
                period: "",
                country: "",
            },
        ],

        name_and_designation: "",

        class_or_grade: "",

        first_appoinment_date: "",

        last_return_date: "",

        leave_start_date: "",

        leave_end_date: "",

        reason_for_leave: "",

        is_travel_on_a_pre_paid_ticket: "",

        relationship_of_the_person_sending_it: "",

        cost_maintanence_abroad: "",

        relationship_of_person_meeting_expenditure: "",

        address_during_leave: "",

        documents: {
            invitation_letter: null,
            service_confirmation: null,
            southern_absorption: null,
            duty_cover_letter: null,
            passport_copy: null,
            flight_details: null,
            request_letter: null,
            disciplinary_clearance: null,
            agreement: null,
        } as Documents,
        
        signature: ""
    });

    return (
        <ApplicationContext.Provider
            value={{applicationData, setApplicationData}}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplication = () => useContext(ApplicationContext);
export type { PreviousTravel };