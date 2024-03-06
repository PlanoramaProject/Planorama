import { Routes, Route, useParams } from 'react-router-dom';

function Event() {
    const {id} = useParams();
    console.log(id)

return(
    <div>
        <h1>Test Worked - params = {id}</h1>
    </div>
)

}

export default Event;