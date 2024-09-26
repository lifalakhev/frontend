import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/workouts', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });

      setWorkouts(res.data);
      generateChartData(res.data);
    };

    fetchData();
  }, []);

  const generateChartData = (data) => {
    const dates = data.map((workout) => workout.date);
    const values = data.map((workout) => workout.value);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: 'Progress',
          data: values,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;
