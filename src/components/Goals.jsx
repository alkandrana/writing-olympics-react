import {useState, useEffect} from "react";

export default function Goals() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const getAllGoals = async () => {
            const result = await fetch('http://localhost:5271/goals');
            const content = await result.json();
            if (result.ok) {
                setGoals(content);
                console.log(content);
            } else {
                console.log("An error occurred: ", content);
            }
        }

        getAllGoals();
    }, []);

    function calcDaysRemaining(deadline) {
        const today = new Date();
        const target = new Date(deadline);
        const mllInSecond = 1000;
        const secondsInMinute = 60;
        const minutesInHour = 60;
        const hoursInDay = 24;
        const milliseconds = target - today;
        let days;
        if (milliseconds <= 0) {
            days = 0;
        } else {
            days = milliseconds / (mllInSecond * secondsInMinute * minutesInHour * hoursInDay);
            // if it's a fraction, that means there's still time to get writing in today!
            // counts both today and the day of the deadline as writing days
            days = (days > Math.floor(days) ? Math.ceil(days) : days) + 1;
        }
        return days + 1;
    }
    return (
        <>
            <h1>Goals</h1>
            <a href="/goals/add" className="bg-purple-500 text-white rounded-lg p-3 hover:bg-purple-800 transition">Create New</a>
            <div className="grid grid-cols-3 gap-4">
                {goals.map((g) => (
                    <div key={g.id} className="bg-purple-950 border-2">
                        <h2>{g.name}</h2>
                        <ul>
                            <li>Target: {g.target.toLocaleString()} words</li>
                            <li>Project: {g.project || "any project"}</li>
                            <li>Start Date: {g.startDate}</li>
                            <li>Deadline: {g.deadline}</li>
                            <li>Days remaining: {calcDaysRemaining(g.deadline)}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}