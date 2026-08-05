import { createContext, useContext, useState } from "react";

const RegisterContext =  createContext<any>(null);

export const RegisterProvider = ({children}:any)=>{
    const [formData, setFormData] = useState({
        fullName: "",
        nic: "",
        mobile: "",
        email: "",

        office_id: "",
        designation_id: "",

        username: "",
        password: "",
        confirmPassword: "",
    });

    return (
        <RegisterContext.Provider value={{formData, setFormData}}>
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => useContext(RegisterContext);