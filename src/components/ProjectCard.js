import React from 'react'
import './ProjectCard.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 


const ProjectCard = props => (
    <div className="Card">
        <div className="ProjectTitle">
            <h1>{props.title}</h1>
            <a href="https://github.com/domogami/enLIGHTen">
                <i className="fa fa-github-square" aria-hidden="true" />
            </a>
        </div>
        <p>{props.text}</p>
        
    </div>
)

export default ProjectCard