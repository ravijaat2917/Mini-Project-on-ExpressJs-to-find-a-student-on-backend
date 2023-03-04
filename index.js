const { students } = require('./data');
const express = require('express');
const { query } = require('express');

const app = express();
const port = 8000;

app.get('/api/students', (req, res) => {
    /*ToDo 1: Return the students array which is imported from data.js file*/
	res.send(students);
});

app.get('/api/student/:name', (req, res) => {
	/*ToDo 2: Get the name from the request params and check whether the name is available in student array, if it
	          is present return the student object else return status of 404*/
			  let student = req.params.name.toLocaleLowerCase();
			//   console.log(students[0].name.toLowerCase());
			//   console.log(student.toLowerCase());
			  const resultedStudent = '';
			  let present  = false ;
			  students.filter((curVal)=>{
				// console.log(curVal.name.toLocaleLowerCase() , student);
			      if(':'+curVal.name.toLocaleLowerCase() === student ){
			          present = true ;
					//   console.log(curVal);
			          res.status(200).send(curVal);
					  res.end();
			      }
			  });
			  res.status(404).end();
});

app.get('/api/student/', (req, res) => {
	/*ToDo 3: Get the field1 and field2 value from request query, if any of the field is not present return status 400, 
	check whether the field2 value has a property in student object and assign it to a variable, if field2 value
	is not present in student object return status 400*/
    /*ToDo 4: If the field1 value is topper return the object which has the highest field2 value else 
			  if the field1 value is lowest return the object which has the least field2 value*/
			  const sort = req.query.field1.toLocaleLowerCase();
			  const subject = req.query.field2.toLocaleLowerCase();
			//   console.log(sort , subject);
			//   res.send({sort,subject});
			if( sort.length == 0 || subject.length == 0){
				res.status(400);
			}
			if( students[0].hasOwnProperty(subject)){
				if(sort==='topper'){
					let maxMarks = 0 ;
					let resultedStudent = '';
					students.filter((curentValue )=>{
						if(curentValue[subject]>maxMarks){
							maxMarks = curentValue[subject];
							resultedStudent = curentValue;
						}
					});
					res.send(resultedStudent);
					return;
				}else if(sort==='lowest'){
					let minMarks = 100 ;
					let resultedStudent = '';
					students.filter((curentValue)=>{
						if(curentValue[subject]<minMarks){
							minMarks = curentValue[subject];
							resultedStudent = curentValue;
						}
					});
					res.send(resultedStudent);
					return;
				}
			}else{
				res.status(400);
			}

			res.end();

});

app.listen(port);

module.exports = app;