import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { taskAdded } from './tasksSlice';
var mongoose = require('mongoose');
export default function TaskForm() {

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === '') {
            return alert('Please add title');
        }

        dispatch(taskAdded({ title, date, reminder, 'userId': mongoose.Types.ObjectId().toHexString() }));

        setTitle('')
        setDate('')
        setReminder(false)
    }

    return (
        <form onSubmit={onSubmit} style={{ backgroundColor: 'Highlight', color: 'white' }}>
            <input type='text'
                className="form-control mb-1"
                placeholder='Enter task title'
                value={title}
                onChange={(e) => { setTitle(e.target.value); }} />

            <input type='datetime-local'
                className="form-control mb-1"
                value={date}
                onChange={(e) => { setDate(e.target.value) }} />

            <input type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={reminder}
                value={reminder}
                onChange={(e) => { setReminder(e.target.checked) }} />
            <label className="form-check-label" htmlFor="exampleCheck1">Set Reminder</label>

            <button type="submit" className="btn">Save Task</button>
        </form>

    );
}