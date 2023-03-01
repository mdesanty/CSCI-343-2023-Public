import CourseWelcome from './components/CourseWelcome';
import CourseDescription from './components/CourseDescription';

import './App.css';

function App() {
  function handleButtonClick() {
    alert('Nice click!');
  }

  return (
    <>
      <CourseWelcome courseName='Full Stack Development'></CourseWelcome>
      <CourseDescription courseDescription='A courcse about full stack... development'></CourseDescription>
      <button onClick={handleButtonClick}>Click me</button>
    </>
  );
}

export default App;