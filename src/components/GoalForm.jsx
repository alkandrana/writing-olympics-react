export default function GoalForm() {
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const goal = Object.fromEntries(formData.entries());
        const options = {
            method: "POST",
            body: JSON.stringify(goal),
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch('http://localhost:5271/goals', options);
        const content = await response.json();
        if (response.ok){
            console.log("Goal updated successfully: ", content);
        } else {
            console.log("Goal could not be saved: ", content);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="name" className="w-50">Label</label>
                <input type="text" id="name" name="name" defaultValue=""
                       className="border border-amber-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="target" className="w-50">Goal</label>
                <input type="number" id="target" name="target" defaultValue=""
                       className="border border-amber-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="start" className="w-50">Start Date</label>
                <input type="date" id="start" name="startDate" defaultValue=""
                       className="border border-amber-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="end" className="w-50">End Date</label>
                <input type="date" id="end" name="deadline" defaultValue=""
                       className="border border-amber-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="project" className="w-50">Project</label>
                <input type="text" id="project" name="project" defaultValue=""
                       className="border border-amber-700 rounded"/>
            </div>
            <button type="submit"
                    className="bg-green-800 text-white rounded-lg p-3 mr-2 hover:bg-green-500 transition">Submit
            </button>
            <a href='/goals'
                  className="bg-gray-500 text-white rounded-lg p-3 hover:bg-gray-800 transition">
                Cancel
            </a>
        </form>
    )
}