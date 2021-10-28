import React, { useEffect, useRef } from 'react';

const {tableau} = window;
export const Tableau =()=> { 
    const ref = useRef(null);
    
    const url =  "http://public.tableau.com/views/RegionalSampleWorkbook/Storms";
    
    function initViz(){
        newtableau.Viz(ref.current,url);
    }
    
    return (
        <div ref={ref} style={{width:'70%', margin:'auto'}}>

        </div>
    );
}