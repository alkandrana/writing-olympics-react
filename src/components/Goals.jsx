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
    }, [])
    return (
        <>
            <h1>Goals</h1>
            <div className="grid grid-cols-3 gap-4">
                {goals.map((g) => (
                    <div key={g.id}>
                        <h2>{g.name}</h2>
                        <p>Write {g.target} words in {g.project || "any project"} between {g.startDate} and {g.deadline}</p>
                    </div>
                ))}
            </div>
        </>
    )
}