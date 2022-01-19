import React from "react";

function TableData(props) {
  const { data } = props;
  const fname=props.fname;
  const lname=props.lname
  const email=props.email;
  const date=props.date

  return (
    <div style={{textAlign:"center"}}>
      <table  align=" center" cellSpacing="20px"  cellPadding="20px" className="table table-stripped">
      
	   <thead className="thead-dark">
          <tr >
            <th>ID</th>
            <th >Firstname</th>
            <th>Lastname</th>
            <th >Mail</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, ind) => (
            <tr>
			  <td key={ind}>{ind}</td>
              <td > {val.fname}</td>
              <td > {val.lname}</td>
              <td > {val.mail}</td>
              <td > {val.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
