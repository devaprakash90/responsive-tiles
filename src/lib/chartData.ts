
import { ChartData } from './types';

export const getChartData = (): ChartData => {
  return {
    barChart: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          name: 'Events',
          data: [120, 90, 150, 85, 110, 70, 60],
        },
      ],
    },
    lineChart: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          name: 'Success Rate',
          data: [95, 97, 94, 98, 99, 96],
        },
      ],
    },
    pieChart: {
      labels: ['Login', 'Logout', 'API', 'Error', 'Other'],
      data: [35, 25, 20, 15, 5],
    },
  };
};
