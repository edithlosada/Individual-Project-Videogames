import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GDLinks from '../GDLinks/GDLinks';
import NGLinks from '../NGLinks/NGLinks';
import HLinks from '../HLinks/HLinks';
import './PLinks.css';

// Se fija en que página está para decidir
// que links renderizar en el navbar.
export default function PLinks() {

	const location = useLocation();
	useEffect(() => {
	}, [location]);

	let pagina = location.pathname.slice(1);
	
	let ishome = pagina === 'home';
	let isnewgame = pagina === 'newgame';
	let isgamedetail = pagina.split('/')[0] === 'gamedetail';

	return (
		<div className="links">
		{	ishome && <HLinks/>}	
		{	isnewgame && <NGLinks/>}
		{ isgamedetail && <GDLinks/>}
		</div>
	)
};
