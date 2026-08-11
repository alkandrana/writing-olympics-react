import {useEffect, useState, useRef} from 'react'
import {useParams} from "react-router-dom";

export default function Goal() {
    const {goalId} = useParams();
    const [goal, setGoal] = useState(null);
    const sessionRef = useRef(null);
    const openModal = () => sessionRef.current?.showModal();
    const closeModal = () => sessionRef.current?.close();

    useEffect(() => {
        const fetchGoal = async () => {
            const response = await fetch(`http://localhost:5271/goals/${goalId}`);
            const content = await response.json();
            if (response.ok){
                setGoal(content);
                console.log(content);
            } else {
                console.log("There was a problem fetching the goal: ", content);
            }
        }

        fetchGoal();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const target = e.target;
        const formData = new FormData(target);
        const goal = Object.fromEntries(formData.entries());
        console.log(goal);
    }

    const sumSessions = function(total, current){
        return total + current.words;
    }
    function calcWords(goal){
        const target = goal.target;
        const written = goal.sessions.reduce(sumSessions, 0);
        return target - written;
    }

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
        return days;
    }

    function getTime(datetime){
        const timeObj = new Date(datetime);
        return `${timeObj.getHours()}:${timeObj.getMinutes()}`;
    }

    return goal ? (
        <div>
            <h1>{goal.name}</h1>
            <div className="flex flex-row gap-2">
                <div className="bg-purple-600 border p-5 rounded-lg">
                    <h2>Words Remaining:</h2>
                    <p>{calcWords(goal)}</p>
                </div>
                <div className="bg-purple-600 border p-5 rounded-lg">
                    <h2>Days Remaining:</h2>
                    <p>{calcDaysRemaining(goal.deadline)}</p>
                </div>
                <div className="bg-purple-600 border p-5 rounded-lg">
                    <h2>Words Per Day:</h2>
                    <p>{Math.round(calcWords(goal) / calcDaysRemaining(goal.deadline))}</p>
                </div>
                <div className="bg-purple-600 border p-5 rounded-lg">
                    <h2>Words Written</h2>
                    <p>{goal.sessions.reduce((acc, curr) => acc + curr.words, 0)}</p>
                </div>
                <div className="bg-purple-600 border p-5 rounded-lg">
                    <h2>Sessions</h2><button onClick={openModal}>+</button>
                    <dialog ref={sessionRef} className="p-1 bg-gray-600 border rounded-lg m-auto">
                        <div className="grid grid-cols-2 gap-4">
                            <h2>Add a Session</h2><button onClick={closeModal} className="ml-auto mb-auto py-0 hover:bg-gray-400">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input type="date" id="date" name="date" />
                                <input type="time" id="start" name="startTime" /> -
                                <input type="time" id="stop" name="stopTime" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <label htmlFor="words">Words</label>
                                <input type="number" id="words" name="words" className="w-20" />
                            </div>
                            <button type="submit" className="text-sm bg-gray-500 text-white rounded-lg p-1 hover:bg-gray-800 transition">Add</button>
                        </form>

                    </dialog>
                    <div className="grid grid-cols-4 gap-2">
                        {goal.sessions.map(ses => (
                            <>
                                <span>{ses.date}</span>
                                <span>{getTime(ses.startTime)}</span>
                                <span>{getTime(ses.stopTime)}</span>
                                <span>{ses.words.toLocaleString()}</span>
                            </>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    )
}