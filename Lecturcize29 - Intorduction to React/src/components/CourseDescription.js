import React from 'react';

class CourseDescription extends React.Component {
  render() {
    return <h3>{ this.props.courseDescription }</h3>
  }
}

export default CourseDescription;