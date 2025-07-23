import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Projects from "./Projects";

import MyProjects from "./MyProjects";

import Messages from "./Messages";

import Payments from "./Payments";

import Analytics from "./Analytics";

import Bounties from "./Bounties";

import Hackathons from "./Hackathons";

import Landing from "./landing";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Projects: Projects,
    
    MyProjects: MyProjects,
    
    Messages: Messages,
    
    Payments: Payments,
    
    Analytics: Analytics,
    
    Bounties: Bounties,
    
    Hackathons: Hackathons,
    
    landing: Landing,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
               <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Projects" element={<Projects />} />
                
                <Route path="/MyProjects" element={<MyProjects />} />
                
                <Route path="/Messages" element={<Messages />} />
                
                <Route path="/Payments" element={<Payments />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/Bounties" element={<Bounties />} />
                
                <Route path="/Hackathons" element={<Hackathons />} />
                
                <Route path="/landing" element={<Landing />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}