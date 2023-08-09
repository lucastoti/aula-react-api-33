import React from "react";
import { createRoot } from 'react-dom/client'
import HomePage from "./HomePage";
import NewHomePage from "./NewHomePage";
import './index.css';
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('app')).render(<NewHomePage />)