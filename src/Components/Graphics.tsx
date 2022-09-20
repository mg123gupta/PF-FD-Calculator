import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';


const COLORS = ['#0088FE', '#00C49F'];

export default class Graphics extends PureComponent {


  render() {
    const {data}=this.props
    return (
      <PieChart width={250} height={300} className="mt-0" style={{marginTop:"-100px"}}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
      </PieChart>
    );
  }
}
