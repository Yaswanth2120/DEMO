// Line icons drawn for Version 2 on a 24px grid.
const shapes={
 arrow:<path d="M5 12h14M13 6l6 6-6 6"/>,
 up:<path d="M7 17 17 7M8 7h9v9"/>,
 search:<><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/></>,
 play:<path d="M8 5.5v13l10.5-6.5z"/>,
 pause:<path d="M9 5.5v13M15 5.5v13"/>,
 plus:<path d="M12 5v14M5 12h14"/>,
 mail:<><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></>,
 phone:<path d="M6.6 3.5h2.6l1.4 4-2 1.4a12 12 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"/>,
 pin:<><path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.3"/></>,
 atom:<><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/></>,
 gear:<><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/></>,
 flask:<path d="M9 3h6m-5 0v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3M7.4 15h9.2"/>,
 layers:<path d="m12 3 9 5-9 5-9-5zm-9 9 9 5 9-5M3 16l9 5 9-5"/>,
 leaf:<path d="M5 20c0-9.5 6-15 15-15 0 9.5-5.5 15-14.5 15M5 20l7.5-7.5"/>,
 car:<path d="m4 11 2.2-5h11.6l2.2 5M3 11h18v7H3zm3 7v2.5m12-2.5v2.5M6.5 14.5h2m7 0h2"/>,
 link:<path d="M10 14a4 4 0 0 0 5.7 0l3-3A4 4 0 0 0 13 5.3l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>,
 battery:<path d="M9 2.5h6M7 5.5h10v16H7zm5.5 3.5-2.5 5h4l-2.5 5"/>,
 pulse:<path d="M3 12h4l2-5 4 10 2-5h6"/>,
 factory:<path d="M3 21V10l6 4v-4l6 4V5l6 4v12zm4-3h2m4 0h2"/>,
 tool:<path d="m14 5 5-2-1 6-4 2-7 10-4-4 10-7z"/>,
 nodes:<><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="12" r="2"/><path d="M7 12h3m3.6-1.2 3.8-4.3m-3.8 6.7 3.8 4.3"/></>,
 shield:<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5"/>
};
export default function Glyph({name,className}){
 return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name]||shapes.plus}</svg>;
}
