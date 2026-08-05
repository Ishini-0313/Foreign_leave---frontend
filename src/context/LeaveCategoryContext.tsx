import { createContext, useContext, useState } from "react";

type NatureOfTrip = "personal" | "official" | null;

type LeaveCategory =
    | "short_trip"
    | "study"
    | "employment"
    | "study_and_employment"
    | "spouse"
    | "leave_without_offers"
    | "leave_with_warm_cloths_offer"
    | "leave_with_additional_offer"
    | "leave_with_warm_cloths_and_additional_offer"
    | null;

interface LeaveCategoryContextType {
    natureOfTrip: NatureOfTrip;
    leaveCategory: LeaveCategory;

    setNatureOfTrip: React.Dispatch<
        React.SetStateAction<NatureOfTrip>
    >;

    setLeaveCategory: React.Dispatch<
        React.SetStateAction<LeaveCategory>
    >;
}

const LeaveCategoryContext =
    createContext<LeaveCategoryContextType | undefined>(undefined);

export function LeaveCategoryProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [natureOfTrip, setNatureOfTrip] =
        useState<NatureOfTrip>(null);

    const [leaveCategory, setLeaveCategory] =
        useState<LeaveCategory>(null);

    return (
        <LeaveCategoryContext.Provider
            value={{
                natureOfTrip,
                leaveCategory,
                setNatureOfTrip,
                setLeaveCategory
            }}
        >
            {children}
        </LeaveCategoryContext.Provider>
    );
}

export function useLeaveCategory() {

    const context = useContext(LeaveCategoryContext);

    if (!context) {
        throw new Error(
            "useLeaveCategory must be used inside LeaveCategoryProvider"
        );
    }

    return context;
}