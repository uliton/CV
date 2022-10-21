import React, { useState } from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import photo from '../../images/myself/intro-320.jpg';

import './Introduce.scss';
// import { ONLINE_ORDERS_MOCK } from "../../mockData";

// const TabPanel = (props) => {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 2 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

export const Introduce = () => {
  // const [value, setValue] = useState(0);

  // const handleChange = (newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    <div className="introduce">
       <div className="introduce__intro intro">
        <img src={photo} alt="" className="intro__photo"/>

        <p className="intro__text">
          Graduated from the Kyiv National Economic University and received a diploma in enterprise strategy and consulting. Had taken part in the student exchange program and studied in the UK.
        </p>

        <p className="intro__text">
          I have a lot of experience in different industries. Auto services, sales, operational management, agricultural sector, private enterprise. All this experience has helped me achieve many cool projects with good results. I'm sure it will help me find a common language within a team and find solutions in difficult situations. I also know how to look at the business as a whole, so that it gives me the opportunity to offer complex solutions.
        </p>

        <p className="intro__text">
          I have over 500 hours of coding and my main stack consists of React, JavaScript, HTML and CSS. And I'm also open to learning Vue, React Native, Angular and any other technology.
        </p>
      </div>

      <div className="bar">
          <button type="button" value={0} className="bar__button">skils</button>
          <button value={1} className="bar__button">education</button>
          {/* <button className="bar__button">self education</button> */}
          <button value={2} className="bar__button">experience</button>
          <button value={3} className="bar__button">sport</button>
      </div>

      sdfsghjsisdjfasdf

      {/* <Box sx={{ width: '100%' }}>
        <Box sx={{ bgcolor: 'background.paper' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Skils" sx={{ color: '#2C2C2C', p: 1 }}/>
            <Tab label="Education" />
            <Tab label="Self Education" />
            <Tab label="Experience" />
            <Tab label="Sport" />
          </Tabs>
        </Box>
      
        <TabPanel value={value} index={0}>
          Front End languages: JavaScript, TypeScript, React, Redux, Sass(SCSS), CSS3, HTML5, Git, REST API
          Frameworks: Bulma, Bootstrap, Material Ui
          Task and Project Management: Trello
          Tools: Photoshop, Figma, NPM, Eslint Methodologies: BEM
          Operating systems: MacOs
          Basic OOP understanding
        </TabPanel>

        <TabPanel value={value} index={1}>
          Graduated from Kyiv National Economic University (KNEU) in 2004, specializing in economics and entrepreneurship with advanced English studying, got a bachelor's degree.
          Received a master's degree in consulting in 2005.
          Passed 3-months English summer school in Great Britain in 2002.
        </TabPanel>

        <TabPanel value={value} index={2}>
          <li>developer.mozilla.org</li>
          <li>w3schools.com</li>
          <li>reactjs.org</li>
          <li>redux.js.org</li>
          <li>bulma.io</li>
          <li>getbootstrap.com</li>
        </TabPanel>

        <TabPanel value={value} index={3}>
          oh
        </TabPanel>

        <TabPanel value={value} index={4}>
          <li>
            Candidate Master of Sports in short distance swimming
          </li>
          <li>
            Professionally engaged in auto-sports from 2003 to 2012. Karting, drag racing, drifting.
          </li>
        </TabPanel>
      </Box> */}
    </div>
  );
};
