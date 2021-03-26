import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTasks, fetchTasks } from './tasksSlice'

export const Content = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);

    const taskStatus = useSelector(state => state.tasks.status);
    const error = useSelector(state => state.tasks.error)

    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks());
        }
    }, [taskStatus, dispatch])

    let content;
    if (taskStatus === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if (taskStatus === 'succeeded') {

        content = tasks.map(task => (
            <div key={task.id}>{task.title}</div>
        ))
    } else if (taskStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div style={{ backgroundColor: 'coral', color: 'white', margin: '0' }}>
            {content}
        </div>
    )
}
