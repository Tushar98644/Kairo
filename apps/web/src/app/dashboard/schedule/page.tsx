import CalendarComponent from "@/components/calendar";
import React from "react";

const SchedulePage: React.FC = () => {
    return (
        <div className="flex mx-40 my-4 items-center justify-center">
            <CalendarComponent />
        </div>
    );
}
 
export default SchedulePage;