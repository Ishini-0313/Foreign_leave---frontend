import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {UserCog,ShieldCheck,UserCheck,Users,Save,RefreshCw,Building2,} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Office {
    id: number;
    name: string;
    type: string;
    parent_office_id: number | null;
    status: string;
}

interface User {
    id: number;
    full_name: string;
    email: string;
}

interface Assignment {
    id: number;
    office_id: number;
    subject_officer_id: number | null;
    check_officer_id: number | null;
    recommended_officer_id: number | null;
    recommended_officer2_id: number | null;
    recommended_officer3_id: number | null;
    chief_sec_id: number | null;
    admin_user_id: number | null;

    subject_officer?: User;
    check_officer?: User;
    recommended_officer?: User;
    recommended_officer2?: User;
    recommended_officer3?: User;
    cheif_sec?: User;
    admin?: User;
}

interface ApiResponse {
    office: Office;
    assignment: Assignment | null;
}

export default function OfficerAssignment() {
    const [offices, setOffices] = useState<Office[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedOffice, setSelectedOffice] = useState<string>("");
    const [subjectOfficer, setSubjectOfficer] = useState<string>("");
    const [checkOfficer, setCheckOfficer] = useState<string>("");
    const [recommendedOfficer, setRecommendedOfficer] =useState<string>("");
    const [recommendedOfficer2, setRecommendedOfficer2] =useState<string>("");
    const [recommendedOfficer3, setRecommendedOfficer3] =useState<string>("");
    const [cheifSec, setCheifSec] =useState<string>("");
    const [adminUser, setAdminUser] = useState<string>("");
    const [loadingOffices, setLoadingOffices] =useState<boolean>(true);
    const [loadingUsers, setLoadingUsers] =useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [loadingAssignment, setLoadingAssignment] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");

        console.log("Stored User:", storedUser);

        if(!storedUser){
        navigate("/");
        return;
        }

        setUser(JSON.parse(storedUser));
    },[]);

    //Load offices user can manage
    useEffect(() => {
        loadAssignableOffices();
    }, []);

    const loadAssignableOffices = async () => {
        try {
            setLoadingOffices(true);
            const response = await axios.get(
                "http://127.0.0.1:8000/api/offices/assignable",
                axiosConfig
            );
            const data = response.data;
            if (Array.isArray(data)) {
                setOffices(data);
            } else {
                setOffices([]);
            }
        } catch (error: any) {
            console.error(
                "Failed to load assignable offices:",
                error
            );
            setOffices([]);
            toast.error(
                error.response?.data?.message || "Failed to load offices."
            );
        } finally {
            setLoadingOffices(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | When office changes
    |--------------------------------------------------------------------------
    */

    const handleOfficeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const officeId = e.target.value;

        setSelectedOffice(officeId);

        // Clear current selections
        setSubjectOfficer("");
        setCheckOfficer("");
        setRecommendedOfficer("");
        setRecommendedOfficer2("");
        setRecommendedOfficer3("");
        setCheifSec("");
        setAdminUser("");

        setUsers([]);

        if (!officeId) {
            return;
        }

        await loadOfficeData(officeId);
    };

    /*
    |--------------------------------------------------------------------------
    | Load users + existing assignment
    |--------------------------------------------------------------------------
    */

    const loadOfficeData = async (officeId: string) => {
        try {
            setLoadingUsers(true);
            setLoadingAssignment(true);

            /*
            |--------------------------------------------------------------------------
            | Load users
            |--------------------------------------------------------------------------
            */

            const usersResponse = await axios.get(
                `http://127.0.0.1:8000/api/offices/${officeId}/users`,
                axiosConfig
            );

            if (Array.isArray(usersResponse.data)) {
                setUsers(usersResponse.data);
            } else {
                setUsers([]);
            }

            /*
            |--------------------------------------------------------------------------
            | Load current assignment
            |--------------------------------------------------------------------------
            */

            const assignmentResponse =
                await axios.get<ApiResponse>(
                    `http://127.0.0.1:8000/api/offices/${officeId}/assignment`,
                    axiosConfig
                );

            const assignment = assignmentResponse.data.assignment;

            if (assignment) {
                setSubjectOfficer(assignment.subject_officer_id ? String(assignment.subject_officer_id) : "");
                setCheckOfficer(assignment.check_officer_id ? String(assignment.check_officer_id) : "");
                setRecommendedOfficer(assignment.recommended_officer_id ? String(assignment.recommended_officer_id) : "");
                setRecommendedOfficer2(assignment.recommended_officer2_id ? String(assignment.recommended_officer2_id) : "");
                setRecommendedOfficer3(assignment.recommended_officer3_id ? String(assignment.recommended_officer3_id) : "");
                setCheifSec(assignment.chief_sec_id ? String(assignment.chief_sec_id) : "");
                setAdminUser(assignment.admin_user_id ? String(assignment.admin_user_id) : "");
            }

        } catch (error: any) {
            console.error(
                "Failed to load office data:",
                error
            );

            toast.error(
                error.response?.data?.message || "Failed to load office users."
            );

        } finally {
            setLoadingUsers(false);
            setLoadingAssignment(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Validate three officer roles
    |--------------------------------------------------------------------------
    */

    const validateOfficerRoles = (): boolean => {
        if (!subjectOfficer) {
            toast.error("Please select a Subject Officer.");
            return false;
        }

        if (!checkOfficer) {
            toast.error("Please select a Check Officer.");
            return false;
        }

        if (!recommendedOfficer) {
            toast.error("Please select a Recommended Officer.");
            return false;
        }

        if (
            subjectOfficer === checkOfficer ||
            subjectOfficer === recommendedOfficer ||
            checkOfficer === recommendedOfficer
        ) {

            toast.error(
                "Subject Officer, Check Officer and Recommended Officer must be three different users."
            );
            return false;
        }

        return true;
    };

    /*
    |--------------------------------------------------------------------------
    | Validate Admin
    |--------------------------------------------------------------------------
    */

    const validateAdmin = (): boolean => {
        if (!adminUser) {
            toast.error("Please select an Admin.");
            return false;
        }

        return true;
    };

    /*
    |--------------------------------------------------------------------------
    | Submit assignment
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async ( e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedOffice) {
            toast.error("Please select an office.");
            return;
        }

        if (!validateOfficerRoles()) {
            return;
        }

        if (!validateAdmin()) {
            return;
        }

        try {
            setSaving(true);
            const response = await axios.post(
                `http://127.0.0.1:8000/api/offices/${selectedOffice}/assignment`,

                {
                    subject_officer_id: Number(subjectOfficer),
                    check_officer_id: Number(checkOfficer),
                    recommended_officer_id: Number(recommendedOfficer),
                    recommended_officer2_id: Number(recommendedOfficer2),
                    recommended_officer3_id: Number(recommendedOfficer3),
                    chief_sec_id: Number(cheifSec),
                    admin_user_id: Number(adminUser),
                },
                axiosConfig
            );

            toast.success(
                response.data.message || "Office roles assigned successfully."
            );

            /*
            |--------------------------------------------------------------------------
            | Reload assignment
            |--------------------------------------------------------------------------
            */

            await loadOfficeData(
                selectedOffice
            );

        } catch (error: any) {
            console.error(
                "Assignment error:",
                error
            );

            /*
            |--------------------------------------------------------------------------
            | Validation errors
            |--------------------------------------------------------------------------
            */

            if (
                error.response?.status === 422
            ) {

                const errors =
                    error.response?.data?.errors;

                if (errors) {

                    Object.values(errors).forEach(
                        (messages: any) => {

                            if (
                                Array.isArray(messages) &&
                                messages.length > 0
                            ) {

                                toast.error(
                                    messages[0]
                                );

                            }

                        }
                    );

                } else {

                    toast.error(
                        error.response?.data?.message ||
                        "Invalid assignment."
                    );
                }

                return;
            }

            /*
            |--------------------------------------------------------------------------
            | Authorization error
            |--------------------------------------------------------------------------
            */

            if (
                error.response?.status === 403
            ) {

                toast.error(
                    error.response?.data?.message ||
                    "You are not authorized to assign this office."
                );

                return;
            }

            /*
            |--------------------------------------------------------------------------
            | Other errors
            |--------------------------------------------------------------------------
            */

            toast.error(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to assign office roles."
            );

        } finally {

            setSaving(false);

        }
    };

    /*
    |--------------------------------------------------------------------------
    | Reset form
    |--------------------------------------------------------------------------
    */

    const handleReset = async () => {

        if (!selectedOffice) {
            return;
        }

        setSubjectOfficer("");
        setCheckOfficer("");
        setRecommendedOfficer("");
        setRecommendedOfficer2("");
        setRecommendedOfficer3("");
        setCheifSec("");
        setAdminUser("");

        await loadOfficeData(
            selectedOffice
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Get selected office
    |--------------------------------------------------------------------------
    */

    const selectedOfficeData =
        offices.find(
            (office) =>
                String(office.id) ===
                selectedOffice
        );

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loadingOffices) {

        return (
            <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">

                <div className="flex flex-col items-center gap-3">

                    <RefreshCw
                        className="animate-spin text-[#002046]"
                        size={30}
                    />

                    <p className="text-gray-600">
                        Loading offices...
                    </p>

                </div>

            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (
        <div className="min-h-screen bg-[#F7F8FA] p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#002046] p-3 rounded-lg">
                            <UserCog className="text-white" size={28}/>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-[#002046]">Officer Assignment</h1>
                            <p className="text-gray-500 mt-1">
                                Assign Subject, Check, Recommended
                                Officers and Office Admin
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit}>
                        {/* Office selection */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center gap-2 mb-4">
                                <Building2 size={20} className="text-[#002046]"/>
                                <h2 className="text-lg font-semibold text-[#002046]">Select Office</h2>
                            </div>
                            <select
                                value={selectedOffice}
                                onChange={handleOfficeChange}
                                className="w-full border border-gray-300 rounded-lg px-4  py-3 outline-none focus:ring-2 focus:ring-[#002046] bg-white"
                            >
                                <option value=""> -- Select Office --</option>
                                {offices.map(
                                    (office) => (
                                        <option key={office.id} value={office.id}>
                                            {office.name}
                                        </option>
                                    )
                                )}
                            </select>

                            {offices.length === 0 && (
                                <p className="text-sm text-red-500 mt-3">
                                    You currently have no offices
                                    available for assignment.
                                </p>
                            )}
                        </div>


                        {/* Selected office information */}

                        {selectedOfficeData && (
                            <div className="mx-6 mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
                                <div className="flex flex-wrap gap-x-8 gap-y-2">
                                    <div>
                                        <span className="text-xs text-gray-500">
                                            Office
                                        </span>
                                        <p className="font-semibold text-[#002046]">
                                            {
                                                selectedOfficeData.name
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-gray-500">
                                            Type
                                        </span>
                                        <p className="font-semibold text-[#002046]">
                                            {
                                                selectedOfficeData.type
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Users */}
                        {selectedOffice && (
                            <div className="p-6">
                                {loadingUsers || loadingAssignment ? (
                                    <div className="flex justify-center py-12">
                                        <RefreshCw className="animate-spin text-[#002046]" size={28}/>
                                    </div>
                                ) : (
                                    <>
                                        {/* Officer section */}
                                        <div className="mb-8">
                                            <div className="flex items-center gap-2 mb-5">
                                                <Users size={20}  className="text-[#002046]"/>
                                                <h2 className="text-lg font-semibold text-[#002046]">Officer Roles</h2>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                                {
                                                    user.role.role_name == "System Admin" && (
                                                        <>
                                                            {/* Cheif Sec */}
                                                            <UserSelect
                                                                label="Cheif Secretary"
                                                                icon={<UserCog size={18}/>}
                                                                value={cheifSec}
                                                                users={users}
                                                                onChange={setCheifSec}
                                                                exclude={[subjectOfficer,checkOfficer]}
                                                            />

                                                            {/* Recommended III*/}
                                                            <UserSelect
                                                                label="Recommended Officer III"
                                                                icon={<UserCog size={18}/>}
                                                                value={recommendedOfficer3}
                                                                users={users}
                                                                onChange={setRecommendedOfficer3}
                                                                exclude={[subjectOfficer,checkOfficer]}
                                                            />

                                                            {/* Recommended  II*/}
                                                            <UserSelect
                                                                label="Recommended Officer II"
                                                                icon={<UserCog size={18}/>}
                                                                value={recommendedOfficer2}
                                                                users={users}
                                                                onChange={setRecommendedOfficer2}
                                                                exclude={[subjectOfficer,checkOfficer]}
                                                            />
                                                        </>
                                                    )
                                                }

                                                {/* Recommended */}
                                                <UserSelect
                                                    label="Recommended Officer"
                                                    icon={<UserCog size={18}/>}
                                                    value={recommendedOfficer}
                                                    users={users}
                                                    onChange={setRecommendedOfficer}
                                                    exclude={[subjectOfficer,checkOfficer]}
                                                />

                                                {/* Check */}
                                                <UserSelect
                                                    label="Check Officer"
                                                    icon={<ShieldCheck size={18}/>}
                                                    value={checkOfficer}
                                                    users={users}
                                                    onChange={setCheckOfficer}
                                                    exclude={[subjectOfficer,recommendedOfficer]}
                                                />
                                                
                                                {/* Subject */}
                                                <UserSelect
                                                    label="Subject Officer"
                                                    icon={<UserCheck size={18}/>}
                                                    value={subjectOfficer}
                                                    users={users}
                                                    onChange={setSubjectOfficer}
                                                    exclude={[checkOfficer,recommendedOfficer]}
                                                />
                                            </div>


                                            <p className="text-xs text-gray-500 mt-3">
                                                Subject Officer, Check
                                                Officer and Recommended
                                                Officer must be three
                                                different users.
                                            </p>
                                        </div>


                                        {/* Admin section */}

                                        <div className="border-t border-gray-200 pt-8">

                                            <div className="flex items-center gap-2 mb-5">

                                                <UserCog
                                                    size={20}
                                                    className="text-[#002046]"
                                                />

                                                <h2 className="text-lg font-semibold text-[#002046]">

                                                    Office Administrator

                                                </h2>

                                            </div>


                                            <div className="max-w-md">

                                                <UserSelect

                                                    label="Office Admin"

                                                    icon={
                                                        <UserCog
                                                            size={18}
                                                        />
                                                    }

                                                    value={
                                                        adminUser
                                                    }

                                                    users={
                                                        users
                                                    }

                                                    onChange={
                                                        setAdminUser
                                                    }

                                                    /*
                                                    Admin CAN be one
                                                    of the three officers.
                                                    Therefore no exclude.
                                                    */

                                                    exclude={[]}

                                                />

                                            </div>

                                            <p className="text-xs text-gray-500 mt-3">

                                                The Office Admin may also
                                                be the Subject, Check or
                                                Recommended Officer.

                                            </p>

                                        </div>


                                        {/* No users */}

                                        {users.length === 0 && (

                                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">

                                                <p className="text-sm text-yellow-800">

                                                    No active users were
                                                    found for this office.

                                                </p>

                                            </div>

                                        )}


                                        {/* Buttons */}

                                        <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-200">

                                            <button

                                                type="button"

                                                onClick={
                                                    handleReset
                                                }

                                                disabled={
                                                    saving ||
                                                    !selectedOffice
                                                }

                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    px-5
                                                    py-2.5
                                                    border
                                                    border-gray-300
                                                    rounded-lg
                                                    text-gray-700
                                                    hover:bg-gray-50
                                                    disabled:opacity-50
                                                    disabled:cursor-not-allowed
                                                "

                                            >

                                                <RefreshCw
                                                    size={18}
                                                />

                                                Reset

                                            </button>


                                            <button

                                                type="submit"

                                                disabled={
                                                    saving ||
                                                    users.length === 0
                                                }

                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    px-6
                                                    py-2.5
                                                    bg-[#002046]
                                                    text-white
                                                    rounded-lg
                                                    hover:bg-[#00315f]
                                                    disabled:opacity-50
                                                    disabled:cursor-not-allowed
                                                "

                                            >

                                                {saving ? (

                                                    <>
                                                        <RefreshCw
                                                            size={18}
                                                            className="animate-spin"
                                                        />

                                                        Saving...

                                                    </>

                                                ) : (

                                                    <>
                                                        <Save
                                                            size={18}
                                                        />

                                                        Assign Roles

                                                    </>

                                                )}

                                            </button>

                                        </div>

                                    </>

                                )}

                            </div>

                        )}

                    </form>

                </div>

            </div>

        </div>

    );
}


/*
|--------------------------------------------------------------------------
| Reusable User Select
|--------------------------------------------------------------------------
*/

interface UserSelectProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    users: User[];
    onChange: (value: string) => void;
    exclude: string[];
}

function UserSelect({label,icon,value,users,onChange,exclude}: UserSelectProps) {
    const availableUsers = users.filter(
        (user) =>!exclude.includes(String(user.id))
    );

    return (
        <div>
            <label className="block mb-2">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    {icon}
                    {label}
                </span>
            </label>

            <select
                value={value}
                onChange={(e) =>onChange(e.target.value)}
                className="w-full  border  border-gray-300  rounded-lg  px-4  py-3 bg-white outline-none  focus:ring-2 focus:ring-[#002046] focus:border-[#002046]">
                <option value=""> -- Select {label} --</option>

                {availableUsers.map(
                    (user) => (
                        <option key={user.id} value={user.id}>
                            {user.full_name}{" - "}{user.email}
                        </option>
                    )
                )}
            </select>
        </div>
    );
}