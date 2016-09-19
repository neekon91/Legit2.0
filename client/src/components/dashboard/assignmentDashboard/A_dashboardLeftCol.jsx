//Did not get to linking up this dashboard
// Left column is going to hold the list of classes, students, or assignments
import React from 'react';

// Components
import DashboardLeftColItem from './A_dashboardLeftColItem.jsx';
// class DashboardLeftCol extends React.Component {
//   constructor (props) {
//     super(props)
//   }
//   render() {
//     return (
//         <div className="dashboardLeftCol">
//             <ul>
//             {this.props.data.students.map(function(student){
//               return <div>{student.first} {student.last}</div>
//             })}
//             </ul>
//         </div>

//     );
//   }
// }
const DashboardLeftCol = (props) => {
  console.log(props.data.students)
      return (
        <div className="dashboardLeftCol">
            <ul>
                <DashboardLeftColItem data={props.data.students}/>
                <DashboardLeftColItem />
                <DashboardLeftColItem />
            </ul>
        </div>

    );
};

export default DashboardLeftCol;