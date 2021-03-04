import React from "react";
import "./bootstrap.min.css";

class EmotionTable extends React.Component {
  render() {
    return (
      <div>
        {/*You can remove this line and the line below. */}
        {JSON.stringify(this.props.emotions)}
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Emotion</th>
            </tr>
            <tr>
              <td>0.0943645</td>
            </tr>
            {
              //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
              // {rows.map((row, i) => {
              //   prepareRow(row)
              //   return (
              //     <tr {...row.getRowProps()}>
              //       {row.cells.map(cell => {
              //         return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              //       })}
              //     </tr>
              //   )
              // })}
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default EmotionTable;
