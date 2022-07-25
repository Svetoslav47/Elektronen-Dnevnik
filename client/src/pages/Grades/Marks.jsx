import React, { useEffect, useState } from 'react'

import { useAuth } from '../../contexts/AuthContext'
import { db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore";

import "./styles.css"
import { useRef } from 'react';

function Marks() {
  const { currentUser } = useAuth();

  const [marksGotten, setMarksGotten] = useState(false);

  const [markInfoBoxMarkIndex, setMarkInfoBoxMarkIndex] = useState([-1, -1])

  const [marks, setMarks] = useState();

  const infoCellRef = useRef();

  const getGradeForSstudent = () => {
    return new Promise((resolve) => {
      const gradeDocRef = doc(db, "Grades/", currentUser.grade);
      getDoc(gradeDocRef).then((gradeFromServer) => {
        resolve(gradeFromServer.data());
      });
    });
  }


  const getMarksForStudent = () => {
    return new Promise((resolve) => {
      getGradeForSstudent().then((grade) => {
        grade.subjects.forEach(() => {
          const marksDocRef = doc(db, `Grades/${currentUser.grade}/marks/`, currentUser.uid);
          getDoc(marksDocRef).then((marksFromServer) => {
            resolve(marksFromServer.data());
          })
        })
      })
    })
  }

  useEffect(() => {
    getMarksForStudent().then((marksData) => {
      const sorted = Object.fromEntries(
        Object.entries(marksData).sort((a, b) => {
          if (a[0][0] > b[0][0]) {
            return 1;
          } else {
            return -1;
          }
        })
      )
      setMarks(sorted);
      setMarksGotten(true);
    });
  }, [])

  const renderMarkInfo = (rowIndex, markIndex, markData) => {
    const table = document.querySelector("#marksTable");
    if (markInfoBoxMarkIndex[0] === -1) {
      setMarkInfoBoxMarkIndex([rowIndex, markIndex]);
      const cellDom = table.insertRow(rowIndex).insertCell(0);
      cellDom.ref = infoCellRef;
      const info = generateMarkInfoCell();
      infoCellRef.value.appendChild(info);
      return;
    }

    if (markInfoBoxMarkIndex[0] === rowIndex && markInfoBoxMarkIndex[1] === markIndex) {
      setMarkInfoBoxMarkIndex([-1, -1]);
      table.deleteRow(rowIndex);
      return;
    }

    table.deleteRow(markInfoBoxMarkIndex[0]);
    setMarkInfoBoxMarkIndex([rowIndex, markIndex]);
    table.insertRow(rowIndex).insertCell(0).appendChild(generateMarkInfoCell(markData));
  }

  const generateMarkInfoCell = (markData) => {
    return (
      <div>
        <p>Оценка: {markData.value}</p>
        <p>Въведена от {markData.enteredBy}</p>
        <p>Причина: {markData.reason}</p>
        <p>Въведена на: {markData.enteredOn}</p>
      </div>
    )
  }

  return (
    <div className='marksPage'>
      {marksGotten &&
        <table id="marksTable">
          <thead>
            <tr>
              <td rowSpan={2}>
                &#8470;
              </td>
              <td rowSpan={2}>
                Предемет
              </td>
              <td colSpan={2}>
                Срок 1
              </td>
              <td colSpan={2}>
                Срок 2
              </td>
            </tr>
            <tr>
              <td className="currentMarks">
                текущи
              </td>
              <td>
                срочна
              </td>
              <td className="currentMarks">
                текущи
              </td>
              <td>
                срочна
              </td>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(marks).map((subject, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className='name'>{marks[subject].nameOfSubject}</td>

                    <td className={(marks[subject].term1Marks.length > 0) ? 'markRow' : ''}>
                      {marks[subject].term1Marks?.map((mark, i) => {
                        return (
                          <div key={i + 1} className={`mark mark-${Math.min(Math.max(Math.round(mark.value), 2), 6)}`} onClick={() => { renderMarkInfo(index + 3, i + 1, mark) }}>
                            {Math.round(mark.value)}
                          </div>
                        )
                      })}
                    </td>

                    <td className='termMarkHolder'>
                      {marks[subject].term1Mark > 2 &&
                        <div className={`termMark mark mark-${Math.min(Math.max(Math.round(marks[subject].term1Mark), 2), 6)}`}>
                          {Math.round(marks[subject].term1Mark)}
                        </div>}
                    </td>

                    <td className={(marks[subject].term2Marks?.length > 0) ? 'markRow' : ''}>
                      {marks[subject].term2Marks?.map((mark, i) => {
                        return (
                          <div key={i} className={`mark mark-${Math.min(Math.max(Math.round(mark.value), 2), 6)}`} onClick={() => { renderMarkInfo(index + 3, (i + 1) * -1, mark) }}>
                            {Math.round(mark.value)}
                          </div>
                        )
                      })}
                    </td>

                    <td className='termMarkHolder'>
                      {marks[subject].term2Mark > 2 &&
                        <div className={`termMark mark mark-${Math.min(Math.max(Math.round(marks[subject].term2Mark), 2), 6)}`}>
                          {Math.round(marks[subject].term2Mark)}
                        </div>}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>}
      {!marksGotten &&
        <h1>waiting for server response</h1>
      }
    </div>
  )
}

export default Marks