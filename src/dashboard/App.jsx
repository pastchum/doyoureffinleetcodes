import React from 'react';

const Dashboard = ({ user }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>User Name: {user.name}</h2>
                <p>LeetCode Count: {user.leetcodeCount}</p>
                <h3>Friends List:</h3>
                <ul>
                    {user.friends.map((friend, index) => (
                        <li key={index}>{friend}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const user = {
    name: 'John Doe',
    leetcodeCount: 42,
    friends: ['Alice', 'Bob', 'Charlie']
};

const App = () => {
    return (
        <div>
            <Dashboard user={user} />
        </div>
    );
};

export default App;