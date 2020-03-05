import React from 'react'
import Link from 'gatsby-link'
import ProjectCard from '../components/ProjectCard.js'

const IndexPage = () => (
  <div>
    <div className="Main">
      <div className="MainGroup">

        <img src="/images/profile.jpg" alt="" className="profile-img" />
        <p>Hey, I'm</p>
        <h1>Dominick Lee</h1>
        <a href="/downloads/technical_resume.pdf" download="Resume">Download Résumé </a>
        
        <svg width="100%" height="172" viewBox="0 0 100% 172" fill="none">
          <path fill="white">
          <animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="10s"
          values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z;

          M0 86.3149C316 86.315 444 159.155 884 51.1554C1324 -56.8446 1320.29 34.1214 1538 70.4063C1814 116.407 2156 188.408 2560 86.315V232.317L0 232.316V86.3149Z;

          M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z;

          M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z;" />
          </path>
        </svg>
      </div>
    </div>
    <div id="Projects">
      <h1 className="TopicHeader">Projects</h1>
      <h1 className="FancyRectangle"></h1>
    </div>
    <div className="Projects">
      <img src="/images/enlightenUI.png" className="enlightenUI" />
      <div className="ProjectDescription">
        <ProjectCard
          title="enLIGHTen"
          text="Lorem ipsum dolor sit amet, probo omnis sed te, nam ex putent molestie conclusionemque. Ex consul neglegentur eos, iudico quando accusamus ne his. Quis aeterno recteque vis cu, mei solet labore noster in, lorem omnes evertitur sit eu. No zril ignota alterum."
        />
      </div>
    </div>
    <div id="AboutMe">
      <h1 className="TopicHeader">About Me</h1>
      <h1 className="FancyRectangle"></h1>
    </div>
    <div className="AboutMe">
      <img src="/images/casualPhoto.jpg" className="CasualPhoto"/>
      <div>
        <h2>I'm Dominick Lee</h2>
        <p>I am a second year currently in search of a software development internship. I have varied experience with Swift, Java, C, ARM, HTML, CSS, Javascript, React, and React Native. I hope to expand my skillsets and be an asset to an employer willing to provide me with an opportunity.</p>
      </div>
    </div>

  </div>
)

export default IndexPage
