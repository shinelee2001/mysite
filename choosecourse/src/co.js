import { prerequisite } from './prerequisite.js';

const courses = ['first', 'second', 'third', 'fourth', 'fifth'];

class Course {
  constructor() {
    this.first;
    this.second;
    this.third;
    this.fourth;
    this.fifth;
    this.sixth = [];
  }
}

function getCourse() {
  const selectedCourse = new Course();

  for (let course of courses) {
    let nodeList = document.getElementsByName(course);
    nodeList.forEach((node) => {
      if (node.checked) {
        selectedCourse[course] = node.value;
      }
    });
  }
  let sixthNodeList = document.getElementsByName('sixth');
  sixthNodeList.forEach((node) => {
    if (node.checked) {
      selectedCourse.sixth.push(node.value);
    }
  });
  return selectedCourse;
}

function showPrerequisite(selectedCourse) {
  const sixthCourses = selectedCourse.sixth;
  const prerequisiteList = {};

  for (let sixthCourse of sixthCourses) {
    let prereq = prerequisite[sixthCourse];
    prerequisiteList[sixthCourse] = prereq;
  }

  console.log(prerequisiteList);

  return prerequisiteList;
}

function showResult(selectedCourse) {
  document.getElementById('result').innerHTML = `
    You have selected the following:<br>
    first: ${selectedCourse.first};<br>
    second: ${selectedCourse.second};<br>
    third: ${selectedCourse.third};<br>
    fourth: ${selectedCourse.fourth};<br>
    fifth: ${selectedCourse.fifth};<br>    
    sixth: ${showPrerequisite(selectedCourse)};<br>
    `;
}

document.getElementById('eval').addEventListener('click', (e) => {
  e.preventDefault();

  const selectedCourse = getCourse();
  showResult(selectedCourse);
});
